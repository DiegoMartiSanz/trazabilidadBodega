var parcelaSelect, vitiSelect, depoSelect, cantrestante;


let bPrimero = document.getElementById("visuPrimero");
bPrimero.addEventListener("click", visualizarPrimero, false);

let bUltimo = document.getElementById("visuUltimo");
bUltimo.addEventListener("click", visualizarUltimo, false);

let bSiguiente = document.getElementById("bSiguiente");
bSiguiente.addEventListener("click", visualizarSiguiente, false);

let bAnterior = document.getElementById("bAnterior");
bAnterior.addEventListener("click", visualizarAnterior, false);

let bBorrar = document.getElementById("borrarRegistro");
bBorrar.addEventListener("click", borrarRegistro, false);

let bNuevo = document.getElementById("Nuevo");
bNuevo.addEventListener("click", NuevoRegistro, false);

let bGrabar = document.getElementById("GrabarModificar");
bGrabar.addEventListener("click", Grabar, false);

//El primer registro
function visualizarPrimero() {

    let condicionSql = " order by vu ASC limit 1"
    generarRegistro(condicionSql)
}


// Visualiza ultimo registro
function visualizarUltimo() {
    let condicionSql = " order by vu DESC limit 1"
    generarRegistro(condicionSql)
}

// Visualiza Siguiente registro
function visualizarSiguiente() {
    let condicionSql = "where vu > " + cid.value + " order by vu  ASC limit 1"
    generarRegistro(condicionSql)
}


// Visualiza Anterior registro
function visualizarAnterior() {
    let condicionSql = "where vu < " + cid.value + " order by vu  DESC limit 1"
    generarRegistro(condicionSql)
}

//Borro el registro visualizado
function borrarRegistro() {
    let condicionSql = "WHERE vu = " + cid.value;
    generar2Registro(condicionSql);
    let condicionSql1 = "where vu < " + cid.value + " order by vu  DESC limit 1";
    generarRegistro(condicionSql1);
}

//Genero un registro vacio 
function NuevoRegistro() {
    cid.value = 0;
    cviti.value = '-1';
    cparcela.value = '';
    cfecha.value = '';
    ckilos.value = '';
    cph.value = '';
    cgrado.value = '';
    cnombreDepo.firstChild.nodeValue = '‎';
    ciddepo.firstChild.nodeValue = '‎';

    GrabarModificar.value = "GRABAR";
}

//borrar
function generar2Registro(condicionSql) {
    var ajaxrequest = new XMLHttpRequest();
    ajaxrequest.open("POST", "http://localhost:80/trazabilidadBodega/php/consultaViajes.php", true);
    ajaxrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    if (ajaxrequest.readyState === 4 && (ajaxrequest.status === 200)) {
        //var datosLeidos = ajaxrequest.responseText;
    }

    let envio = "Borrar=" + condicionSql;
    ajaxrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajaxrequest.send(envio);
}


//consulta
function generarRegistro(condicionSql) {
    var ajaxrequest = new XMLHttpRequest();
    ajaxrequest.open("POST", "http://localhost:80/trazabilidadBodega/php/consultaViajes.php", true);
    ajaxrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    ajaxrequest.onreadystatechange = function () {
        //alert(ajaxrequest.readyState + "--" + ajaxrequest.status);
        if (ajaxrequest.readyState === 4 && (ajaxrequest.status === 200)) {
            var datosLeidos = ajaxrequest.responseText;
            if (datosLeidos != null) {
                mostrar_consulta(datosLeidos);
            }
        }
    };

    let envio = "Envio=" + condicionSql;
    ajaxrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajaxrequest.send(envio);
}

//insertar y modificar
function Grabar() {
    cid.disabled = false;
    ciddepo.hidden = false;
    let formulario = document.getElementById('formu');
    let formData = new FormData(formulario);
    formData.append('deposi', ciddepo.innerText);

    //dependiendo de lo que ponga en el boton (si es Grabar = nuevo, Modificar = ya existente)
    if (GrabarModificar.value == "GRABAR") {
        formData.append('metodo', 'insertar')
    } else {
        formData.append('metodo', 'modificar')
    }

    fetch("http://localhost:80/trazabilidadBodega/php/grabarViajes.php", {
        method: "POST",
        body: formData
    })
        .then(resp => {
            return resp.text();
        })
        .then(resp => {
            alert(resp);
        });
    cid.disabled = true;
    ciddepo.hidden = true;
    visualizarUltimo();
}

function mostrar_consulta(datos) {
    var lista = new Array();
    lista = JSON.parse(datos);

    if (lista != null) {
        visualizarRegistro(lista[0]);
    } else {
        alert("No hay mas registros")
    }
}

function visualizarRegistro(registro) {
    //añado los datos que recojo de la base de datos en su posicion
    cid.value = registro.vu;
    cfecha.value = registro.fecha;
    ckilos.value = registro.kgViaje;
    cph.value = registro.ph;
    cgrado.value = registro.grado;
    let listaidviti = document.getElementById('cviti');
    listaidviti.value = registro.idViticutor;

    let nombreDepos = document.getElementById(registro.idDeposito);
    //añado el nombre del deposito 
    cnombreDepo.innerText = nombreDepos.getAttribute('nombredeposito');

    //añado el id del deposito en un campo oculto para poder pasarlo luego
    ciddepo.hidden = false;
    ciddepo.innerText = nombreDepos.d
    ciddepo.hidden = true;

    //guardo los datos para poder seleccionarlos luego en sus selects
    vitiSelect = registro.idViticultor;

    

    GrabarModificar.value = "MODIFICAR";
    //leeridviti();
    leerparcela();
    leerdepo();
}


leeridviti();

function leeridviti() {

    fetch('http://localhost:80/trazabilidadBodega/php/leerviticultor.php', {
        method: 'POST'
    })
        .then(resp => {
            return resp.json()
        })
        // .then(resp => {
        //     return resp.text();
        // })
        // .then(resp => {
        //     alert(resp);
        // })
        .then(json => {
            let listaidviti = document.getElementById('cviti');
            //miro si ya tiene datos para eliminarlo, si ese es el caso
            while (listaidviti.firstChild) {
                listaidviti.removeChild(listaidviti.firstChild);
            }
            //creo un elemento option
            let opcion = document.createElement('option');
            //le añado una opcion intermedia para que no colapse la pagina
            opcion.text = 'Selecciona un viticultor';
            opcion.value = '-1';
            listaidviti.appendChild(opcion);
            for (i = 0; i < json.length; i++) {
                opcion = document.createElement('option');
                opcion.value = json[i].vi;
                opcion.text = json[i].vi + " - " + json[i].nombre;
                //si es un dato que he recogido de la base de datos selecciono el que estaba en ella
                if (vitiSelect == json[i].vi) {
                    opcion.selected = true;
                }

                listaidviti.appendChild(opcion);
            }
        })

        .catch(err => {

            console.log("ERROR ..............:" + err);

        });

}

leerdepo();

function leerdepo() {

    fetch('http://localhost:80/trazabilidadBodega/php/leerDepositos.php', {
        method: 'POST'
    })
        .then(resp => {
            return resp.json()
        })
        // .then(resp => {
        //     return resp.text();
        // })
        // .then(resp => {
        //     alert(resp);
        // })
        .then(json => {
            // CREAMOS DIVS POR CADA DEPOSITO QUE SEA DE Fermentacion
            let listadepositos = document.getElementById('contenedorDepositos');
            //miro si ya tiene datos para eliminarlo, si ese es el caso
            while (listadepositos.firstChild) {
                listadepositos.removeChild(listadepositos.firstChild);
            }

            //cuento cuantos depositos con la tag de Fermentacion
            let contador=0;
            for (i = 0; i < json.length; i++) {
                if (json[i].destino == "Fermentacion") {
                    contador ++;
                }
            }

            for (i = 0; i < json.length; i++) {
                
                if (json[i].destino == "Fermentacion") {//si el deposito es de fermentacion lo dibujo
                    
                    //creo todos los elementos necesarios para dibujar el deposito
                    let contenedor = document.createElement('div');
                    let vacio = document.createElement('div');
                    let lleno = document.createElement('div');
                    let porcentaje = document.createElement('p');
                    let nombre = document.createElement('p');

                    //divido del tamaño maximo que tiene la pantalla entro todos los depositos que sean de fermentacion (optenido antes)  para tener su anchura
                    max = (900 / contador) - 15;

                    //le doy formato a lo que va a ser el contenedor global
                    contenedor.style.width = max + 'px';
                    contenedor.style.height = max + 'px';
                    contenedor.classList.add('cont');
                    contenedor.setAttribute('id', json[i].d);

                    //le doy una altura especifica dependiendo del porcentaje del deposito
                    vacio.style.height = 100 - json[i].porcentaje + '%';

                    //si esta vacio completamente redondeo los bordes de abajo
                    if (json[i].porcentaje == 0) {
                        vacio.style.borderBottomLeftRadius = '5px';
                        vacio.style.borderBottomRightRadius = '5px';
                    }
                    vacio.style.borderTopLeftRadius = '5px';
                    vacio.style.borderTopRightRadius = '5px';
                    vacio.classList.add('vacio');

                    //le doy una altura especifica dependiendo del porcentaje del deposito
                    lleno.style.height = json[i].porcentaje + '%';

                    //si esta lleno al 100% le redondeo los bordes de arriba
                    if (json[i].porcentaje == 100) {
                        lleno.style.borderTopLeftRadius = '5px';
                        lleno.style.borderTopRightRadius = '5px';
                    }
                    lleno.style.borderBottomLeftRadius = '5px';
                    lleno.style.borderBottomRightRadius = '5px';
                    lleno.classList.add('lleno');

                    //posiciono el pocentaje de llenado del deposito
                    porcentaje.textContent = json[i].porcentaje + '%';
                    porcentaje.style.position = 'relative';
                    porcentaje.style.marginTop = '-60%';
                    porcentaje.style.marginLeft = '3.5%';
                    porcentaje.style.zIndex = '1';
                    porcentaje.style.color = 'white';
                    porcentaje.classList.add('porcendepo')

                    //añado el nombre del deposito para poder ver mas facilmente cual esta seleccionado
                    nombre.textContent = json[i].nombre;
                    nombre.style.marginLeft = '3.5%';
                    nombre.style.marginTop = '50%';
                    nombre.style.zIndex = '1';
                    nombre.id = json[i].d;

                    contenedor.appendChild(vacio);//añado vacio al contenedor global
                    contenedor.appendChild(lleno);//añado lleno al contenedor global
                    contenedor.appendChild(porcentaje);//añado el porcentaje al contenedor global
                    contenedor.appendChild(nombre);//añado el nombre al contenefor global
                    listadepositos.appendChild(contenedor);//añado el contenedor global aldvi del HTML

                    //guardo los datos del deposito en atributos que le creo, 
                    //para poder ver luego esos datos
                    contenedor.setAttribute('contenidoActual', json[i].contenidoActual);
                    contenedor.setAttribute('porcentaje', json[i].porcentaje);
                    contenedor.setAttribute('nombredeposito', json[i].nombre);

                    //cuando el ratón pasa por encima cambia el texto por el contenido actual ocupado
                    contenedor.addEventListener('mouseover', function () {
                        porcentaje.style.color = "black";
                        porcentaje.firstChild.nodeValue = this.getAttribute('contenidoActual') + 'L';
                    }, false);

                    //cuando el ratón sale de encima del contenedor cambia el texto por el porcentaje ocupado
                    contenedor.addEventListener('mouseout', function () {
                        porcentaje.style.color = "white";
                        porcentaje.firstChild.nodeValue = this.getAttribute('porcentaje') + '%';
                    }, false);

                    //cuando hago click en un deposito guardo el nombre y el id en inputs para luego pasarlos
                    contenedor.addEventListener('click', function () {
                        cnombreDepo.style.color = "white";
                        cnombreDepo.firstChild.nodeValue = this.getAttribute('nombredeposito');
                        ciddepo.hidden = false;
                        ciddepo.firstChild.nodeValue = this.getAttribute('id');
                        ciddepo.hidden = true;
                    }, false);
                }
            }
        })

        .catch(err => {
            console.log("ERROR ..............:" + err);

        });
}
