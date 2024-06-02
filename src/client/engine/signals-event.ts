export default class SignalsEvent {

    public stop: boolean = false
    public proceed: boolean = false

    constructor() {
    }

    setStop() {
        this.stop = true
    }

    setProceed() {
        this.proceed = true
    }
}
