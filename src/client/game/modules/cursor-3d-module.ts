import BaseModule from './../../engine/modules/base-module'
import BaseModuleConfig from './../../engine/modules/base-module.types'
import Engine from '../../engine/engine'
import RendererModule from '../../engine/modules/renderer/renderer-module'
import { Group, Vector3 } from 'three'
import Events from '../../engine/events'
import MapModule from './map-module'
import Utils from '../../engine/utils'
import GameEvents from '../game-events'

export default class Cursor3DModule extends BaseModule {
    public position: Vector3 = new Vector3()
    private renderer: RendererModule | null = null
    private scene: Group | null = null
    private mapModule: MapModule | null = null

    constructor(engine: Engine, config: BaseModuleConfig) {
        super(engine, config)
    }

    init() {
        this.renderer = this.engine.getModule(RendererModule) as RendererModule
        this.mapModule = this.engine.getModule(MapModule) as MapModule
        document.body.addEventListener('pointermove', this.onPointerMove.bind(this))
        document.body.addEventListener('pointerup', this.onPointerUp.bind(this))

        this.engine.signals.on(Events.SET_SCENE, this.onSetScene.bind(this))
    }

    onSetScene(data: Group) {
        this.scene = data
    }

    onPointerMove(event: any) {

        if (!this.renderer || !this.scene || !this.mapModule) {
            return
        }

        const intersects =
            Utils.pointerIntersectObjects(event, this.mapModule.getCells(), this.renderer.camera)

        //TODO Review comments
        // console.log("Intersects:", intersects);
        // const isLeftMouse = event.button === 0;

        if (intersects[0]) {
            let roundedPosition = new Vector3()
            roundedPosition.x = Math.round(intersects[0].point.x / this.mapModule.getCellWidth()) * this.mapModule.getCellWidth()
            roundedPosition.z = Math.round(intersects[0].point.z / this.mapModule.getCellHeight()) * this.mapModule.getCellHeight()
            this.position.copy(roundedPosition)
        }
    }

    onPointerUp(event: any) {
        if (!this.renderer || !this.mapModule) {
            return
        }

        const intersects =
            Utils.pointerIntersectObjects(event, this.renderer.scene.children, this.renderer.camera)

        this.engine.signals.send(GameEvents.CURSOR_3D_CLICK, intersects)
    }
}
