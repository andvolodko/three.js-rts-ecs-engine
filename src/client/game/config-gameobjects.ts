import { GameObjectConfigItems } from '../engine/game-objects/game-object.types'

const GameObjects: GameObjectConfigItems = [
    {
        id: 'building',
        components: [
            {
                id: 'object-3d',
                config: {
                    asset: 'house',
                    scale: {
                        x: 0.01, y: 0.01, z: 0.01,
                    },
                },
            },
            {
                id: 'follow-3d',
            },
        ],
    },
    {
        id: 'gym',
        components: [
            {
                id: 'object-3d',
                config: {
                    asset: 'gym',
                },
            },
            {
                id: 'follow-3d',
            },
        ],
    },
    {
        id: 'palm',
        components: [
            {
                id: 'object-3d',
                config: {
                    asset: 'palm',
                },
            },
            {
                id: 'anim-3d',
            },
        ],
    },
    {
        id: 'tree1',
        components: [
            {
                id: 'object-3d',
                config: {
                    asset: 'tree1',
                    scale: {
                        x: 0.01, y: 0.01, z: 0.01,
                    },
                },
            },
        ],
    },
    {
        id: 'bush1',
        components: [
            {
                id: 'object-3d',
                config: {
                    asset: 'bush1',
                    scale: {
                        x: 0.01, y: 0.01, z: 0.01,
                    },
                },
            },
        ],
    },
    {
        id: 'guard',
        components: [
            {
                id: 'object-3d',
                config: {
                    asset: 'guard',
                    scale: {
                        x: 0.01, y: 0.01, z: 0.01,
                    },
                },
            },
            {
                id: 'anim-3d',
                config: {
                    anim: {
                        idle: 'guard-idle',
                        walk: 'guard-walk',
                    },
                    startAnim: 'idle',
                },
            },
            {
                id: 'select-3d-object',
                config: {
                    width: 1,
                    depth: 1,
                    height: 1,
                },
            },
            {
                id: 'unit',
                config: {
                    speed: 2,
                },
            },
            {
                id: 'unit-worker',
            },
        ],
    },
]

export default GameObjects
