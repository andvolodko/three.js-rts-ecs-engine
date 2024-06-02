import BaseModule from './base-module'
import BaseModuleConfig from './base-module.types'
import Engine from '../engine'
import BaseGameObject from '../game-objects/base-game-object'
import BaseGameObjectConfig from '../game-objects/game-object.types'
import BaseComponent from '../components/base-component'
import BaseComponentConfig, { ComponentConfig } from '../components/components.types'

export default class GameObjectsModule extends BaseModule {
    private gameObjects: BaseGameObject[]

    constructor(engine: Engine, config: BaseModuleConfig) {
        super(engine, config)
        this.gameObjects = []
    }

    init() {
        super.init()
    }

    create(id: string): BaseGameObject | null {

        const goConfig = this.engine.config.gameObjects.find(elem => elem.id === id) as BaseGameObjectConfig

        if (goConfig) {
            const gameObject = new BaseGameObject(this.engine, goConfig)

            goConfig.components.forEach((config) => {
                const component = this.createComponent(config.id, gameObject, config.config as BaseComponentConfig)
                gameObject.addComponent(component as BaseComponent)
            })

            this.gameObjects.push(gameObject)
            gameObject.init()

            return gameObject
        } else {
            console.warn(`GameObjectsModule create GameObject ${id} not found`)
        }

        return null
    }

    private createComponent(id: string, gameObject: BaseGameObject, config: BaseComponentConfig): BaseComponent | null {
        const componentConfig = this.engine.config.components.find(elem => elem.id === id) as ComponentConfig

        if (componentConfig) {
            const component = new componentConfig.className(gameObject, config)
            return component
        } else {
            console.warn(`GameObjectsModule createComponent Component ${id} not found`)
        }

        return null
    }

}
