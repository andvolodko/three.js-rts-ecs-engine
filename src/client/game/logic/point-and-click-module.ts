import BaseModule from './../../engine/modules/base-module'
import BaseModuleConfig from './../../engine/modules/base-module.types'
import Engine from '../../engine/engine'
import GameEvents from '../game-events'
import BaseGameObject from '../../engine/game-objects/base-game-object'
import { Intersection } from 'three'
import Cursor3DModule from '../modules/cursor-3d-module'
import PathFindModule from '../modules/path-find-module'
import Object3DComponent from '../../engine/components/object-3d-component'
import GameComponentEvents from '../game-component-events'

export default class PointAndClickModule extends BaseModule {
    private selectedGameObject: BaseGameObject | undefined = undefined
    private cursor3D: Cursor3DModule | undefined = undefined
    private pathFind: PathFindModule | undefined = undefined
    private selected3DComponent: Object3DComponent | undefined = undefined
    private skipMapClick: boolean = false

    constructor(engine: Engine, config: BaseModuleConfig) {
        super(engine, config)
    }

    init() {
        this.engine.signals.on(GameEvents.CURSOR_3D_CLICK, this.onCursor3DClick.bind(this))
        this.engine.signals.on(GameEvents.SELECT_3D_OBJECT, this.onSelect3DObject.bind(this))
        this.engine.signals.on(GameEvents.MAP_CELL_CLICK, this.onMapCellClick.bind(this))

        this.cursor3D = this.engine.getModule(Cursor3DModule) as Cursor3DModule
        this.pathFind = this.engine.getModule(PathFindModule) as PathFindModule
    }

    onCursor3DClick() {
        this.selectedGameObject = undefined
    }

    onSelect3DObject(object: BaseGameObject) {
        this.selectedGameObject = object
        this.selected3DComponent = this.selectedGameObject.getComponent(Object3DComponent) as Object3DComponent
        this.skipMapClick = true
    }

    onMapCellClick(cell: Intersection) {
        if (cell && this.selectedGameObject && this.selected3DComponent && this.cursor3D && this.pathFind) {
            const path = this.pathFind.find(this.selected3DComponent.getPosition(), this.cursor3D.position)

            this.selectedGameObject.signals.send(GameComponentEvents.SET_PATH, path)
        }
    }
}
