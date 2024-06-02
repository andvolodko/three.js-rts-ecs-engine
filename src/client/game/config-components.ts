import { ComponentConfigItems } from '../engine/components/components.types'
import Object3DComponent from '../engine/components/object-3d-component'
import Follow3DComponent from '../engine/components/follow-3d-component'
import Anim3DComponent from '../engine/components/anim-3d-component'
import UnitWorkerComponent from './components/unit-worker-component'
import Select3dObjectComponent from './components/select-3d-object-component'
import UnitComponent from './components/unit-component'

const Components: ComponentConfigItems = [
    {
        id: 'object-3d',
        className: Object3DComponent,
    },
    {
        id: 'follow-3d',
        className: Follow3DComponent,
    },
    {
        id: 'anim-3d',
        className: Anim3DComponent,
    },
    {
        id: 'unit',
        className: UnitComponent,
    },
    {
        id: 'select-3d-object',
        className: Select3dObjectComponent,
    },
    {
        id: 'unit-worker',
        className: UnitWorkerComponent,
    },
]

export default Components
