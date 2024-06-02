import BaseModule from './../../engine/modules/base-module'
import BaseModuleConfig from './../../engine/modules/base-module.types'
import Engine from '../../engine/engine'
import RendererModule from '../../engine/modules/renderer/renderer-module'
import * as THREE from 'three'
import { Group, Vector2, Vector3 } from 'three'
import Events from '../../engine/events'
import Utils from '../../engine/utils'
import GameEvents from '../game-events'

export default class MapModule extends BaseModule {
    private renderer: RendererModule | null = null
    private cells: THREE.Mesh[] = []

    constructor(engine: Engine, config: BaseModuleConfig) {
        super(engine, config)
    }

    init() {
        this.renderer = this.engine.getModule(RendererModule) as RendererModule

        this.engine.signals.on(Events.SET_SCENE, this.onSetScene.bind(this))
        this.engine.signals.on(Events.RENDERER_POINTER_UP, this.onPointerUp.bind(this))
    }

    onSetScene(data: Group) {
        this.addCells()
    }

    onPointerUp(event: any) {
        if (!this.renderer) {
            return
        }

        const intersects =
            Utils.pointerIntersectObjects(event, this.cells, this.renderer.camera)

        if (intersects && intersects[0]) {
            this.engine.signals.send(GameEvents.MAP_CELL_CLICK, intersects[0])
        }
    }

    addCells() {
        for (let x = 0; x < this.config.width; x++) {
            for (let y = 0; y < this.config.height; y++) {
                this.addCell(x, y)
            }
        }
    }

    addCell(x: number, y: number) {
        if (this.renderer && this.renderer.scene) {
            const geometry = new THREE.BoxGeometry(
                this.config.cell.width,
                this.config.cell.depth,
                this.config.cell.height,
            )
            const material = new THREE.MeshBasicMaterial(
                {
                    color: 0x00ff00,
                    opacity: 0.1,
                    transparent: true,
                    //TODO
                    // wireframe: true,
                })
            const cell = new THREE.Mesh(geometry, material)
            cell.position.set(x * this.config.cell.width, 0, y * this.config.cell.height)
            const _wireframe = new THREE.EdgesGeometry(geometry) // or WireframeGeometry( geometry )
            const wireframe = new THREE.LineSegments(_wireframe)
            wireframe.position.copy(cell.position)
            this.renderer.scene.add(cell)
            this.renderer.scene.add(wireframe)
            this.cells.push(cell)
        }
    }

    worldToMap(world: Vector3): Vector2 {
        const mapPosition = new Vector2()
        mapPosition.x = Math.round(world.x / this.getCellWidth()) + 1
        mapPosition.y = Math.round(world.z / this.getCellHeight()) + 1
        return mapPosition
    }

    mapToWorld(point: [number, number]): Vector3 {
        const worldPosition = new Vector3()
        worldPosition.x = (point[0] - 1) * this.getCellWidth()
        worldPosition.y = 0
        worldPosition.z = (point[1] - 1) * this.getCellHeight()
        return worldPosition
    }

    mapToWorldPath(path: [number, number][]): Vector3[] {
        const worldPath: Vector3[] = []

        path.forEach((point: [number, number]) => {
            const worldPoint = this.mapToWorld(point)
            worldPath.push(worldPoint)
        })

        return worldPath
    }

    getCells() {
        return this.cells
    }

    getCellWidth() {
        return this.config.cell.width
    }

    getCellHeight() {
        return this.config.cell.height
    }

    getWidth() {
        return this.config.width
    }

    getHeight() {
        return this.config.height
    }
}
