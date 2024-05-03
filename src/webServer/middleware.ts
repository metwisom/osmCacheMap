import {Request} from './request';

type Middleware = (request: Request, params: string[]) => Promise<void>

export {Middleware};