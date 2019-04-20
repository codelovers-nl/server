import 'reflect-metadata'

import { Container } from 'inversify'
import { Server } from '../server'
import { HelloWorldController } from './hello-world';
import { TYPES } from '../types'

import { Request, Response, NextFunction } from 'express';
import { errorHandler } from '../error';

import { Principal } from '../auth'

const container: Container = new Container()

const preLogger = (req: Request, res: Response, next: NextFunction) => {
    next()
}

const setPrincipal = (req: Request, res: Response, next: NextFunction) => {
    const principal: Principal = {
        name: 'John Doe'
    }

    req.principal = principal

    next()
}

const postLogger = (req: Request, res: Response, next: NextFunction) => {
    next()
}

container.bind(TYPES.PreRoutingMiddleware).toConstantValue(preLogger)
container.bind(TYPES.PreRoutingMiddleware).toConstantValue(setPrincipal)
container.bind(TYPES.PostRoutingMiddleware).toConstantValue(postLogger)
container.bind(TYPES.PostRoutingMiddleware).toConstantValue(errorHandler)

container.bind<HelloWorldController>(TYPES.Controller).to(HelloWorldController)

const server: Server = new Server(container)

server.start(1111)


