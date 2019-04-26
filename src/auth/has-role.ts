import { Request, Response, NextFunction } from 'express'

import { Principal } from './principal'
import { HttpError } from '../error'

export const hasRole = (req: Request, next: NextFunction, roles: string | string[]) => {
    let result: boolean = false;

    if (!req.principal || !req.principal.loggedIn) {
        return next(new HttpError(`Unauthorized`, 401))
    }

    new Array().concat(roles)
        .forEach((role) => {
            if ((<Principal>req.principal).roles.indexOf(role) !== -1) {
                result = true
            }
        })

    return result ? next() : next(new HttpError('Unauthorized', 401))
}