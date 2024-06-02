import BaseComponent from '../../engine/components/base-component'
import Anim3DComponent from '../../engine/components/anim-3d-component'
import BaseGameObject from '../../engine/game-objects/base-game-object'
import BaseComponentConfig from '../../engine/components/components.types'


export default class UnitWorkerComponent extends BaseComponent {
    private anim3DComponent: Anim3DComponent | undefined

    constructor(gameObject: BaseGameObject, config: BaseComponentConfig) {
        super(gameObject, config)
        this.anim3DComponent = undefined
    }

    init() {
        this.anim3DComponent = this.gameObject.getComponent(Anim3DComponent) as Anim3DComponent

    }
}
