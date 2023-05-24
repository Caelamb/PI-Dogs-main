const { Router } = require("express");
const { getDogByIdHandler } = require("../handlers/DogsHandler");
const { getDogsByNameAndAllHandler } = require("../handlers/DogsHandler");
const { createDogHandler } = require("../handlers/DogsHandler");

const DogsRouter = Router();

DogsRouter.get("/", getDogsByNameAndAllHandler);
DogsRouter.get("/:idRaza", getDogByIdHandler);
DogsRouter.post("/", createDogHandler);


module.exports = DogsRouter;