import BaseModule from './../../engine/modules/base-module'
import BaseModuleConfig from './../../engine/modules/base-module.types'
import GameEvents from '../game-events'
import './ui-module.scss'
import Engine from '../../engine/engine'

export default class UIModule extends BaseModule {
    private root: HTMLDivElement
    private buttons: HTMLButtonElement[] = []

    constructor(engine: Engine, config: BaseModuleConfig) {
        super(engine, config)
        this.root = document.createElement('div')
    }

    init() {
        this.root.id = 'game-ui'
        document.body.appendChild(this.root)

        this.addButton('home')
        this.addButton('home')
        this.addButton('home')
    }

    addButton(name: string) {
        const button = document.createElement('button')
        button.innerHTML = name
        button.onclick = () => {
            this.engine.signals.send(GameEvents.ADD_ITEM, name)
            console.log('click')
        }
        this.root.appendChild(button)
        this.buttons.push(button)
    }
}
