import BaseModule from './base-module'
import Stats from 'three/examples/jsm/libs/stats.module'
import BaseModuleConfig from './base-module.types'
import Events from '../events'
import Engine from '../engine'

export default class StatsModule extends BaseModule {
    private stats: Stats

    constructor(engine: Engine, config: BaseModuleConfig) {
        super(engine, config)
        this.stats = new Stats()
    }

    init() {
        super.init()
        document.body.appendChild(this.stats.dom)

        this.engine.signals.on(Events.ANIMATE_END, this.onAnimateEnd.bind(this))
    }

    onAnimateEnd() {
        this.stats.update()
    }

}
