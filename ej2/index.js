//Importacion y ejecucion de express:
const express = require('express');
const app = express();

//Importacion y ejecucion de LogPlease
const Logger = require('logplease');
const logger = Logger.create('Server');

// Declaracion del puerto que usaremos
const port = '4555';

//Inicio del servidor con Express:
app.listen(port, () => {
    logger.info(`Servidor levantado en el puerto ${port}, disfruta UwU`)
})

//Get de bienvenida
app.get('/', (req, res) => {
    res.send(`Bienvenido a mi servidor, cuidadito con lo que tocas ¬¬' `)
})

app.get('/productos', (req, res) => {
    res.send(`Listado de productos (Usa tu imaginacion)`);
})

app.post('/productos', (req, res) => {
    res.status(201).send(`El producto se ha añadido correctamente (Sigue usando tu imaginacion)`)
})

app.put('/productos', (req, res) => {
    res.status(200).send(`El producto se ha modificado correctamente (Sigue usando tu imaginacion)`)
})

app.delete('/productos', (req, res) => {
    res.send(`El producto se ha eliminado correctamente (Sigue usando tu imaginacion)`)
})

app.get('/usuarios', (req, res) => {
    res.send(`Listado de usuarios (Usa tu imaginacion)`)
})

app.post('/usuarios', (req, res) => {
    res.status(201).send(`El usuario se ha añadido correctamente (Sigue usando tu imaginacion)`)
});

app.put('/usuarios', (req, res) => {
    res.status(200).send(`El usuario se ha modificado correctamente (Sigue usando tu imaginacion)`)
});

app.delete('/usuarios', (req, res) => {
    res.send(`El usuario se ha eliminado correctamente (Sigue usando tu imaginacion)`)
})