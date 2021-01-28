"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var typescript_rest_1 = require("typescript-rest");
// Importing all handlers
require("./handlers");
var schedulecontroller_1 = __importDefault(require("./routes/schedulecontroller"));
var crewmembercontroller_1 = __importDefault(require("./routes/crewmembercontroller"));
exports.app = express_1.default();
exports.app.use(cors_1.default());
exports.app.use(body_parser_1.default.json());
var schedulecController = new schedulecontroller_1.default();
exports.app.use('/', schedulecController.router);
var crewmemberController = new crewmembercontroller_1.default();
exports.app.use('/', crewmemberController.router);
typescript_rest_1.Server.buildServices(exports.app);
// Just checking if given PORT variable is an integer or not
var port = parseInt(process.env.PORT || "");
if (isNaN(port) || port === 0) {
    port = 9000;
}
exports.app.listen(port, "0.0.0.0", function () {
    console.log("\uD83D\uDE80 Server Started at PORT: " + port);
});
//# sourceMappingURL=index.js.map