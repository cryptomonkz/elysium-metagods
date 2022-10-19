import { AbstractConnector } from '@web3-react/abstract-connector';

export class Connector {
    public name: string
    public image: string
    public actualConnector: AbstractConnector
    public description: string

    constructor(name: string, image: string, actualConnector: AbstractConnector, description: string) {
        this.name = name
        this.image = image
        this.actualConnector = actualConnector
        this.description = description
    }

}