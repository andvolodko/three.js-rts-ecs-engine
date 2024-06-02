import BaseComponent from '../../engine/components/base-component'
import BaseGameObject from '../../engine/game-objects/base-game-object'
import BaseComponentConfig from '../../engine/components/components.types'
import Object3DComponent from '../../engine/components/object-3d-component'
import { BoxGeometry, Intersection, Mesh, MeshBasicMaterial } from 'three'
import GameEvents from '../game-events'
import SignalsEvent from '../../engine/signals-event'


export default class Select3dObjectComponent extends BaseComponent {
    private object3DComponent: Object3DComponent | undefined = undefined
    private boundingBox: Mesh | undefined = undefined
    private material: MeshBasicMaterial | undefined = undefined
    private geometry: BoxGeometry | undefined = undefined

    constructor(gameObject: BaseGameObject, config: BaseComponentConfig) {
        super(gameObject, config)
    }

    init() {
        this.object3DComponent = this.gameObject.getComponent(Object3DComponent) as Object3DComponent

        this.addBoundingBox()
        this.setSelected(false)

        this.gameObject.engine.signals.on(GameEvents.CURSOR_3D_CLICK, this.onCursor3DClick.bind(this))
    }

    private addBoundingBox() {
        if (!this.object3DComponent) {
            return
        }

        this.geometry = new BoxGeometry(
            this.config.width,
            this.config.depth,
            this.config.height,
        )
        this.material = new MeshBasicMaterial(
            {
                color: 0x00ff00,
                opacity: 0.6,
                transparent: true,
                // wireframe: true,
            })
        this.boundingBox = new Mesh(this.geometry, this.material)

        this.object3DComponent.addChild(this.boundingBox)

        //TODO Use helper
        // let helper = new BoxHelper(this.object3DComponent.asset as Object3D, 0xff0000)
        // helper.update()
        // this.object3DComponent.addChild(helper)

    }

    onCursor3DClick(intersects: Array<Intersection>, event: SignalsEvent) {
        if (intersects) {
            this.setSelected(false)
            intersects.forEach((intersect) => {
                if (intersect.object === this.boundingBox) {
                    console.log('Select3dObjectComponent onCursor3DClick found')
                    if (!event.proceed) {
                        this.setSelected(true)
                        event.setProceed()
                        this.gameObject.engine.signals.send(GameEvents.SELECT_3D_OBJECT, this.gameObject)
                    }
                }
            })
        }
    }

    setSelected(selected: boolean) {
        if (!this.material) {
            return
        }

        //TODO Move to config
        const opacity = selected ? 0.6 : 0.1
        this.material.opacity = opacity
    }
}
