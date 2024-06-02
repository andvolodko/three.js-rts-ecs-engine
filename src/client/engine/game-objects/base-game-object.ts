import BaseGameObjectConfig from './game-object.types'
import Engine from '../engine'
import BaseComponent from '../components/base-component'
import Signals from '../signals'

export default class BaseGameObject {
    public config: BaseGameObjectConfig
    public engine: Engine
    private components: BaseComponent[]
    public signals: Signals

    constructor(engine: Engine, config: BaseGameObjectConfig) {
        this.engine = engine
        this.config = config
        this.components = []
        this.signals = new Signals()
    }

    init() {
        this.components.forEach((component) => {
            component.init()
        })
        console.log('BaseGameObject init: ' + this.config.id)
    }

    addComponent(component: BaseComponent) {
        this.components.push(component)
    }

    getComponent(className: any): BaseComponent | null {
        let result: BaseComponent | null = null
        this.components.forEach((component) => {
            if (component instanceof className) {
                result = component
            }
        })

        return result
    }
}
