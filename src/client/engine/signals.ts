import Events from './events'
import SignalsEvent from './signals-event'

export default class Signals {

    private subscribers: Map<string, Function[]>

    constructor() {
        this.subscribers = new Map<string, Function[]>()
    }

    init(onLoad: Function): void {
    }

    on(event: string, subscriber: Function) {
        const subscribers = this.subscribers.get(event) || []
        if (subscribers.indexOf(subscriber) >= 0) {
            console.warn('Signals on: subscriber already added')
        } else {
            subscribers.push(subscriber)
        }
        this.subscribers.set(event, subscribers)
    }

    send(event: string, data: any = null): void {
        const skipDebugEvents = [
            Events.ANIMATE_START,
            Events.ANIMATE_END,
        ]
        if (skipDebugEvents.indexOf(event) < 0) {
            console.log('Signals send: ' + event, data)
        }

        const subscribers = this.subscribers.get(event)
        if (subscribers) {
            const event = new SignalsEvent()
            subscribers.forEach((subscriber) => {
                if (!event.stop) {
                    subscriber(data, event)
                }
            })
        }
    }
}
