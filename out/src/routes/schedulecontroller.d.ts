import * as express from 'express';
declare class ScheduleController {
    router: import("express-serve-static-core").Router;
    path: string;
    constructor();
    intializeRoutes(): void;
    getSchedule: (request: express.Request, response: express.Response) => void;
}
export default ScheduleController;
