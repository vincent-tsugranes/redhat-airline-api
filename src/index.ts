import express, {Request, Response} from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {Server} from "typescript-rest";

// Importing all handlers
import './handlers';

import ScheduleController from './routes/schedulecontroller';
import CrewmemberController from "./routes/crewmembercontroller";

export const app: express.Application = express();

app.use(cors());
app.use(bodyParser.json());

let schedulecController = new ScheduleController();
app.use('/', schedulecController.router);

let crewmemberController = new CrewmemberController();
app.use('/', crewmemberController.router);

Server.buildServices(app);

// Just checking if given PORT variable is an integer or not
let port = parseInt(process.env.PORT || "");
if (isNaN(port) || port === 0) {
  port = 9000;
}

app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Server Started at PORT: ${port}`);
});

