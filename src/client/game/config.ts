import Config from '../engine/config'
import Assets from './config-assets'
import StatsModule from '../engine/modules/stats-module'
import AssetsModule from '../engine/modules/assets/assets-module'
import NetworkModule from '../engine/modules/network-module'
import RendererModule from '../engine/modules/renderer/renderer-module'
import UIModule from './modules/ui-module'
import GameObjects from './config-gameobjects'
import Components from './config-components'
import GameObjectsModule from '../engine/modules/game-objects-module'
import Cursor3DModule from './modules/cursor-3d-module'
import InputModule from '../engine/modules/input-module'
import MapModule from './modules/map-module'
import Debug3DModule from '../engine/modules/debug-3d-module'
import PathFindModule from './modules/path-find-module'
import PointAndClickModule from './logic/point-and-click-module'
import GlobalsModule from '../engine/modules/globals-module'

const config: Config = {
    modules: [
        {
            className: RendererModule,
        },
        {
            className: StatsModule,
        },
        {
            className: NetworkModule,
            config: {},
        },
        {
            className: AssetsModule,
            config: Assets,
        },
        {
            className: GameObjectsModule,
        },
        {
            className: InputModule,
        },
        {
            className: Debug3DModule,
        },
        {
            className: GlobalsModule,
        },

        //Game related
        {
            className: UIModule,
            config: {},
        },
        {
            className: Cursor3DModule,
            config: {},
        },
        {
            className: MapModule,
            config: {
                width: 30,
                height: 30,
                cell: {
                    width: 2,
                    height: 2,
                    depth: 0.5,
                },
            },
        },
        {
            className: PathFindModule,
            config: {},
        },

        //Game Logic
        {
            className: PointAndClickModule,
            config: {},
        },
    ],
    components: Components,
    gameObjects: GameObjects,
}

export default config
