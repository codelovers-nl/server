import { Request, Response, NextFunction } from 'express'

import * as fs from 'fs'
import * as path from 'path'

import { verify } from 'jsonwebtoken'
import { AnonyMousPrincipal } from './anonymous-principal'
import { Principal } from './principal'
import { HttpError } from '../error'

export const jwtHandler = (req: Request, res: Response, next: NextFunction) => {
    const publicKey = fs.readFileSync(
        path.join(
            __dirname,
            '../',
            '../',
            'keys',
            'public.key'
        ),
        'utf8'
    )

    const authHeader = req.header('Authorization')
    if (!authHeader) {
        req.principal = new AnonyMousPrincipal()
        return next()
    }

    if (!authHeader.startsWith('Bearer ')) {
        return next(new HttpError(`Authorization header (${authHeader}) does not start with 'Bearer '`, 500))
    }

    const bearerToken = authHeader.substr('Bearer '.length, authHeader.length)
    const rawPrincipal = verify(bearerToken, publicKey)

    if (rawPrincipal === null) {
        return next(new HttpError(`Unauthorized`, 401))
    } else if (typeof rawPrincipal === 'string') {
        req.principal = JSON.parse(rawPrincipal)
    } else {
        req.principal = <Principal>rawPrincipal
    }

    return next()
}
