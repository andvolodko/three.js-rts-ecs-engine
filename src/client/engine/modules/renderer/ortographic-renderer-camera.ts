import * as THREE from 'three'
import { OrthographicCamera } from 'three'

export default class OrthographicRendererCamera {
    public threeCamera: OrthographicCamera

    constructor() {
        this.threeCamera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2,
            window.innerHeight / 2, window.innerHeight / -2, 1, 1000)
        this.threeCamera.zoom = 145
        this.threeCamera.rotation.x = -0.91
        this.threeCamera.rotation.z = -0.0058
    }

    onWindowResize() {
        const aspect = window.innerWidth / window.innerHeight
        const size = this.threeCamera.far
        this.threeCamera.left = size * aspect / -2
        this.threeCamera.right = size * aspect / 2
        //TODO finish implementation
        // this.camera.aspect = window.innerWidth / window.innerHeight
        this.threeCamera.updateProjectionMatrix()
    }

}
