import cors from 'cors'
import * as bodyParser from 'body-parser'
import methodOverride from 'method-override'
import express from 'express'
import { Container } from 'inversify'
import { TYPES } from '../types'
import { Controller } from '../controller/controller'
import { Middleware } from '../middleware'

export class Server {

    private app: express.Application
    private router: express.Router

    constructor(
        private container: Container
    ) {

        this.app = express()
        this.router = express.Router()

        this.config()

        this.routes()
    }

    private config() {
        this.app.use(cors())
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: true}))
        this.app.use(methodOverride())
    }

    private routes() {
        
        // Pre routing middleware
        this.container.getAll<Middleware>(TYPES.PreRoutingMiddleware)
            .forEach((middleware) => {
                this.router.use(middleware)
            })
        
        // Routes
        this.container.getAll<Controller>(TYPES.Controller)
            .forEach((controller) => {
                controller.setupRoutes(this.router)
            })

        // Post routing middleware
        this.container.getAll<Middleware>(TYPES.PostRoutingMiddleware)
            .forEach((middleware) => {
                this.router.use(middleware)
            })

        this.app.use(this.router)
    }

    start(port: number) {
        this.app.listen(port, () => {
            console.log(`Listening to *:${port}`)
        })
    }

}


