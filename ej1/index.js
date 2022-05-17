//Importacion y ejecucion de express:
const express = require('express');
const app = express();

//Importacion y ejecucion de LogPlease
const Logger = require('logplease');
const logger = Logger.create('Server');

// Declaracion del puerto que usaremos
const port = '6565';

//Inicio del servidor con Express:
app.listen(port, () => {
    logger.info(`Servidor levantado en el puerto ${port}, disfruta UwU`)
})