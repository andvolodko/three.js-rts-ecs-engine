import BaseComponent from './base-component'
import BaseGameObject from '../game-objects/base-game-object'
import BaseComponentConfig from './components.types'
import { Vector3 } from 'three'
import EventsComponents from './events-components'
import Events from '../events'

export default class Follow3DComponent extends BaseComponent {
    private followObject: Vector3 | null

    constructor(gameObject: BaseGameObject, config: BaseComponentConfig) {
        super(gameObject, config)
        this.followObject = null
    }

    init() {
        this.gameObject.signals.on(EventsComponents.FOLLOW_3D_SET_TARGET, this.onFollow3D.bind(this))
        this.gameObject.engine.signals.on(Events.ANIMATE_START, this.onAnimateStart.bind(this))
    }

    onFollow3D(data: Vector3) {
        this.followObject = data
    }

    onAnimateStart() {
        if (this.followObject) {
            this.gameObject.signals.send(EventsComponents.OBJECT_3D_SET_POSITION, this.followObject)
        }
    }
}
