//Importacion y ejecucion de express:
const express = require('express');
const app = express();

//Importacion y ejecucion de LogPlease
const Logger = require('logplease');
const logger = Logger.create('Server', { showTimestamp: false, showLevel: false, color: Logger.Colors.Blue });

//Importacion de cors
const cors = require('cors');
app.use(cors())

// Declaracion del puerto que usaremos
const port = '3000';

//Inicio del servidor con Express:
app.listen(port, () => {
    logger.log(`Servidor levantado en el puerto ${port}`)
})

app.use(express.json());

//Pseudo JSON
const data = {
    description: 'Productos',
    items: [
        { id: 1, nombre: 'Classic Glitchpop', precio: 29, img: 'https://static1-es.millenium.gg/articles/7/32/49/7/@/150700-glitchpop-classic-orig-1-article_m-1.jpg' },
        { id: 2, nombre: 'Phantom ONI', precio: 27, img: 'https://images.cults3d.com/phlKxeVJCFsb4JKLacCYASR-dpw=/https://files.cults3d.com/uploaders/21595173/illustration-file/c19f2eae-9aa8-4b11-a667-35f735048bbd/chris-stone-cstone-oni-game-01.jpg' },
        { id: 3, nombre: 'Vandal Reaver', precio: 25, img: 'https://images.cults3d.com/xKPXl990MeZAqGESHaRFxJD-ALE=/https://files.cults3d.com/uploaders/21595173/illustration-file/46148bbb-d608-415c-ba77-33de66c34842/Valorant-Reaver-Collection-Vandal-HD.jpg' },
        { id: 4, nombre: 'Operator Elderflame', precio: 43, img: 'https://i.blogs.es/c9b0c5/valorant/1366_2000.jpeg' },
        { id: 5, nombre: 'Operator ION', precio: 43, img: 'https://i.ytimg.com/vi/TC7Lf6Fq9ss/maxresdefault.jpg' },
        { id: 6, nombre: 'Mariposa RGX11ZPRO', precio: 45, img: 'https://i0.wp.com/twinfinite.net/wp-content/uploads/2022/04/Melee_RGX_11z_Pro_2022_v3_TopFront34.jpg?resize=600%2C338&ssl=1' }
    ]
}


//Añadir un elemento
app.post('/', (req, res) => {
    const nuevoProducto = {
        id: data.items.length + 1,
        nombre: req.body.nombre,
        precio: req.body.precio,
        img: req.body.img
    }
    if (!req.body.nombre || !req.body.precio) {
        res.status(400).send(`Rellena todos los campos obligatorios`)
    } else {
        logger.log(`${nuevoProducto.nombre} se ha añadido correctamente con la id: ${nuevoProducto.id}`);
        data.items.push(nuevoProducto);
        res.status(201).send(data.items)
    }
});

app.put('/:id', (req, res) => {
    const existe = data.items.some(skin => skin.id === +req.params.id)
    if (existe) {
        data.items.forEach(skin => {
            if (skin.id === +req.params.id) {
                skin.nombre = req.body.nombre ? req.body.nombre : skin.nombre;
                skin.precio = req.body.precio ? req.body.precio : skin.precio;
                skin.img = req.body.img ? req.body.img : skin.img;
            }
        })
        res.status(200).send(`La skin con id:${req.params.id} ha sido modificada`)
    } else {
        res.status(404).send(`El id:${req.params.id} no existe`)
    }
});

app.delete('/:id', (req, res) => {
    const existe = data.items.some(skin => skin.id === +req.params.id)
    if (existe) {
        data.items = data.items.filter(skin => skin.id !== +req.params.id)
        res.status(200).send(data.items)
    } else {
        res.status(404).send(`El id:${req.params.id} no existe`)
    }
});

app.get('/prices/:price', (req, res) => {
    let resultado = []
    data.items.forEach(skin => {
        if (skin.precio === +req.params.price) {
            resultado.push(skin)
        }
    })
    if (resultado.length == 0) {
        res.status(404).send(`No existen skins que cuesten ${req.params.price}`)
    } else {
        res.send(resultado)
    }
});

app.get('/pricerange/:min/:max', (req, res) => {
    if (req.params.min <= req.params.max) {
        const resultado = data.items.filter(skin => skin.precio >= req.params.min && skin.precio <= req.params.max)
        if (resultado.length == 0) {
            res.status(404).send(`No hay ninguna skin que valga entre ${req.params.min} y ${req.params.max}`)
        } else {
            res.send(resultado)
        }
    } else {
        res.status(400).send('El valor minimo no puede ser superior al maximo')
    }
})

app.get('/:id', (req, res) => {
    const existe = data.items.some(skin => skin.id === +req.params.id);
    if (existe) {
        const resultado = data.items.filter(skin => skin.id === +req.params.id)
        res.send(resultado)
    } else {
        res.status(404).send(`No existe ninguna skin con la id ${req.params.id}`)
    }
})

app.get('/name/:name', (req, res) => {
    const solicitud = req.params.name.toLowerCase();
    let esta = false
    data.items.forEach(skin => {
        if (skin.nombre.replace(' ', '+').toLowerCase() == req.params.name.toLowerCase()) {
            esta = true;
        }
    });
    if (esta) {
        const resultado = data.items.filter(skin => skin.nombre.replace(' ', '+').toLowerCase() == req.params.name.toLowerCase())
        res.send(resultado)
    } else {
        res.status(404).send(`No existe ninguna skin que se llame ${req.params.name.replace('+',' ')}`)
    }
})

app.get('/', (req, res) => {
    if (data.items.length == 0) {
        res.status(404).send('No hay skins')
    } else {
        res.send(data.items)
    }
})