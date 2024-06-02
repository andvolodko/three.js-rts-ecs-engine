import Engine from './engine/engine'
import config from './game/config'
import Events from './engine/events'
import RendererModule from './engine/modules/renderer/renderer-module'
import AssetsModule from './engine/modules/assets/assets-module'
import { Group, PerspectiveCamera, Vector3 } from 'three'
import GameEvents from './game/game-events'
import GameObjectsModule from './engine/modules/game-objects-module'
import EventsComponents from './engine/components/events-components'
import BaseGameObject from './engine/game-objects/base-game-object'
import Cursor3DModule from './game/modules/cursor-3d-module'

const pseudoRandom = require('pseudo-random')

const engine = new Engine(config)
engine.init()
console.log(engine)

let currentSceneModel: Group | null = null

engine.signals.on(Events.RESOURCES_LOADED, () => {
    console.log('!!! RESOURCES_LOADED')

    const assets = engine.getModule(AssetsModule) as AssetsModule
    const renderer = engine.getModule(RendererModule) as RendererModule

    const scene = assets.get('scene') as Group
    scene.position.y = -20
    renderer.scene.add(scene)
    currentSceneModel = scene

    engine.signals.send(Events.SET_SCENE, scene)

    const camera = scene.getObjectByName('OrthographicCamera') as PerspectiveCamera
    renderer.camera.position.copy(camera.position)
    renderer.camera.rotation.copy(camera.rotation)
    renderer.camera.scale.copy(camera.scale)

    console.log(scene)

    testPseudoRandom()
    addTrees()
    addBushes()
})

engine.signals.send(Events.LOAD_RESOURCES)

let currentTarget: BaseGameObject | null = null

engine.signals.on(GameEvents.ADD_ITEM, () => {
    const cursor3D = engine.getModule(Cursor3DModule) as Cursor3DModule

    const gameObjects = engine.getModule(GameObjectsModule) as GameObjectsModule
    const building = gameObjects.create('building')
    currentTarget = building

    if (building) {
        building.signals.send(EventsComponents.FOLLOW_3D_SET_TARGET, cursor3D.position)
    }
})

engine.signals.on(Events.POINTER_UP, (event: any) => {
    if (currentTarget) {
        currentTarget.signals.send(EventsComponents.FOLLOW_3D_SET_TARGET, null)
        currentTarget = null
    }
})


//TEMP CODE TODO REMOVE
function testPseudoRandom() {
    const prng = pseudoRandom(2) // set seed 2

    for (let i = 0; i < 10; i++) {

        const gameObjects = engine.getModule(GameObjectsModule) as GameObjectsModule
        const guard = gameObjects.create('guard')
        const pos = new Vector3(prng.random() * 20, 0, prng.random() * 20)
        if (guard) {
            guard.signals.send(EventsComponents.OBJECT_3D_SET_POSITION, pos)
        }
    }

}

function addTrees() {
    const prng = pseudoRandom(3) // set seed 3

    for (let i = 0; i < 100; i++) {

        const gameObjects = engine.getModule(GameObjectsModule) as GameObjectsModule
        const tree = gameObjects.create('tree1')
        const pos = new Vector3(prng.random() * 50, 0, prng.random() * 50)
        if (tree) {
            tree.signals.send(EventsComponents.OBJECT_3D_SET_POSITION, pos)
        }
    }
}

function addBushes() {
    const prng = pseudoRandom(4) // set seed 4

    for (let i = 0; i < 100; i++) {

        const gameObjects = engine.getModule(GameObjectsModule) as GameObjectsModule
        const tree = gameObjects.create('bush1')
        const pos = new Vector3(prng.random() * 50, 0, prng.random() * 50)
        if (tree) {
            tree.signals.send(EventsComponents.OBJECT_3D_SET_POSITION, pos)
        }
    }
}
