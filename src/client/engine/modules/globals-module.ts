import BaseModule from './base-module'
import BaseModuleConfig from './base-module.types'
import Engine from '../engine'
import RendererModule from './renderer/renderer-module'

declare global {
    interface Window {
        renderer: RendererModule;
    }
}

export default class GlobalsModule extends BaseModule {

    constructor(engine: Engine, config: BaseModuleConfig) {
        super(engine, config)
    }

    init() {
        super.init()

        const renderer = this.engine.getModule(RendererModule) as RendererModule

        window.renderer = renderer
    }

}
