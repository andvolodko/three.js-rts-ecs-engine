import BaseComponent from '../../engine/components/base-component'
import Anim3DComponent from '../../engine/components/anim-3d-component'
import BaseGameObject from '../../engine/game-objects/base-game-object'
import BaseComponentConfig from '../../engine/components/components.types'
import GameComponentEvents from '../game-component-events'
import { Vector3 } from 'three'
import EventsComponents from '../../engine/components/events-components'
import Events from '../../engine/events'
import Object3DComponent from '../../engine/components/object-3d-component'

export default class UnitComponent extends BaseComponent {
    private anim3DComponent: Anim3DComponent | undefined
    private object3DComponent: Object3DComponent | undefined
    private path: Vector3[] | undefined
    private pathTarget: Vector3 | undefined = undefined
    private isMoving: boolean = false
    private pathTargetIndex: number = 0

    constructor(gameObject: BaseGameObject, config: BaseComponentConfig) {
        super(gameObject, config)
        this.anim3DComponent = undefined
    }

    init() {
        this.anim3DComponent = this.gameObject.getComponent(Anim3DComponent) as Anim3DComponent
        this.object3DComponent = this.gameObject.getComponent(Object3DComponent) as Object3DComponent

        this.gameObject.signals.on(GameComponentEvents.SET_PATH, this.onSetPath.bind(this))
        this.gameObject.engine.signals.on(Events.ANIMATE_START, this.onAnimateStart.bind(this))
    }

    onSetPath(path: Vector3[]) {
        if (path && path.length) {
            this.path = path
            this.gameObject.signals.send(EventsComponents.ANIM_3D_SET_ANIM, 'walk')
            this.setPathTargetIndex(1)
            this.isMoving = true
        }
    }

    setPathTargetIndex(index: number) {
        if (this.path) {
            this.pathTarget = this.path[index]
            this.pathTargetIndex = index
            this.gameObject.signals.send(EventsComponents.OBJECT_3D_LOOK_AT_ANIM, this.pathTarget)
        }
    }

    onAnimateStart(delta: number) {
        if (this.isMoving && this.object3DComponent) {
            const speedX = this.config.speed * delta * Math.sin(this.object3DComponent.getRotation().y)
            const speedZ = this.config.speed * delta * Math.cos(this.object3DComponent.getRotation().y)
            this.object3DComponent.getPosition().x += speedX
            this.object3DComponent.getPosition().z += speedZ

            if (this.object3DComponent.getPosition().distanceTo(this.pathTarget as Vector3) < 1) {
                this.setNextPathTarget()
            }
        }
    }

    setNextPathTarget() {
        if (!this.path) {
            return
        }
        if (this.pathTargetIndex < this.path.length - 1) {
            this.pathTargetIndex++
            this.pathTarget = this.path[this.pathTargetIndex]
            this.gameObject.signals.send(EventsComponents.OBJECT_3D_LOOK_AT_ANIM, this.pathTarget)
        } else {
            this.isMoving = false
            this.path = undefined
            this.gameObject.signals.send(EventsComponents.ANIM_3D_SET_ANIM, 'idle')
        }
    }
}
