import BaseModuleConfig from './base-module.types'
import Engine from '../engine'

export default class BaseModule {
    protected config: any
    protected engine: Engine

    constructor(engine: Engine, config: BaseModuleConfig) {
        this.config = config as any
        this.engine = engine
    }

    init() {
        console.log('BaseModule init name: ' + this.constructor.name)
    }
}
