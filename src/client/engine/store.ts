import Config from './config'

export default class Store {
    private config: Config

    constructor(config: Config) {
        this.config = config
    }

    init(onLoad: Function) {
    }
}
