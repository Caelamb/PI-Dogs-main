const { Router } = require("express");
const { getDogs } = require("../handlers/DogsHandler");
const { getDogByIdHandler } = require("../handlers/DogsHandler");

const DogsRouter = Router();

DogsRouter.get("/", getDogs);
DogsRouter.get("/:idRaza", getDogByIdHandler);


module.exports = DogsRouter;