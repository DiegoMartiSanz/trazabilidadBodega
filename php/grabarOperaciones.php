<?php
header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Headers: Content-Type');

include('conexion.php');

$id = $_POST['id'];
$destino = $_POST['destino'];
$origen = $_POST['origen'];
$operacion = $_POST['opera'];
$fecha = $_POST['fecha'];
$descripcion = $_POST['descrip'];
$productos = $_POST['productos'];
$canti = $_POST['canti'];

$metodo = $_POST['metodo'];



if ($connect->connect_errno) {

    echo "Fallo al conectar a MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;

} else {
    if($metodo == 'insertar'){
        $query = "INSERT INTO operaciones VALUES ('null','$origen','$destino','$operacion','$fecha','$canti','$descripcion','$productos')";

    }else{
        $query = "UPDATE operaciones set idOrigen = '$origen', idDestino = '$destino', operacion = '$operacion', fecha = '$fecha', cantidad = $canti, descripcion = '$descripcion', productos = '$productos' WHERE o = $id";

    }
    
    $resultado = mysqli_query($connect, $query);

    echo "Registro grabado correctamente " . $query;

    $query2 = "UPDATE depositos set contenidoActual = contenidoActual + $canti, porcentaje = round(((contenidoActual*100)/capacidad),2) WHERE d = $destino";

    $resultado = mysqli_query($connect, $query2);

    echo "Registro grabado correctamente " . $query2;

    $query3 = "UPDATE depositos set contenidoActual = contenidoActual - $canti, porcentaje = round(((contenidoActual*100)/capacidad),2) WHERE d = $origen";

    $resultado = mysqli_query($connect, $query3);

    echo "Registro grabado correctamente " . $query3;


    $connect->close();

}