import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import * as THREE from 'three'
import { Group, Object3D } from 'three'
import { AssetsItem } from './assets.types'
import BaseModule from '../base-module'
import BaseModuleConfig from '../base-module.types'
import Events from '../../events'
import Engine from '../../engine'
import { clone } from 'three/examples/jsm/utils/SkeletonUtils'

export default class AssetsModule extends BaseModule {
    private fbxLoader: FBXLoader
    private objectLoader: THREE.ObjectLoader
    private onComplete?: Function | null = null
    private assets: Map<string, Group> = new Map<string, Group>()
    private assetsConfigItems: AssetsItem[]

    constructor(engine: Engine, config: BaseModuleConfig) {
        super(engine, config)
        this.fbxLoader = new FBXLoader()
        this.objectLoader = new THREE.ObjectLoader()
        this.assetsConfigItems = this.config as AssetsItem[]
    }

    init() {
        super.init()
        this.engine.signals.on(Events.LOAD_RESOURCES, this.load.bind(this))
    }

    load() {
        for (let i = 0; i < this.assetsConfigItems.length; i++) {
            const assetItem = this.assetsConfigItems[i]
            const assetType = assetItem.type || assetItem.url.split('.')[1]

            let loader: FBXLoader | THREE.ObjectLoader

            switch (assetType) {
                case 'fbx':
                    loader = this.fbxLoader
                    break
                case 'json':
                    loader = this.objectLoader
                    break
                default:
                    loader = this.fbxLoader
            }

            loader.load(assetItem.url,
                this.onLoad.bind(this, assetItem),
                this.onProgress.bind(this),
                this.onError.bind(this),
            )
        }
    }

    get(id: string): Group | undefined {
        return clone(this.assets.get(id) as Object3D) as Group
    }

    onLoad(assetItem: AssetsItem, object: Group | any): void {
        if (this.assets.has(assetItem.id)) {
            console.warn('AssetsModule onLoad assetItem already exists: ' + assetItem.id)
        }

        object.traverse(function(child: any) {
            if ((child as THREE.Mesh).isMesh) {
                child.castShadow = true
                child.receiveShadow = true
                //TODO Update materials if need
                // (child as THREE.Mesh).material = material
                // if ((child as THREE.Mesh).material) {
                //     ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).transparent = false
                // }
            }
        })

        console.log('loaded: ' + assetItem.id)
        this.assets.set(assetItem.id, object)
        this.checkCompletion()
    }

    checkCompletion(): void {
        if (this.assets.size >= this.assetsConfigItems.length) {
            console.log('AssetsModule checkCompletion complete: ' + this.assets.size)
            this.engine.signals.send(Events.RESOURCES_LOADED)

            if (typeof this.onComplete === 'function') {
                this.onComplete()
            }
        }
    }

    onProgress(xhr: ProgressEvent): void {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    }

    onError(error: any): void {
        console.log(error)
    }
}
