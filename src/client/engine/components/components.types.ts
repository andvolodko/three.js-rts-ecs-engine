import BaseModuleConfig from '../modules/base-module.types'
import BaseComponent from './base-component'
import BaseGameObject from '../game-objects/base-game-object'

interface BaseComponentConfig {
    id: string
    assets?: {}
}

export default BaseComponentConfig

export interface ComponentConfig {
    id: string
    className: new (gameObject: BaseGameObject, config: BaseComponentConfig) => BaseComponent
    config?: BaseModuleConfig | {}
}

export type ComponentConfigItems = ComponentConfig[]
