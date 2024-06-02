import * as THREE from 'three'
import { PerspectiveCamera } from 'three'

export default class PerspectiveRendererCamera {
    public threeCamera: PerspectiveCamera

    constructor() {
        this.threeCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

        //TODO Update shadow settings
        // this.camera.castShadow = true;
        // this.camera.receiveShadow = true;
    }

    onWindowResize() {
        this.threeCamera.aspect = window.innerWidth / window.innerHeight
        this.threeCamera.updateProjectionMatrix()
    }

}
