import { Router, Request, Response, NextFunction } from 'express'
import { injectable } from 'inversify'

import { Controller } from '../controller/controller'

@injectable()
export class SerieController implements Controller {

    setupRoutes(router: Router): void {
        router.get('/series', this.getSeries.bind(this))
    }

    getSeries(req: Request, res: Response, next: NextFunction) {
        res
            .json({
                message: 'it works'
            })
        return next()
    }


}