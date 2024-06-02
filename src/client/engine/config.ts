import BaseModule from './modules/base-module'
import BaseModuleConfig from './modules/base-module.types'
import { GameObjectConfigItems } from './game-objects/game-object.types'
import { ComponentConfigItems } from './components/components.types'
import Engine from './engine'

interface ModuleConfig {
    className: new (engine: Engine, config: BaseModuleConfig) => BaseModule
    config?: BaseModuleConfig | {}
}

interface Config {
    modules: ModuleConfig[]
    components: ComponentConfigItems
    gameObjects: GameObjectConfigItems
}

export default Config
