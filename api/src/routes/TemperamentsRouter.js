const { Router } = require("express");
const { getTemperamentsHandler } = require("../handlers/TemperamentsHandler");

const TemperamentsRouter = Router();

TemperamentsRouter.get("/", getTemperamentsHandler);

module.exports = TemperamentsRouter;