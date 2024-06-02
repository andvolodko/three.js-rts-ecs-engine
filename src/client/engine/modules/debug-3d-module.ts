import BaseModule from './base-module'
import BaseModuleConfig from './base-module.types'
import Engine from '../engine'
import RendererModule from './renderer/renderer-module'
import { GUI } from 'dat.gui'
import Events from '../events'
import Utils from '../utils'

export default class Debug3DModule extends BaseModule {
    private renderer: RendererModule | null = null
    private gui: GUI | null = null
    private objectFolder: GUI | null = null
    private positionFolder: GUI | null = null
    private rotationFolder: GUI | null = null

    constructor(engine: Engine, config: BaseModuleConfig) {
        super(engine, config)
    }

    init() {
        super.init()
        this.renderer = this.engine.getModule(RendererModule) as RendererModule

        this.engine.signals.on(Events.RENDERER_POINTER_UP, this.onPointerUp.bind(this))
    }

    addGUI(object3d: any) {
        this.gui?.destroy()
        this.gui = new GUI()
        this.objectFolder = this.gui.addFolder('3D Object')
        this.positionFolder = this.objectFolder.addFolder('Position')
        this.positionFolder.add(object3d.position, 'x', -50, 50)
        this.positionFolder.add(object3d.position, 'y', -50, 50)
        this.positionFolder.add(object3d.position, 'z', -50, 50)
        this.positionFolder.open()
        this.rotationFolder = this.objectFolder.addFolder('Rotation')
        this.rotationFolder.add(object3d.rotation, 'x', 0, Math.PI * 2, 0.01)
        this.rotationFolder.add(object3d.rotation, 'y', 0, Math.PI * 2, 0.01)
        this.rotationFolder.add(object3d.rotation, 'z', 0, Math.PI * 2, 0.01)
        this.rotationFolder.open()
        this.objectFolder.open()
    }

    inspectObject(object3d: any) {
        this.addGUI(object3d)
    }

    onPointerUp(event: any) {
        if (!this.renderer) {
            return
        }

        const intersects =
            Utils.pointerIntersectObjects(event, this.renderer.scene.children, this.renderer.camera)

        //TODO
        // console.log("Intersects:", intersects);
        // const isLeftMouse = event.button === 0;

        if (intersects[0] && intersects[0].object) {
            this.inspectObject(intersects[0].object)
        }
    }
}
