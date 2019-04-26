import { Request } from 'express'

export class Pageable {

    page: number
    pageSize: number
    sort: Sort

    protected constructor(
        _page: number,
        _pageSize: number,
        _sort: Sort
    ) {
        this.page = _page
        this.pageSize = _pageSize
        this.sort = _sort

    }

    toPredicate() : any {
        return {
            [this.sort.by]: this.sort.direction ? this.sort.direction.toUpperCase() : 'ASC'
        }
    }

    static fromRequest(req: Request): Pageable {
        const page: number = req.query.page ? req.query.page : 0
        const pageSize: number = req.query.pageSize ? req.query.pageSize : 20
        const sort = {
            by: req.query.sort ? req.query.sort : 'id',
            direction: req.query.sortDirection ? req.query.sortDirection : 'asc'
        }

        return new Pageable(page, pageSize, sort)
    }
}

export type Direction  = 'asc' | 'desc'

export interface Sort {

    by: string
    direction?: Direction

}

