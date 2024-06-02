import BaseComponent from './base-component'
import BaseGameObject from '../game-objects/base-game-object'
import BaseComponentConfig from './components.types'
import AssetsModule from '../modules/assets/assets-module'
import RendererModule from '../modules/renderer/renderer-module'
import { Euler, Group, Vector3 } from 'three'
import EventsComponents from './events-components'
import { Object3D } from 'three/src/core/Object3D'
import TWEEN, { Tween } from '@tweenjs/tween.js'

export default class Object3DComponent extends BaseComponent {
    private assets: AssetsModule | undefined
    private renderer: RendererModule | undefined
    public asset: Group | undefined
    private root: Group = new Group()
    private tween: Tween<Euler> | undefined = undefined

    constructor(gameObject: BaseGameObject, config: BaseComponentConfig) {
        super(gameObject, config)
        this.assets = undefined
        this.renderer = undefined
        this.asset = undefined
    }

    init() {
        this.assets = this.gameObject.engine.getModule(AssetsModule) as AssetsModule
        this.renderer = this.gameObject.engine.getModule(RendererModule) as RendererModule

        const assetConfig = this.config as any
        const assetId = assetConfig.asset as string

        if (assetId) {
            this.asset = this.assets.get(assetId) as Group
            this.updateProperties()
            this.root.add(this.asset)
            this.renderer.scene.add(this.root)
        } else {
            console.warn('Object3DComponent init assetId not defined')
        }

        this.gameObject.signals.on(EventsComponents.OBJECT_3D_SET_POSITION, this.onSetPosition.bind(this))
        this.gameObject.signals.on(EventsComponents.OBJECT_3D_LOOK_AT, this.onLookAt.bind(this))
        this.gameObject.signals.on(EventsComponents.OBJECT_3D_LOOK_AT_ANIM, this.onLookAtAnim.bind(this))
    }

    updateProperties() {
        if (!this.asset || !this.config.scale) {
            return
        }
        const scale = this.config.scale as Vector3
        this.asset.scale.copy(scale)
    }

    addChild(child: Object3D) {
        this.root.add(child)
    }

    getPosition() {
        return this.root.position
    }

    getRotation() {
        return this.root.rotation
    }

    onSetPosition(data: Vector3) {
        if (data) {
            this.root.position.copy(data)
        }
    }

    onLookAt(data: Vector3) {
        if (data) {
            this.root.lookAt(data)
        }
    }

    onLookAtAnim(data: Vector3) {
        const rotationY = Math.atan2((data.x - this.root.position.x), (data.z - this.root.position.z))

        //TODO Fix issue with rotation
        // Check if the rotation crosses the discontinuity at PI/-PI
        let newRot = rotationY
        if (Math.abs(rotationY - this.root.rotation.y) > Math.PI) {
            newRot = rotationY - 2 * Math.PI * Math.sign(rotationY)
            newRot = newRot - (2 * Math.PI * Math.sign(newRot))
        }

        if (this.tween) {
            this.tween.stop()
        }
        this.tween = new TWEEN.Tween(this.root.rotation)
            .to({
                y: newRot,
            }, 500)
            //.delay (1000)
            // .easing(TWEEN.Easing.Cubic.Out)
            .onUpdate((tween) => {
                // console.log(this.root.rotation.y)
            })
            .onComplete(() => {
            })
            .start()
    }
}
