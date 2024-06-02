interface BaseGameObjectConfig {
    id: string;
    components: ComponentItem[]
}

export default BaseGameObjectConfig

export type ComponentItem = {
    id: string;
    config?: Object
};
export type GameObjectConfigItem = {
    id: string;
    components: ComponentItem[]
};
export type GameObjectConfigItems = GameObjectConfigItem[]
