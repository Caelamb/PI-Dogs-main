const { Router } = require('express');
const DogsRouter = require("./DogsRouter");
const TemperamentsRouter = require("./TemperamentsRouter");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/dogs", DogsRouter);
router.use("/temperaments", TemperamentsRouter);

module.exports = router;
