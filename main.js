`use strict`;
// botones de guardar de cada formulario
let btnZonas = document.getElementById("btnZonas");
let btnAnimalGuardar = document.getElementById("btnAnimalGuardar");
let btnAnimalComentar = document.getElementById("btnAnimalComentar");
let btnRespuestaEnviar = document.getElementById("btnRespuestaEnviar");
let btnSearch = document.getElementById("btnSearch");

// contenedores dinamicos de zonas y animales
let containerDropdown = document.getElementById("containerDropdown");
let sectionComentarios = document.getElementById("sectionComentarios");

//titulos de zonas y formularios
let titleZonaAnimal = document.getElementById("titleZonaAnimal");
let titleFormAnimal = document.getElementById("titleFormAnimal");

//captura de formularios
let formSearch = document.getElementById("formSearch");
let formZonas = document.getElementById("formZonas");
let formAnimal = document.getElementById("formAnimal");
let formComentarios = document.getElementById("formComentarios");
let formRespuesta = document.getElementById("formRespuesta");

//input de zonas y animales
let inputSearch = document.getElementById("inputSearch");
let inputZona = document.getElementById("zonasGuardar");
let inputAnimal = document.getElementById("animalGuardar");
let textareaComentario = document.getElementById("textareaComentario");
let autorComentario = document.getElementById("autorComentario");
let textareaRespuesta = document.getElementById("textareaRespuesta");
let autorRespuesta = document.getElementById("autorRespuesta");

//contenedor burger
let btnBurger = document.getElementById("btnBurger");
let containerBurger = document.querySelector(".aparecer");

// contenedor del buscador
let containerSearch = document.querySelector("#containerSearch");
let zonasEncontradas = document.querySelector("#zonasEncontradas");
let animalEncontrado = document.querySelector("#animalEncontrado");
let notaEncontrada = document.querySelector("#notaEncontrada");
let respuestaEncontrada = document.querySelector("#respuestaEncontrada");
let dropdownContent = document.getElementById("dropdown-content");
let containerWall = document.getElementById("containerWall");

btnBurger.addEventListener("click", () => {
  containerBurger.classList.toggle("aparecer");
});

//(1)------formulario de busqueda------y----mostrar lo encontrado--------------------------------------------------------------------------

formSearch.addEventListener("submit", envio);
function envio(e) {
  let coincidencia = inputSearch.value;

  if (coincidencia === "") {
    alert("agrega datos correctos");
    return false;
  }
  dropdownContent.style.display = "none";
  containerWall.style.display = "none";

  let prueba = JSON.parse(localStorage.getItem("zonas"));
  let retiene1;
  let retiene2;
  let coind = [];

  if (prueba !== null) {
    for (let i = 0; i < prueba.length; i++) {
      retiene1 = prueba[i].area.search(coincidencia);

      if (retiene1 !== -1) {
        coind.push({
          zona: prueba[i].area,
        });
      }

      let animal = prueba[i].animales;
      for (let j = 0; j < animal.length; j++) {
        retiene1 = animal[j].animalInput.search(coincidencia);

        if (retiene1 !== -1) {
          coind.push({
            zona: prueba[i].area,
            animal: prueba[i].animales[j].animalInput,
          });
        }
        let notas = animal[j].nota;

        for (let k = 0; k < notas.length; k++) {
          retiene1 = notas[k].comentarioAutor.search(coincidencia);
          retiene2 = notas[k].comentarioText.search(coincidencia);

          if (retiene1 !== -1 || retiene2 !== -1) {
            coind.push({
              zona: prueba[i].area,
              animal: prueba[i].animales[j].animalInput,
              nota: prueba[i].animales[j].nota[k],
            });
          }

          let res = notas[k].respuestas;

          for (let l = 0; l < res.length; l++) {
            retiene1 = res[l].respuestaAutor.search(coincidencia);
            retiene2 = res[l].respuestaTextarea.search(coincidencia);

            if (retiene1 !== -1 || retiene2 !== -1) {
              coind.push({
                zona: prueba[i].area,
                animal: prueba[i].animales[j].animalInput,
                nota: prueba[i].animales[j].nota[k],
                respuesta: prueba[i].animales[j].nota[k].respuestas[l],
              });
            }
          }
        }
      }
    }

    console.log(coind);
    zonasEncontradas.innerHTML = "";
    animalEncontrado.innerHTML = "";
    notaEncontrada.innerHTML = "";
    respuestaEncontrada.innerHTML = "";

    for (let i = 0; i < coind.length; i++) {
      let area = coind[i].zona;
      let animal = coind[i].animal;
      let nota1 = coind[i].nota;
      let respuesta1 = coind[i].respuesta;
      let soloArea =
        area !== undefined &&
        animal === undefined &&
        nota1 === undefined &&
        respuesta1 === undefined;

      let areaYAnimal =
        area !== undefined &&
        animal !== undefined &&
        nota1 === undefined &&
        respuesta1 === undefined;

      let areaAnimalYNota =
        area !== undefined &&
        animal !== undefined &&
        nota1 !== undefined &&
        respuesta1 === undefined;

      let areaAnimalNotaRespuesta =
        area !== undefined &&
        animal !== undefined &&
        nota1 !== undefined &&
        respuesta1 !== undefined;

      if (soloArea) {
        zonasEncontradas.innerHTML += `<div class="coincidencia">zona : ${area}</div>`;
      } else if (areaYAnimal) {
        animalEncontrado.innerHTML += `<div class="coincidencia">
                                       <div>zona : ${area}</div>
                                       <div>animal : ${animal}</div>
                                       </div>`;
      } else if (areaAnimalYNota) {
        notaEncontrada.innerHTML += `<div class="coincidencia">
                                     <div>zona : ${area}</div>
                                     <div>animal : ${animal}</div>
                                     <div>comentario texto : ${nota1.comentarioText}</div>
                                     <div>comentario autor : ${nota1.comentarioAutor}</div>
                                     </div>`;
      } else if (areaAnimalNotaRespuesta) {
        respuestaEncontrada.innerHTML += `<div class="coincidencia">
                                          <div>zona : ${area}</div>
                                          <div>animal : ${animal}</div>
                                          <div>comentario texto :  ${nota1.comentarioText}</div>
                                          <div>comentario autor : ${nota1.comentarioAutor}</div>
                                          <div>respuesta texto : ${respuesta1.respuestaTextarea}</div>
                                          <div>respuesta autor : ${respuesta1.respuestaAutor}</div>
                                          </div>`;
      }
    } // fin del for
  }
  containerSearch.style.display = "block";
  e.preventDefault();
  formSearch.reset();
}

//(1.1) -------boton de vista de busqueda desaparecer busqueda aprarecer muro------------------------------------------

btnSearch.addEventListener("click", function (e) {
  containerSearch.style.display = "none";
  dropdownContent.style.display = "block";
  containerWall.style.display = "block";
});

//-------------------------------------------------------------------------------------------------------------
//(2)--boton de aparecer el formulario de crear zonas ---------------------------------------------------------
btnZonas.addEventListener("click", function (e) {
  formZonas.style.display = "block";
  formAnimal.style.display = "none";
  sectionComentarios.style.display = "none";
  containerBurger.classList.toggle("aparecer");
});

//--------------------------------------------------------------------------------------------------------------
// (2.1) formulario de guardar zonas----------al dar  click btnZonas------------------------------------------------------------------------
formZonas.addEventListener("submit", zonas);
function zonas(e) {
  let area = inputZona.value;
  // console.log(especie);

  if (area === "") {
    alert("agrega datos correctos");
    return false; // al haber dejado alguno de estos espacios libres entra al if y no se ejecuta mas codigo
  }

  let zona = {
    id: Date.now(),
    area,
    animales: [],
  };
  // console.log(zona);
  if (localStorage.getItem("zonas") === null) {
    let zonas = [];
    zonas.push(zona);

    localStorage.setItem("zonas", JSON.stringify(zonas)); // lo guardo en mi localStorage
    alert("la zona se agrego correctamente");
  } else {
    // al ya haber algo almacenado en le localStorage en el proximo usario entra al else
    let zonas = JSON.parse(localStorage.getItem("zonas")); // capturo los datos que tengo en el localStorge
    let found = zonas.find((element) => element.area === area);
    if (found !== undefined) {
      formZonas.reset();
      alert("la zona ya existe agrega otra zona ");
      return false;
    } else {
      zonas.push(zona); // ya teniendo mi arrays capturado del local storage le agrego mas datos ingresados actualmente
      localStorage.setItem("zonas", JSON.stringify(zonas)); // vuelvo y guardo todo en mi localStogaje
      alert("la zona se agrego correctamente");
    }
  }

  e.preventDefault();
  formZonas.reset();
  formZonas.style.display = "none";

  leerZona();
  containerBurger.classList.toggle("aparecer");
} // fin crear zonas

// (2.2) aqui se creara cada boton de especie = zona------ y al lado el dropown--------------------------------------------------------------------
function leerZona() {
  let zonas = JSON.parse(localStorage.getItem("zonas"));

  containerDropdown.innerHTML = ""; //cada vez que pase por aqui se blanquean mis botones y se vuelven a pintar al recorrer el array si no se pintaria lo de mi array mas lo que ya hay

  // en este for estoy recorriendo mi arrays de objetos almacenados en mi local storage

  if (localStorage.getItem("zonas") == null) {
    return false;
  } else {
    for (let i = 0; i < zonas.length; i++) {
      let area = zonas[i].area;
      let id = zonas[i].id;

      containerDropdown.innerHTML += `<div class="btn-group  btnGrupoDrop">
            <button onClick=especie(${id}) type="button" class="btn-especies">${area}</button>
            <button type="button" onClick=animalesDrop(${id}) class="dropdown-toggle dropdown-toggle-split btn-animal"
                data-bs-toggle="dropdown" aria-expanded="false">
                <span class="visually-hidden">Toggle Dropdown</span>
            </button>
            <ul  class="dropdown-menu" id="ulAnimal${id}"></ul>
           
        </div>`;
    } // fin del for
  }
} // fin leer();
leerZona(); // aqui are el llamado a la function leerZona para que se pinte en mi pantalla lo  que hay dentro de mi localStorage

//(2.3)----al dar click encima de una especie= zonaCreada onClick=especie(${id})-- se abrira un formulario para agregar animales a esa zona---------------------------------------
let idZona;
function especie(id) {
  idZona = id;
  let zonas = JSON.parse(localStorage.getItem("zonas"));

  let positionZona = zonas.findIndex(function (element) {
    return idZona === element.id;
  });

  let formZona = zonas[positionZona].area;
  titleFormAnimal.innerHTML = ` <h2 class="titleZonas titleH2">agregar un nuevo animal a la zona de ${formZona}</h2>`;

  formZonas.style.display = "none";
  formAnimal.style.display = "block";

  sectionComentarios.style.display = "none";
  containerBurger.classList.toggle("aparecer");
}

// (2.4) ----------formulario de crear y guardar animales por especies en el local storage ------------------------
formAnimal.addEventListener("submit", animall);
function animall(e) {
  let zonas = JSON.parse(localStorage.getItem("zonas"));
  let animalInput = inputAnimal.value;

  if (animalInput === "") {
    alert("agrega datos correctos");
    return false; // al haber dejado alguno de estos espacios libres entra al if y no se ejecuta mas codigo
  }

  let especie = {
    id: Date.now(),
    animalInput,
    nota: [],
  };

  //for para verificar que no alla animales repetidos- en ninguna zona------------------------------------------------
  let found;
  for (let i = 0; i < zonas.length; i++) {
    found = zonas[i].animales.find(
      (element) => element.animalInput === animalInput
    );
    if (found !== undefined) {
      // si es diferente de undefined es porque si lo consiguio entonces una alerta de que no puede repetir animales en ninguna zona
      found = false;
      alert("el animal ya esta agregado en esta u otra zona");
      break;
    }
  }

  if (found === undefined) {
    let auxZona = zonas.find((el) => idZona === el.id);
    auxZona.animales.push(especie);

    let position = zonas.findIndex(function (element) {
      return idZona === element.id;
    });
    zonas[position] = auxZona;
    localStorage.setItem("zonas", JSON.stringify(zonas));
    alert(`el animal : ${animalInput} se agrego correctamente`);
  }

  e.preventDefault();
  formAnimal.reset();
  containerBurger.classList.toggle("aparecer");
}

//(3)---------------------------------------------------------------------------------------------------------------------------------------------------------
//(3)--Muro------click en la flecha del drop me correra la function de leer los animales dentro del dropdown---onClick=animalesDrop(${id})----------------------------------------------

function animalesDrop(id) {
  formZonas.style.display = "none"; // me desaparece el formulario de zonas y el formulario de animales
  formAnimal.style.display = "none";
  sectionComentarios.style.display = "none"; // me esconde la section de comentarion que esta en la section de containerWall
  idZona = id;
  leerAnimal();
}

//(3.1) --------aqui se crearan los animales dentro del button drop ----esta function correra al dar click en la flecha drop--------------------------------------------------------------

function leerAnimal() {
  let zonas = JSON.parse(localStorage.getItem("zonas"));
  let ulAnimal = document.getElementById("ulAnimal" + idZona);

  ulAnimal.innerHTML = "";
  let auxAnimal = zonas.find((el) => idZona === el.id);
  let especies = auxAnimal.animales;
  // en este for estoy recorriendo mi arrays de objetos almacenados en mi local storage
  for (let i = 0; i < especies.length; i++) {
    let animal = especies[i].animalInput;
    let id = especies[i].id;

    ulAnimal.innerHTML += `<li><a onClick=comentarios(${id}) class="dropdown-item" href="#">${animal}</a></li>`;
  }
}

//-(3.2)------ onClick=comentarios(${id}) ---aparecera  el formulario-------------------------------------------------------------------------------------------------------------
let idAnimal;
function comentarios(id) {
  sectionComentarios.style.display = "block";
  idAnimal = id;
  containerBurger.classList.toggle("aparecer");

  leerComentarios();
}

//(3.3)------ apareceran todos los comentarios y el tutilo dinamico de zona  y animal----------------------------------------------

function leerComentarios() {
  let zonas = JSON.parse(localStorage.getItem("zonas"));

  let positionZona = zonas.findIndex(function (element) {
    return idZona === element.id;
  });
  let auxZona = zonas.find((el) => idZona === el.id);

  let positionAnimal = auxZona.animales.findIndex(
    (element) => element.id === idAnimal
  );
  // let auxAnimal = auxZona.animales.find((element) => idAnimal === element.id);

  // console.log(zonas[positionZona].animales[positionAnimal].nota);
  let zonaAnimal = zonas[positionZona].area;
  let especieAnimal = zonas[positionZona].animales[positionAnimal].animalInput;

  titleZonaAnimal.innerHTML = ` <h2 class="titleComentarios" id="zonaAnimal">zona de : ${zonaAnimal} - animal : ${especieAnimal}</h2>`;
  containerComentario.innerHTML = "";
  let nota = zonas[positionZona].animales[positionAnimal].nota;

  for (let i = 0; i < nota.length; i++) {
    let id = zonas[positionZona].animales[positionAnimal].nota[i].id;
    let x =
      zonas[positionZona].animales[positionAnimal].nota[i].respuestas.length;

    let comentarioText =
      zonas[positionZona].animales[positionAnimal].nota[i].comentarioText;

    let comentarioAutor =
      zonas[positionZona].animales[positionAnimal].nota[i].comentarioAutor;

    let fecha = zonas[positionZona].animales[positionAnimal].nota[i].fecha;

    containerComentario.innerHTML += `<div class="cadaComentario" id="cadaComentario">
    <div class="sectionComentario " id="sectionComentario${id}">
       <li class="liComentario">${comentarioText}</li>
       <li class="autorComentario liComentarios">autor:${comentarioAutor}</li>
       <li class="fechaComentario liComentarios">fecha:${fecha}</li>
       <div class="respuestaComentario" id="respuestaComentario${id}"></div>
    </div>
    <button onClick=resForm(${id}) class="btnResponder btnPrimary" id="btnResponder" type="button" 
     data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">responder</button>
    <button onClick=resTotal(${id}) class="btnRespuestas btnPrimary" id="btnRespuestas">ver ${x} respuestas</button>
    <div id= "cajaRespuesta${id}" class="cajaRespuesta"></div>
</div>`;
  }
}

//(4)---- comentarios titulo dinamico-------------------------------------------------------------------------
//(4) ---FormComentarios---guardo comentarios ----despues del submit comentarios vuelvo y hago que se muestren los comentarios-------------------------

formComentarios.addEventListener("submit", comentar);
function comentar(e) {
  let zonas = JSON.parse(localStorage.getItem("zonas"));
  let comentarioText = textareaComentario.value;
  let comentarioAutor = autorComentario.value;

  if (comentarioText === "" || comentarioAutor === "") {
    alert("agrega datos correctos");
    return false;
  }

  let comentario = {
    id: Date.now(),
    comentarioText,
    comentarioAutor,
    fecha: new Date().toISOString().slice(0, 10),
    respuestas: [],
  };

  let position = zonas.findIndex(function (element) {
    return idZona === element.id;
  });
  let auxZona = zonas.find((el) => idZona === el.id);

  let position2 = auxZona.animales.findIndex(
    (element) => element.id === idAnimal
  );
  let auxAnimal = auxZona.animales.find((element) => idAnimal === element.id);

  auxAnimal.nota.unshift(comentario);
  zonas[position].animales[position2] = auxAnimal;
  localStorage.setItem("zonas", JSON.stringify(zonas));
  // console.log(zonas);
  formComentarios.reset();
  e.preventDefault();
  leerComentarios();
}

//(4.1)--------onClick=resForm(${id})-bandera al cliclear responder-----se abrira un formulario MODAL de respuestas-------------------------
let idResponder;
function resForm(id) {
  idResponder = id;
  let cajaRes = document.getElementById(`cajaRespuesta${idResponder}`);
  cajaRes.innerHTML = " ";
}
//(4.2)-----modal formulario de enviar respuestas-----guardar respuestas---------------------------------------------------------------------

btnRespuestaEnviar.addEventListener("click", function (e) {
  let zonas = JSON.parse(localStorage.getItem("zonas"));
  let respuestaTextarea = textareaRespuesta.value;
  let respuestaAutor = autorRespuesta.value;

  // let cajaRespuesta = document.getElementById(`cajaRespuesta${idResponder}`);

  if (respuestaTextarea === "" || respuestaAutor === "") {
    alert("agrega datos correctos");
    return false;
  }

  let response = {
    respuestaTextarea,
    respuestaAutor,
    fecha: new Date().toISOString().slice(0, 10),
  };

  let positionZona = zonas.findIndex(function (element) {
    return idZona === element.id;
  });
  let auxZona = zonas.find((el) => idZona === el.id);

  let positionAnimal = auxZona.animales.findIndex(
    (element) => element.id === idAnimal
  );
  let auxAnimal = auxZona.animales.find((element) => idAnimal === element.id);

  let positionNota = auxAnimal.nota.findIndex(
    (element) => element.id === idResponder
  );

  let auxNota = auxAnimal.nota.find((element) => idResponder === element.id);

  auxNota.respuestas.unshift(response);

  zonas[positionZona].animales[positionAnimal].nota[positionNota] = auxNota;
  localStorage.setItem("zonas", JSON.stringify(zonas));

  formRespuesta.reset();
  e.preventDefault();

  alert(
    `la respuesta del autor : ${respuestaAutor} se a guardado correctamente`
  );
  leerComentarios();
});

// --------------------------------------------------------------------------------------------------------------------------------------
// (5)-------------------function donde se leeran las respuestas-------al dar click --ver respuestas----------------------------------------
let idRespuestas;
function resTotal(id) {
  idRespuestas = id;
  leerRespuestas(idRespuestas);
}

function leerRespuestas() {
  let comentarioRespuesta = document.getElementById(
    `respuestaComentario${idRespuestas}`
  );
  // cajaRespuesta.innerHTML = "";
  let zonas = JSON.parse(localStorage.getItem("zonas"));

  let positionZona = zonas.findIndex(function (element) {
    return element.id === idZona;
  });
  let auxZona = zonas.find((el) => idZona === el.id);

  let positionAnimal = auxZona.animales.findIndex(
    (element) => element.id === idAnimal
  );
  let auxAnimal = auxZona.animales.find((element) => idAnimal === element.id);

  let positionNota = auxAnimal.nota.findIndex(
    (element) => element.id === idRespuestas
  );

  let respuesta =
    zonas[positionZona].animales[positionAnimal].nota[positionNota].respuestas;

  comentarioRespuesta.innerHTML = "";

  for (let i = 0; i < respuesta.length; i++) {
    let respuestaTextarea =
      zonas[positionZona].animales[positionAnimal].nota[positionNota]
        .respuestas[i].respuestaTextarea;
    let respuestaAutor =
      zonas[positionZona].animales[positionAnimal].nota[positionNota]
        .respuestas[i].respuestaAutor;
    let fechaRespuesta =
      zonas[positionZona].animales[positionAnimal].nota[positionNota]
        .respuestas[i].fecha;

    comentarioRespuesta.innerHTML += `<div class="containerRespuesta">
    <li class="parrafoRespuesta" id="parrafoRespueta">
      ${respuestaTextarea}
    </li>
    <li class="autorRespuesta liRespuesta">autor:${respuestaAutor}</li>
    <li class="fechaRespuesta liRespuesta">fecha:${fechaRespuesta}</li>
  </div>`;
  }
}
