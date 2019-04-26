import { injectable, inject } from 'inversify'
import { AmqpEmitter } from '../amqp/amqp-emitter';

@injectable()
export class MovieCreatedEventEmitter extends AmqpEmitter<MovieCreatedEvent> {

    getExchangeName(): string {
        return 'movies.created'
    }
    
}

export interface MovieCreatedEvent {
    id: number
    title: string
}
