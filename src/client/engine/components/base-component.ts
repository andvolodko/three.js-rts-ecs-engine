import BaseComponentConfig from './components.types'
import BaseGameObject from '../game-objects/base-game-object'

export default class BaseComponent {
    protected gameObject: BaseGameObject
    protected config: any

    constructor(gameObject: BaseGameObject, config: BaseComponentConfig) {
        this.gameObject = gameObject
        this.config = config as any
    }

    init() {
        console.log('BaseComponent init id: ' + this.config.id)
    }
}
