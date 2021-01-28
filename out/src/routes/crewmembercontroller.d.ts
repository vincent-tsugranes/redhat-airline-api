import * as express from 'express';
declare class CrewmemberController {
    router: import("express-serve-static-core").Router;
    path: string;
    constructor();
    intializeRoutes(): void;
    allCrewmembers: (request: express.Request, response: express.Response) => void;
    getCrewmember: (request: express.Request, response: express.Response) => void;
}
export default CrewmemberController;
