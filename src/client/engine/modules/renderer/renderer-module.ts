import BaseModule from '../base-module'
import BaseModuleConfig from '../base-module.types'
import * as THREE from 'three'
import { Clock, OrthographicCamera, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import TWEEN from '@tweenjs/tween.js'
import Events from '../../events'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Engine from '../../engine'
import PerspectiveRendererCamera from './perspective-renderer-camera'
import OrthographicRendererCamera from './ortographic-renderer-camera'

export default class RendererModule extends BaseModule {
    public renderer: WebGLRenderer
    public scene: Scene
    public camera: PerspectiveCamera | OrthographicCamera
    private controls: OrbitControls
    private clock: Clock
    private rendererCamera: PerspectiveRendererCamera | OrthographicRendererCamera

    constructor(engine: Engine, config: BaseModuleConfig) {
        super(engine, config)
        this.scene = new THREE.Scene()
        //TODO Move to Config camera type selection
        // this.rendererCamera = new OrthographicRendererCamera();
        this.rendererCamera = new PerspectiveRendererCamera()
        this.camera = this.rendererCamera.threeCamera

        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.clock = new THREE.Clock()

        this.renderer.shadowMap.enabled = true
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(this.renderer.domElement)
        window.addEventListener('resize', this.onWindowResize.bind(this), false)
        this.renderer.domElement.addEventListener('pointerup', this.onPointerUp.bind(this))

        this.controls = new OrbitControls(this.camera, this.renderer.domElement)

        this.rendererCamera.onWindowResize()
    }

    init() {
        super.init()

        this.animate()
    }

    onWindowResize() {
        this.rendererCamera.onWindowResize()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.render()
    }

    onPointerUp(event: any) {
        this.engine.signals.send(Events.RENDERER_POINTER_UP, event)
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this))

        const delta: number = this.clock.getDelta()
        this.engine.signals.send(Events.ANIMATE_START, delta)

        this.controls.update()

        TWEEN.update()

        this.render()

        this.engine.signals.send(Events.ANIMATE_END)
    }

    render() {
        this.renderer.render(this.scene, this.camera)
    }

}
