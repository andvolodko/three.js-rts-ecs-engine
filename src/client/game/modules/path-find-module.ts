import BaseModule from './../../engine/modules/base-module'
import BaseModuleConfig from './../../engine/modules/base-module.types'
import Engine from '../../engine/engine'
import MapModule from './map-module'
import * as THREE from 'three'
import { Mesh, Vector3 } from 'three'
import RendererModule from '../../engine/modules/renderer/renderer-module'

const PF = require('pathfinding')
/**
 * https://github.com/qiao/PathFinding.js
 * https://qiao.github.io/PathFinding.js/visual/
 */
export default class PathFindModule extends BaseModule {
    private map: MapModule | undefined = undefined
    private grid: any
    private finder: any
    private renderer: RendererModule | undefined = undefined
    private path3D: Mesh[] = []

    constructor(engine: Engine, config: BaseModuleConfig) {
        super(engine, config)
    }

    init() {
        this.renderer = this.engine.getModule(RendererModule) as RendererModule
        this.map = this.engine.getModule(MapModule) as MapModule
        this.grid = new PF.Grid(this.map.getWidth(), this.map.getHeight())
        this.finder = new PF.AStarFinder()
    }

    find(start: Vector3, end: Vector3): Vector3[] | null {
        if (!this.map) {
            return null
        }
        const startMap = this.map.worldToMap(start)
        const endMap = this.map.worldToMap(end)
        const grid = this.grid.clone()
        let path = this.finder.findPath(startMap.x, startMap.y, endMap.x, endMap.y, grid)

        console.log('!!! pathf:', startMap.x, startMap.y, endMap.x, endMap.y)
        console.log('!!! path:', path)
        if (path.length) {
            //TODO
            // path = PF.Util.smoothenPath(grid, path);
            // path= PF.Util.compressPath(path);
            path = PF.Util.expandPath(path)
        }

        const worldPath = this.map.mapToWorldPath(path)

        this.visualize(worldPath)

        return worldPath
    }

    visualize(path: Vector3[]) {
        if (!path) {
            return
        }
        this.clearVisualization()
        path.forEach((point: Vector3) => {
            if (!this.renderer || !this.map) {
                return
            }
            const path3DObject = this.createVisualPoint(point)
            this.renderer.scene.add(path3DObject)
            this.path3D.push(path3DObject)
        })
    }

    clearVisualization() {
        this.path3D.forEach((mesh) => {
            if (!this.renderer) {
                return
            }
            this.renderer.scene.remove(mesh)
        })
        this.path3D.length = 0
    }

    private createVisualPoint(point: Vector3): Mesh {
        const geometry = new THREE.SphereGeometry(
            0.5,
        )
        const material = new THREE.MeshBasicMaterial(
            {
                color: 0x00ff00,
                opacity: 0.5,
                transparent: true,
                //TODO
                // wireframe: true,
            })
        const cell = new THREE.Mesh(geometry, material)
        cell.position.set(point.x, point.y, point.z)

        return cell
    }
}
