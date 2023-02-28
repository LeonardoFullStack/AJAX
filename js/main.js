// recoger del input search
// select 
// dos paginas porque 
const form = document.querySelector('form')
const submit = document.querySelector('#submit')
const grid = document.querySelector('.gridcontainer')
let contador = 1;

document.body.addEventListener('click' ,(ev)=> {
    const search = document.querySelector('#search').value;
    const select = document.querySelector('#select').value;
    ev.preventDefault();
    if (ev.target.matches('#submit')) {
        peticion(search, select);
    }

    if(ev.target.matches('#avanzar')) {
        contador++
        peticion(search, select);
    }

    if (ev.target.matches('#atras')) {
        contador--;
        peticion(search, select)
    }

})

const peticion = (search, select) => {
    fetch(`https://api.pexels.com/v1/search?query=${search}&orientation=${select}&page=${contador}`, {
        method: 'GET',
        headers: {
          'authorization': 'G5Ojje39ZfUduWTOm2FOUUg9JYl9C18ode6hU4hB5IBEQv4Z2YOWJr1v'
        },
      })
        .then((response) => response.json())
        .then((json) => validarPaginas(json));
    }



const validarPaginas = (resp) => {
    console.log(resp)
    paginas =Math.ceil (resp.total_results / resp.per_page);
    pintar(resp, paginas);
}

const pintar = (resp, paginas)  => {
    grid.innerHTML= '';
    resp.photos.forEach((item, index)=>{
        const div = document.createElement('DIV')
        const img = document.createElement('IMG')
        const url = resp.photos[index].src.medium
        const alt = resp.photos[index].alt
        div.classList.add('imgcontainer')
        img.setAttribute('alt', alt)
        img.setAttribute('src', url)
        div.append(img)
        grid.append(div)
    })

    
}


