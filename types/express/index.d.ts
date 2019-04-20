import { Principal } from '../../src/auth'

declare global {
    namespace Express {
        
        export interface Request {
            principal?: Principal
        }
    }
}