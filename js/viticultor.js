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

//El primer registro de la tabla
function visualizarPrimero() {

    let condicionSql = " order by vi ASC limit 1"
    generarRegistro(condicionSql)
}


// Visualiza ultimo registro
function visualizarUltimo() {
    let condicionSql = " order by vi DESC limit 1"
    generarRegistro(condicionSql)
}

// Visualiza Siguiente registro  
function visualizarSiguiente() {
    let condicionSql = "where vi > " + cid.value + " order by vi  ASC limit 1"
    generarRegistro(condicionSql)
}


// Visualiza Anterior registro  
function visualizarAnterior() {
    let condicionSql = "where vi < " + cid.value + " order by vi  DESC limit 1"
    generarRegistro(condicionSql)
}

//Borro el registro visualizado
function borrarRegistro() {
    let condicionSql = "WHERE vi = " + cid.value;
    generar2Registro(condicionSql);
    let condicionSql1 = "where vi < " + cid.value + " order by vi  DESC limit 1";
    generarRegistro(condicionSql1);
}

//Genero un registro vacio 
function NuevoRegistro() {
    cid.value = 0;
    cdni.value = '';
    cnombre.value = '';
    ctelefono.value = '';
    cdireccion.value = '';
    cpoblacion.value = '';
    cprovincia.value = '';
    ccp.value = '';

    GrabarModificar.value = "GRABAR";
}

//borrar
function generar2Registro(condicionSql) {
    var ajaxrequest = new XMLHttpRequest();
    ajaxrequest.open("POST", "http://localhost:80/trazabilidadBodega/php/consultaViticultor.php", true);
    ajaxrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    if (ajaxrequest.readyState === 4 && (ajaxrequest.status === 200)) {
        var datosLeidos = ajaxrequest.responseText;
    }

    let envio = "Borrar=" + condicionSql;
    ajaxrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajaxrequest.send(envio);
}


//consulta
function generarRegistro(condicionSql) {

    var ajaxrequest = new XMLHttpRequest();
    ajaxrequest.open("POST", "http://localhost:80/trazabilidadBodega/php/consultaViticultor.php", true);
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
    let formulario = document.getElementById("form");

    let formData = new FormData(formulario);
    //dependiendo de lo que ponga en el boto (si es Grabar = nuevo, Modificar = ya existente)
    if (GrabarModificar.value == "GRABAR") {
        formData.append('metodo', 'insertar')
    } else {
        formData.append('metodo', 'modificar')
    }

    fetch("http://localhost:80/trazabilidadBodega/php/grabarViticultor.php", {
        method: "POST",
        body: formData
    });
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
    cid.value = registro.vi;
    cdni.value = registro.dni;
    cnombre.value = registro.nombre;
    ctelefono.value = registro.telefono;
    cdireccion.value = registro.direccion;
    cpoblacion.value = registro.poblacion;
    cprovincia.value = registro.provincia;
    ccp.value = registro.codigoPostal;

    GrabarModificar.value = "MODIFICAR";
}
