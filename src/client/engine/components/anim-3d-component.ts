import BaseComponent from './base-component'
import BaseGameObject from '../game-objects/base-game-object'
import BaseComponentConfig from './components.types'
import Object3DComponent from './object-3d-component'
import { AnimationAction, AnimationMixer, Object3D } from 'three'
import Events from '../events'
import AssetsModule from '../modules/assets/assets-module'
import EventsComponents from './events-components'

export default class Anim3DComponent extends BaseComponent {
    private object3DComponent: Object3DComponent | undefined = undefined
    private mixer: AnimationMixer | undefined = undefined
    private assets: AssetsModule | undefined
    private animMap = new Map<string, AnimationAction>()
    private currentAnimation: AnimationAction | undefined = undefined

    constructor(gameObject: BaseGameObject, config: BaseComponentConfig) {
        super(gameObject, config)
    }

    init() {
        this.object3DComponent = this.gameObject.getComponent(Object3DComponent) as Object3DComponent
        this.assets = this.gameObject.engine.getModule(AssetsModule) as AssetsModule

        this.addAnimations()

        this.gameObject.engine.signals.on(Events.ANIMATE_START, this.onAnimateStart.bind(this))
        this.gameObject.signals.on(EventsComponents.ANIM_3D_SET_ANIM, this.onSetAnim.bind(this))
    }

    addAnimations() {
        if (!this.object3DComponent) {
            return
        }
        const object3d = this.object3DComponent.asset as Object3D

        this.mixer = new AnimationMixer(object3d)

        this.currentAnimation = this.addAnimationFrom3DObject('default', object3d)

        if (this.config && this.config.anim) {
            for (const animName in this.config.anim) {
                if (!this.assets) {
                    return
                }
                const animAssetId = this.config.anim[animName]
                const asset = this.assets.get(animAssetId)
                this.addAnimationFrom3DObject(animName, asset as Object3D)
            }
        }

        if (this.config.startAnim) {
            this.currentAnimation = this.animMap.get(this.config.startAnim)
        }

        if (this.currentAnimation) {
            //TODO Randomize similar animations
            // this.currentAnimation.time = Math.random() * 10
            this.currentAnimation.play()
        }
    }

    addAnimationFrom3DObject(animName: string, object3d: Object3D) {
        if (this.mixer && object3d.animations && object3d.animations[0]) {
            const action = this.mixer.clipAction(object3d.animations[0])
            if (this.animMap.has(animName)) {
                console.warn('Anim3DComponent addAnimationFrom3DObject animation override: ', this.gameObject.config.id, animName)
            }
            this.animMap.set(animName, action)

            return action
        }

        return undefined
    }

    setAnimByName(name: string) {
        const newAnimation = this.animMap.get(name)

        if (newAnimation && this.currentAnimation && this.currentAnimation !== newAnimation) {
            this.currentAnimation.fadeOut(1)
            newAnimation.reset()
            newAnimation.fadeIn(1)
            newAnimation.play()

            this.currentAnimation = newAnimation
        }
    }

    onSetAnim(name: string) {
        this.setAnimByName(name)
    }

    onAnimateStart(delta: number) {
        if (this.mixer) {
            this.mixer.update(delta)
        }
    }
}
