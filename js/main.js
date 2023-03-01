// recoger del input search
// select 
// dos paginas porque 
const form = document.querySelector('form')
const submit = document.querySelector('#submit')
const grid = document.querySelector('.gridcontainer')
const buttons = document.querySelector('#botoncitos')
const fragment = document.createDocumentFragment()
const divPag = document.querySelector('#numpag')
let contador = 1;

document.body.addEventListener('click', (ev) => {
    const search = document.querySelector('#search').value;
    const select = document.querySelector('#select').value;
    ev.preventDefault();
    if (ev.target.matches('#submit')) {
        peticion(search, select);
    }

    if (ev.target.matches('#avanzar')) {
        contador++;
        peticion(search, select);

    }

    if (ev.target.matches('#atras')) {
        contador--;
        peticion(search, select)
    }

    if (ev.target.matches('.paginar')) {
        contador = ev.target.textContent
        peticion(search, select)
    }

})

const peticion = (search, select) => {
    fetch(`https://api.pexels.com/v1/search?query=${search}&orientation=${select}&page=${contador}`, {
        method: 'GET', // no hace falta
        headers: {
            'authorization': 'G5Ojje39ZfUduWTOm2FOUUg9JYl9C18ode6hU4hB5IBEQv4Z2YOWJr1v'
        },
    })
        .then((response) => response.json())
        .then((json) => validarPaginas(json));
}



const validarPaginas = (resp) => {
    console.log(resp)
    let paginas = Math.ceil(resp.total_results / resp.per_page);
    pintar(resp)
    pintarBotones(paginas);
}

const pintar = (resp, paginas) => {
    grid.innerHTML = '';
    const button = document.createElement('BUTTON')
    const button2 = document.createElement('BUTTON')
    button.setAttribute('id', 'avanzar')
    button.textContent = 'Avanzar';
    button2.setAttribute('id', 'atras')
    button2.textContent = 'Retroceder';
    resp.photos.forEach((item, index) => {
        const div = document.createElement('DIV')
        const img = document.createElement('IMG')
        const p = document.createElement('P')
        const url = resp.photos[index].src.medium
        const alt = resp.photos[index].alt
        p.innerHTML = `<u>id:</u>     ${resp.photos[index].id} <br><br><u>Autor:</u> ${resp.photos[index].photographer}<br><br> <u>Descripción:</u> ${resp.photos[index].alt}.`
        div.classList.add('imgcontainer')
        img.setAttribute('alt', alt)
        img.setAttribute('src', url)
        div.append(img)
        div.append(p)
        grid.append(div)
    })



}


const pintarBotones = (paginas) => {
    buttons.innerHTML = ''
    divPag.innerHTML = ''
    divPag.innerHTML = `<p>Existe un total de ${paginas} páginas.</p>`
    if (paginas <= 5) {
        for (let i = 1; i <= paginas; i++) {
            const boton = document.createElement('BUTTON');
            boton.setAttribute('class', 'paginar');
            boton.textContent = i
            fragment.append(boton)
        }
        buttons.append(fragment)
    }

    if (paginas > 5 && (contador == 1 || contador == 2)) { // aqui solo el botón de avanzar
        for (let i = 1; i <= 5; i++) {
            const boton = document.createElement('BUTTON');
            boton.setAttribute('class', 'paginar');
            boton.textContent = i
            fragment.append(boton)
        }
        buttons.append(fragment)
    }

    if (paginas > 5 && contador >= 3) {
        let contadorFloor = parseInt(contador) - 2;
        let contadorCeil = parseInt(contador) + 2;
            for (let i = contadorFloor; i <= contadorCeil; i++) {
                if (i < paginas) {
                    const boton = document.createElement('BUTTON');
                    boton.setAttribute('class', 'paginar');
                    contadorFloor++
                    boton.textContent = contadorFloor
                    fragment.append(boton)
                }

            }
            buttons.append(fragment)
        


    }
}



