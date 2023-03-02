
// recoger del input search
// select 
// dos paginas porque 
const form = document.querySelector('form')
const submit = document.querySelector('#submit')
const grid = document.querySelector('.gridcontainer')
const containerIndex = document.querySelector('#containerImgIndex');
const fragment = document.createDocumentFragment();
const buttons = document.querySelector('#botoncitos')
const divPag = document.querySelector('#numpag')
const imagen1 = document.querySelector('.imagenUno')
let page = 1;
let searchFuera;
let selectFuera;

/*
arrayImagenesIndex
*/
const arrayImgIndex = [
  { id: 'dog', url: 'https://images.pexels.com/photos/13618083/pexels-photo-13618083.jpeg?auto=compress&cs=tinysrgb&h=350', alt: 'dog' },
  { id: 'cat', url: 'https://images.pexels.com/photos/1715092/pexels-photo-1715092.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'cat' },
  { id: 'bird', url: 'https://images.pexels.com/photos/105808/pexels-photo-105808.jpeg?auto=compress&cs=tinysrgb&h=350', alt: 'bird' },
]

//contador para el numero de pagina
let contador = 1;

//EVENTOS
document.body.addEventListener('click', (ev) => {
  search = document.querySelector('#search').value;
  select = document.querySelector('#select').value;
  ev.preventDefault();
  if (ev.target.matches('#submit')) {
    location.href = `results.html?query=${search}&orientation=${select}`;
  }  

  if (ev.target.matches('.imgIndex')) {
    const idImgIndex = ev.target.id;
    location.href = `results.html?query=${idImgIndex}&orientation=${select}`;
    console.log(idImgIndex);
  }

  if (ev.target.matches('.paginar')) {
    page = ev.target.textContent
    console.log(page)
    pintarImg(search, select, page)
  }

  if (ev.target.matches('.imagen')) {
    const id = ev.target.id
    location.href = `./printOne.html?id=${id}`;
  }
})



const consulta = async (search, select, id) => {
  let url;
  try {
    if (search) {
      url = `https://api.pexels.com/v1/search?query=${search}&orientation=${select}&page=${page}`;
    } else if (id) {console.log('llego'); url = `https://api.pexels.com/v1/photos/${id}` }//https://api.pexels.com/v1/photos/2173872
    else {
      url = `https://api.pexels.com/v1/search?query=${searchFuera}&orientation=${selectFuera}&page=${page}}`;
    }

    let peticion = await fetch(url, { //quitar el GET
      headers: {
        authorization:
          "NAr49TCDwcL0j9wbNjjVqWAep0GJTA54OuL3ntuHLl7M0fGuHlu7e4wv",
      },
    });

    if (peticion.ok) {
      return peticion.json()
    } else {
      throw {
        ok: false,
        message: "mistake",
      };
    }
  } catch (error) {
    return error;
  }
};


//función init. la función init tiene que saber si hay parámetros o no. hay 3 casos.1 no hay parámetros. 2 hay parámetros. 3  solo el id
//1 llama a pintarimgindex
//2 llama a pintar imágenes llama a consulta
//3 llamamos a pintarUno que tiene que pintar solo 1. llama a consulta

const pintarImg = async (search, select) => {

  const peticion = await consulta(search, select)

  grid.innerHTML = '';
  peticion.photos.forEach((item, index) => {
    const div = document.createElement('DIV')
    const img = document.createElement('IMG')
    const p = document.createElement('P')
    const url = peticion.photos[index].src.medium
    const alt = peticion.photos[index].alt
    p.innerHTML = `<b>id:</b>     ${peticion.photos[index].id} <br><br><u>Autor:</u> ${peticion.photos[index].photographer}<br><br> <u>Descripción:</u> ${peticion.photos[index].alt}.`
    div.classList.add('imgcontainer')
    img.setAttribute('id', peticion.photos[index].id)
    img.setAttribute('class', 'imagen')
    img.setAttribute('alt', alt)
    img.setAttribute('src', url)
    div.append(img)
    div.append(p)
    grid.append(div)
  })
  pintarBotones(peticion)
  if (page == 1) {
    searchFuera = search
    selectFuera = select
  }
}
//
const validarPaginas = async (peticion) => {
  //const respuesta = await consulta()
  console.log(peticion)
  let paginas = Math.ceil(peticion.total_results / peticion.per_page);

  return (paginas);
}

const pintarBotones = async (peticion) => {
  let paginas = await validarPaginas(peticion)
  buttons.innerHTML = '' //
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

  if (paginas > 5 && (page == 1 || page == 2)) {
    for (let i = 1; i <= 5; i++) {
      const boton = document.createElement('BUTTON');
      boton.setAttribute('class', 'paginar');
      boton.textContent = i
      fragment.append(boton)
    }
    buttons.append(fragment)
  }

  if (paginas > 5 && page >= 3) {
    let contadorFloor = parseInt(page) - 2;
    let contadorCeil = parseInt(page) + 2;
    let contadorMeh = 0;
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
//pintarImagenesIndex PRIMERA EN INICIALIZAR //funciona
const pintarImgIndex = () => {
  arrayImgIndex.forEach(({ id, url, alt }) => {
    const p = document.createElement('P')
    const contImgIndex = document.createElement('div');
    const ImgIndex = document.createElement('img')
    p.textContent = alt
    ImgIndex.className = 'imgIndex';
    ImgIndex.id = id;
    ImgIndex.src = url;
    ImgIndex.alt = alt;
    contImgIndex.setAttribute('class', 'imgIndex')
    contImgIndex.append(ImgIndex);
    contImgIndex.append(p)
    containerIndex.append(contImgIndex);
  })
}
//
const pintarUno = async (idNew) => {
  const peticion = await consulta(null, null, idNew);
  console.log(peticion)
  const urlFoto = peticion.src.large
  console.log(urlFoto)
  const div = document.createElement('DIV')
  const img = document.createElement('IMG')
  div.classList.add('.contimagen1')
  img.classList.add('imagen1')
  img.setAttribute('src', urlFoto)
  div.append(img)
  imagen1.append(div)

}



const init = () => {
  const urlParams = new URLSearchParams(window.location.search);

  if (!window.location.search) {
    pintarImgIndex();
  } else if (urlParams.has('query')) {
    const query = urlParams.get('query')
    const select = urlParams.get('orientation')
    pintarImg(query, select)
  } else  {
     const idString = window.location.search
     idNew = idString.substring(4)
    pintarUno(idNew)
  }
}
init();