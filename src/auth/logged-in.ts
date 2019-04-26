import { Request, Response, NextFunction } from 'express'

import { HttpError } from '../error'

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    if (!req.principal || !req.principal.loggedIn) {
        return next(new HttpError(`Unauthorized`, 401))
    }

    return next()
}