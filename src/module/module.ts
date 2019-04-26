import { Container } from 'inversify'
import { Logger } from '../logger';

export abstract class Module {

    abstract bootstrap(container: Container): void

    abstract start(): Promise<void>

}