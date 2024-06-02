import BaseModule from './base-module'
import BaseModuleConfig from './base-module.types'
import Events from '../events'
import Engine from '../engine'

export default class InputModule extends BaseModule {

    constructor(engine: Engine, config: BaseModuleConfig) {
        super(engine, config)
    }

    init() {
        super.init()
        document.body.addEventListener('pointerup', this.onPointerUp.bind(this))
    }

    onPointerUp(event: any) {
        this.engine.signals.send(Events.POINTER_UP, event)
    }
}
