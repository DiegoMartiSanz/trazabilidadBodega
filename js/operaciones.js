var tiposeleccionado;
var destinoseleccionado = 1, origenseleccionado = 1;

let bSiguiente = document.getElementById("bSiguiente");
bSiguiente.addEventListener("click", visualizarSiguiente, false);

let bAnterior = document.getElementById("bAnterior");
bAnterior.addEventListener("click", visualizarAnterior, false);

let bNuevo = document.getElementById("Nuevo");
bNuevo.addEventListener("click", NuevoRegistro, false);

let bGrabar = document.getElementById("GrabarModificar");
bGrabar.addEventListener("click", Grabar, false);

// Visualiza Siguiente registro  


function visualizarSiguiente() {
    cid.disabled=false
    let condicionSql = "where o > " + cid.value + " order by o ASC limit 1"
    cid.disabled=true
    generarRegistro(condicionSql)
}


// Visualiza Anterior registro  

function visualizarAnterior() {
    cid.disabled=false
    let condicionSql = "where o < " + cid.value + " order by o DESC limit 1"
    cid.disabled=true
    generarRegistro(condicionSql)
}

//Genero un registro vacio 

function NuevoRegistro() {
    cid.value = 0;
    cfecha.value = '';
    ccanti.value = 0;
    cdescrip.value = '';
    cproductos.value = '';
    corigen.value = '1';
    cdestino.value = '1';
    copera.value = '1';


    GrabarModificar.value = "GRABAR";
    leerdepo();
}


//consulta
function generarRegistro(condicionSql) {

    var ajaxrequest = new XMLHttpRequest();
    ajaxrequest.open("POST", "http://localhost:80/trazabilidadBodega/php/consultaOperaciones.php", true);
    ajaxrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    ajaxrequest.onreadystatechange = function () {
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
    let formulario = document.getElementById('formu');

    let formData = new FormData(formulario);

    //dependiendo de lo que ponga en el boton (si es Grabar = nuevo, Modificar = ya existente)
    if (GrabarModificar.value == "GRABAR") {

        formData.append('metodo', 'insertar')

    } else {

        formData.append('metodo', 'modificar')

    }

    fetch("http://localhost:80/trazabilidadBodega/php/grabarOperaciones.php", {
        method: "POST",
        body: formData
    })
        // esto me muestra si se ejecuta correctamente el sql de grabarDeposito.php
        // .then(resp => {
        //     return resp.text();
        // })
        // .then(resp => {
        //     alert(resp);
        // })
        ;
    cid.disabled = true;
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
    cid.value = registro.o;
    cfecha.value = registro.fecha;
    cdescrip.value = registro.descripcion;
    ccanti.value = registro.cantidad;
    cproductos.value = registro.productos;

    //guardo estos datos para luego poder seleccionarles en sus selects
    tiposeleccionado = registro.operacion;
    destinoseleccionado = registro.idDestino;
    origenseleccionado = registro.idOrigen;


    GrabarModificar.value = "MODIFICAR";
    tipos();
    depositos();
    leerdepo();
}

function tipos() {
    let formData = new FormData();
    fetch('http://localhost:80/trazabilidadBodega/php/leertipopera.php', {
        method: 'POST',
        body: formData,
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

            let listatipo = document.getElementById('copera');
            //miro si ya tiene datos para eliminarlo, si ese es el caso
            while (listatipo.firstChild) {
                listatipo.removeChild(listatipo.firstChild);
            }
            let opcion;
            for (let i = 0; i < json.length; i++) {
                //creo un option por cada dato recibido
                opcion = document.createElement('option');
                opcion.value = json[i].d;
                opcion.text = json[i].descripcion;
                //si es un dato que he recogido de la base de datos selecciono el que estaba en ella
                if (tiposeleccionado == json[i].d) {
                    opcion.selected = true;
                }
                listatipo.appendChild(opcion);
            }
        })
        .catch(err => {
            console.log("ERROR ..............:" + err);

        });
}
tipos();

function depositos() {

    let formData = new FormData();
    fetch('http://localhost:80/trazabilidadBodega/php/leerDepositos.php', {
        method: 'POST',
        body: formData,
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
            let listadestino = document.getElementById('cdestino');
            //miro si ya tiene datos para eliminarlo, si ese es el caso
            while (listadestino.firstChild) {
                listadestino.removeChild(listadestino.firstChild);
            }

            for (i = 0; i < json.length; i++) {
                //creo un option por cada dato recibido
                let opcion = document.createElement('option');
                opcion.value = json[i].d;
                opcion.text = json[i].d + ' - ' + json[i].nombre + ' - ' + json[i].destino;
                //si es un dato que he recogido de la base de datos selecciono el que estaba en ella
                if (destinoseleccionado == json[i].d) {
                    opcion.selected = true;
                }
                //añado el option a el select
                listadestino.appendChild(opcion);
            }
            let listaorigen = document.getElementById('corigen');
            //miro si ya tiene datos para eliminarlo, si ese es el caso
            while (listaorigen.firstChild) {
                listaorigen.removeChild(listaorigen.firstChild);
            }

            for (i = 0; i < json.length; i++) {
                //creo un option por cada dato recibido
                let opcion = document.createElement('option');
                opcion.value = json[i].d;
                opcion.text = json[i].d + ' - ' + json[i].nombre + ' - ' + json[i].destino;
                //si es un dato que he recogido de la base de datos seleccion el que estaba
                if (origenseleccionado == json[i].d) {
                    opcion.selected = true;
                }
                //añado el option a el select
                listaorigen.appendChild(opcion);
            }
        })

        .catch(err => {
            console.log("ERROR ..............:" + err);

        });

}
depositos();


//creo un evento para ver si cambio los selects de los depositos para cambiar la imagen del deposito por el seleccionado
let borigen = document.getElementById("corigen");
borigen.addEventListener("change", leerdepo, false);

let bdestino = document.getElementById("cdestino");
bdestino.addEventListener("change", leerdepo, false);



leerdepo();

function leerdepo() {
    setTimeout(1000)

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

            let listaorigen = document.getElementById('contenedorOrigen');

            //miro si ya tiene datos para eliminarlo, si ese es el caso
            while (listaorigen.firstChild) {
                listaorigen.removeChild(listaorigen.firstChild);
            }
            let listadestino = document.getElementById('contenedorDestino');

            //miro si ya tiene datos para eliminarlo, si ese es el caso
            while (listadestino.firstChild) {
                listadestino.removeChild(listadestino.firstChild);
            }

            origenseleccionado = corigen.value;
            destinoseleccionado = cdestino.value;

            for (i = 0; i < json.length; i++) {

    if (json[i].d == origenseleccionado) {

        //creo los elementos que voy a necesitar para la imagen del deposito
        let contenedor = document.createElement('div');
        let vacio = document.createElement('div');
        let lleno = document.createElement('div');
        let porcentaje = document.createElement('p');
        let nombre = document.createElement('p');

        //le doy formato a lo que va a ser el contenedor global
        contenedor.style.width = '150px';
        contenedor.style.height = '150px';
        contenedor.classList.add('cont');
        contenedor.setAttribute('id', json[i].d);
        contenedor.setAttribute('name', 'origen');
        contenedor.setAttribute('value', json[i].d);

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
        listaorigen.appendChild(contenedor);//añado el contenedor global aldvi del HTML

    }

    if (json[i].d == destinoseleccionado) {

        //creo los elementos que voy a necesitar para la imagen del deposito
        let contenedor = document.createElement('div');
        let vacio = document.createElement('div');
        let lleno = document.createElement('div');
        let porcentaje = document.createElement('p');
        let nombre = document.createElement('p');

        //le doy formato a lo que va a ser el contenedor global
        contenedor.style.width = '150px';
        contenedor.style.height = '150px';
        contenedor.classList.add('cont');
        contenedor.setAttribute('id', json[i].d);
        contenedor.setAttribute('name', 'destino');

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
        listadestino.appendChild(contenedor);//añado el contenedor global aldvi del HTML

    }

}
        })

        .catch(err => {
            console.log("ERROR ..............:" + err);

        });
}