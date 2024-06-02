import { io } from 'socket.io-client'
import BaseModule from './base-module'
import BaseModuleConfig from './base-module.types'
import Engine from '../engine'

//TODO Implement network communication
export default class NetworkModule extends BaseModule {
    constructor(engine: Engine, config: BaseModuleConfig) {
        super(engine, config)
    }

    init() {
        super.init()

        const socket = io()
        // const socket = io('http://192.168.0.116:8080', { reconnection: true })


        socket.on('connect_error', function(err) {
            console.log(err)
        })
        socket.on('connect_failed', function(err) {
            console.log(err)
        })

        socket.on('connect', function() {
            console.log('connect')
        })
        socket.on('disconnect', function(message: any) {
            console.log('disconnect ' + message)
        })
        socket.on('id', (id: any) => {
            // myId = id
            // setInterval(() => {
            //     socket.emit('update', {
            //         t: Date.now(),
            //         p: myObject3D.position,
            //         r: myObject3D.rotation,
            //     })
            // }, 50)
        })
        socket.on('clients', (clients: any) => {
            // let pingStatsHtml = 'Socket Ping Stats<br/><br/>'
            // Object.keys(clients).forEach((p) => {
            //     timestamp = Date.now()
            //     pingStatsHtml += p + ' ' + (timestamp - clients[p].t) + 'ms<br/>'
            //     if (!clientCubes[p]) {
            //         clientCubes[p] = new THREE.Mesh(geometry, material)
            //         clientCubes[p].name = p
            //         clientCubes[p].castShadow = true;
            //         clientCubes[p].receiveShadow = true;
            //         scene.add(clientCubes[p])
            //     } else {
            //         if (clients[p].p) {
            //             new TWEEN.Tween(clientCubes[p].position)
            //                 .to(
            //                     {
            //                         x: clients[p].p.x,
            //                         y: clients[p].p.y,
            //                         z: clients[p].p.z,
            //                     },
            //                     50
            //                 )
            //                 .start()
            //         }
            //         if (clients[p].r) {
            //             new TWEEN.Tween(clientCubes[p].rotation)
            //                 .to(
            //                     {
            //                         x: clients[p].r._x,
            //                         y: clients[p].r._y,
            //                         z: clients[p].r._z,
            //                     },
            //                     50
            //                 )
            //                 .start()
            //         }
            //     }
            // })
            // ;(document.getElementById('pingStats') as HTMLDivElement).innerHTML = pingStatsHtml
        })
        socket.on('removeClient', (id: string) => {
            // scene.remove(scene.getObjectByName(id) as THREE.Object3D)
        })

    }
}
