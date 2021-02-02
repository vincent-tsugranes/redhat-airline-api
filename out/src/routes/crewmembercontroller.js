"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = __importStar(require("express"));
var url = require('url');
var crewmember_1 = require("../entity/crewmember");
var crewmembers_json_1 = __importDefault(require("../..//data/crewmembers.json"));
var CrewmemberController = /** @class */ (function () {
    function CrewmemberController() {
        this.router = express.Router();
        this.path = '/crewmembers';
        this.allCrewmembers = function (request, response) {
            var crewmembers = new Array();
            crewmembers_json_1.default.crewmembers.forEach(function (crewJson) {
                var crew = new crewmember_1.Crewmember();
                crew.id = crewJson.id;
                crew.first_name = crewJson.first_name;
                crew.last_name = crewJson.last_name;
                crew.rating = crewJson.rating;
                crew.base = crewJson.base;
                crew.id = crewJson.id;
                crew.img = crewJson.img;
                crewmembers.push(crew);
            });
            response.send(crewmembers);
        };
        this.getCrewmember = function (request, response) {
            var id = +request.params.id;
            var crewJson = crewmembers_json_1.default.crewmembers.find(function (c) { return c.id == id; });
            if (crewJson != undefined) {
                var crew = new crewmember_1.Crewmember();
                crew.id = crewJson.id;
                crew.first_name = crewJson.first_name;
                crew.last_name = crewJson.last_name;
                crew.rating = crewJson.rating;
                crew.base = crewJson.base;
                crew.id = crewJson.id;
                crew.img = crewJson.img;
                response.send(crew);
            }
            else {
                response.send('Crewmember does not exist');
            }
        };
        this.intializeRoutes();
    }
    CrewmemberController.prototype.intializeRoutes = function () {
        this.router.get(this.path, this.allCrewmembers);
        this.router.get(this.path + '/:id', this.getCrewmember);
    };
    return CrewmemberController;
}());
exports.default = CrewmemberController;
//# sourceMappingURL=crewmembercontroller.js.map