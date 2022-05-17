const pages = {
    wellcome: document.getElementById('wellcome'),
    cat: document.getElementById('cat'),
    add: document.getElementById('add')
}

const container = document.getElementById('contenedor')

const submit = document.getElementById('submit')

const toAdd = document.getElementById('toAdd')

const back = document.getElementById('back')

const form = {
    nombre: document.getElementById('nombre'),
    precio: document.getElementById('precio'),
    imagen: document.getElementById('imagen')
}

let skins = []

function cleanAll() {
    pages.wellcome.classList.add('d-none')
    pages.cat.classList.add('d-none')
    pages.add.classList.add('d-none')
}

function printCards() {
    container.innerHTML = ''
    skins.forEach(skin => {
        container.innerHTML += `
            <div class="card">
                <img src="${skin.img}" alt="">
                <h3>${skin.nombre}</h3>
                <h4>${skin.precio}€</h4>
                <button class="button2" onclick="kill(${skin.id})"><i class="fa-solid fa-trash"></i></button>
            </div>
        `
    })
}

function kill(id) {
    axios.delete(`http://localhost:3000/${id}`)
        .then(res => {
            skins = res.data;
            printCards()
        })
}


pages.wellcome.addEventListener('click', () => {
    axios.get("http://localhost:3000/")
        .then(res => {
            skins = res.data;
            printCards();
        })
    cleanAll();
    pages.cat.classList.remove('d-none')
})

submit.addEventListener('click', (e) => {
    e.preventDefault()
    axios.post("http://localhost:3000/", {
            nombre: form.nombre.value,
            precio: form.precio.value,
            img: form.imagen.value
        })
        .then(res => {
            skins = res.data;
            printCards;
        })
    form.imagen.value = ""
    form.nombre.value = ""
    form.precio.value = ""
})

toAdd.addEventListener('click', () => {
    cleanAll();
    pages.add.classList.remove('d-none')
})

back.addEventListener('click', (e) => {
    e.preventDefault()
    printCards();
    cleanAll();
    pages.cat.classList.remove('d-none')
})