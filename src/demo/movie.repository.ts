import { injectable } from 'inversify'

import { PagingRepository } from '../repository/paging-repository'

import { Movie } from './movie'
import { EntityRepository } from 'typeorm';

@EntityRepository(Movie)
export class MovieRepository extends PagingRepository<Movie> {

}