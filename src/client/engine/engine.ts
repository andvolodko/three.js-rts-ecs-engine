import Config from './config'
import BaseModule from './modules/base-module'
import BaseModuleConfig from './modules/base-module.types'
import Signals from './signals'

export default class Engine {
    public config: Config
    private modules: BaseModule[] = []
    public signals: Signals

    constructor(config: Config) {
        this.config = config
        this.signals = new Signals()
    }

    init() {
        this.config.modules.forEach((moduleConfigData) => {
            const module = new moduleConfigData.className(this, moduleConfigData.config as BaseModuleConfig)
            this.modules.push(module)
        })

        this.modules.forEach((module) => {
            module.init()
        })
    }

    getModule(className: any): BaseModule | undefined {
        let result
        this.modules.forEach((module) => {
            if (module instanceof className) {
                result = module
            }
        })

        return result
    }
}
