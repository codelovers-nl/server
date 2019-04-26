import 'reflect-metadata'

import { Container } from 'inversify'
import { createConnection } from 'typeorm'

import { App } from '../app'
import { EventHandler } from '../event'
import { errorHandler } from '../error'

import { AmqpModule, AmqpTypes } from '../amqp'
import { ServerModule, ServerTypes } from '../server'

import { MovieCreatedEventEmitter } from './movie.amqp-handler'
import { MovieCreatedAmqpListener } from './movie.amqp-listener'
import { SerieCreatedAmqpListener } from './serie.amqp-listener'
import { SerieController } from './series.controller'
import { MovieRepository } from './movie.repository'
import { MovieController } from './movie.controller'
import { MovieService } from './movie.service'
import { Movie } from './movie'

const container: Container = new Container({
    skipBaseClassChecks: true
})

const eventHandler: EventHandler = new EventHandler()
container.bind<EventHandler>('EventHandler').toConstantValue(eventHandler)

container.bind(ServerTypes.PostRoutingMiddleware).toConstantValue(errorHandler)
container.bind<MovieController>(ServerTypes.Controller).to(MovieController)
container.bind<SerieController>(ServerTypes.Controller).to(SerieController)
container.bind<MovieService>('MovieService').to(MovieService)
container.bind<MovieRepository>('MovieRepository').to(MovieRepository)
container.bind<MovieCreatedEventEmitter>(AmqpTypes.AmqpEmitter).to(MovieCreatedEventEmitter).inSingletonScope()
container.bind<MovieCreatedAmqpListener>(AmqpTypes.AmqpListener).to(MovieCreatedAmqpListener).inSingletonScope()
container.bind<SerieCreatedAmqpListener>(AmqpTypes.AmqpListener).to(SerieCreatedAmqpListener).inSingletonScope()

const amqpModule: AmqpModule = new AmqpModule({})
const serverModule: ServerModule = new ServerModule({
    port: 1234
})

createConnection({
    username: 'postgres',
    password: 'postgres',
    database: 'movies',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    entities: [
        Movie
    ]
}).then(async () => {
    new App(container)
        .withModule(amqpModule)
        .withModule(serverModule)
        .start()
})

