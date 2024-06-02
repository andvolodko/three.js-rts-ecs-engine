import { Camera, Raycaster, Vector2 } from 'three'
import { Object3D } from 'three/src/core/Object3D'

export default class Utils {
    static raycaster = new Raycaster()

    static pointerIntersectObjects(event: any, objects: Object3D[], camera: Camera) {
        const mouse = new Vector2()
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

        Utils.raycaster.setFromCamera(mouse, camera)

        return Utils.raycaster.intersectObjects(objects)
    }
}
