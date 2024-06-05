var tipoSelect, vitiSelect, tiposeleccionado, destinoseleccionado;

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

    let condicionSql = " order by d ASC limit 1"
    generarRegistro(condicionSql)
}


// Visualiza ultimo registro visuUltimo
function visualizarUltimo() {
    let condicionSql = " order by d DESC limit 1"
    generarRegistro(condicionSql)
}

// Visualiza Siguiente registro  
function visualizarSiguiente() {
    let condicionSql = "where d > " + cid.value + " order by d  ASC limit 1"
    generarRegistro(condicionSql)
}

// Visualiza Anterior registro  
function visualizarAnterior() {
    let condicionSql = "where d < " + cid.value + " order by d  DESC limit 1"
    generarRegistro(condicionSql)
}

//Borro el registro visualizado
function borrarRegistro() {
    let condicionSql = "WHERE d = " + cid.value;
    generar2Registro(condicionSql);
    let condicionSql1 = "where d < " + cid.value + " order by d  DESC limit 1";
    generarRegistro(condicionSql1);
}

//Genero un registro vacio 
function NuevoRegistro() {
    cid.value = 0;
    cnombre.value = '';

    ccap.value = '';
    ccont.value = '';
    cporcentaje.value = '';


    GrabarModificar.value = "GRABAR";
}

//borrar
function generar2Registro(condicionSql) {

    var ajaxrequest = new XMLHttpRequest();
    ajaxrequest.open("POST", "http://localhost:80/trazabilidadBodega/php/consultaDepositos.php", true);
    ajaxrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    if (ajaxrequest.readyState === 4 && (ajaxrequest.status === 200)) {
    }

    let envio = "Borrar=" + condicionSql;
    ajaxrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajaxrequest.send(envio);
}


//consulta
function generarRegistro(condicionSql) {

    var ajaxrequest = new XMLHttpRequest();
    ajaxrequest.open("POST", "http://localhost:80/trazabilidadBodega/php/consultaDepositos.php", true);
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
    //dependiendo de lo que ponga en el boto (si es Grabar = nuevo, Modificar = ya existente)
    if (GrabarModificar.value == "GRABAR") {
        formData.append('metodo', 'insertar')
    } else {
        formData.append('metodo', 'modificar')
    }

    fetch("http://localhost:80/trazabilidadBodega/php/grabarDepositos.php", {
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

    //pongo los datos que recibo de la base de datos es sus correspondientes inputs
    cid.value = registro.d;
    cnombre.value = registro.nombre;
    ccap.value = registro.capacidad;
    ccont.value = registro.contenidoActual;
    cporcentaje.value = registro.porcentaje;

    //guardo el dato para luego poder seleccionarlo
    destinoseleccionado = registro.destino;
    tiposeleccionado = registro.tipo;
    
    GrabarModificar.value = "MODIFICAR";
    tipos();
    destino();
}

function tipos() {

    let listatipo = document.getElementById('ctipo');
    //miro si ya tiene datos para eliminarlo, si ese es el caso
    while (listatipo.firstChild) {
        listatipo.removeChild(listatipo.firstChild);
    }
    tipoA = Array('Barrica', 'Aluminio', 'Hormigon','Lote');//creo un array con las opciones
    let opcion;
    for (let i = 0; i < tipoA.length; i++) {
        opcion = document.createElement('option');
        opcion.value = tipoA[i];
        opcion.text = tipoA[i];

        //si es un dato que he recogido de la base de datos selecciono el que estaba en ella
        if (tiposeleccionado == tipoA[i]) {
            opcion.selected = true;
        }
        listatipo.appendChild(opcion);
    }
}
tipos();

function destino() {

    let listadestino = document.getElementById('cdestino');
    //miro si ya tiene datos para eliminarlo, si ese es el caso
    while (listadestino.firstChild) {
        listadestino.removeChild(listadestino.firstChild);
    }
    tipoA = Array('Fermentacion', 'Maduracion', 'Madera','Embotellado');
    let opcion;
    for (let i = 0; i < tipoA.length; i++) {
        opcion = document.createElement('option');
        opcion.value = tipoA[i];
        opcion.text = tipoA[i];
        //si es un dato que he recogido de la base de datos selecciono el que estaba en ella
        if (destinoseleccionado == tipoA[i]) {
            opcion.selected = true;
        }
        listadestino.appendChild(opcion);
    }
}
destino();
