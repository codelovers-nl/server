import express, { Router, Request, Response, NextFunction } from 'express'
import { injectable } from 'inversify'

import { Controller } from '../controller/controller'
import { HttpError } from '../error/http-error'

@injectable()
export class HelloWorldController implements Controller {

    setupRoutes(router: Router): void {
        router.get('/hello', this.sayHello.bind(this))
        router.get('/err', this.raiseError.bind(this))
    }

    sayHello(req: Request, res: Response, next: NextFunction) {
        res.json({
            message: `Hello ${req.principal ? req.principal.name : ''}!` 
        })

        next()
    }

    raiseError(req: Request, res: Response, next: NextFunction): void {
        next(new HttpError('Custom error', 402))
    }

}