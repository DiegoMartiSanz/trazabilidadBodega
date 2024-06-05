<?php
header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Headers: Content-Type');

include('conexion.php');

$id = $_POST['id'];
$nombre = $_POST['nombre'];
$tipo = $_POST['tipo'];
$capacidad = $_POST['cap'];
$contenido = $_POST['cont'];
$porcentaje = 0;
$destino = $_POST['destino'];

$porcentaje = round((($contenido*100)/$capacidad),2);

$metodo = $_POST['metodo'];



if ($connect->connect_errno) {

    echo "Fallo al conectar a MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;

} else {
    if($metodo == 'insertar'){
        $query = "INSERT INTO depositos VALUES ('null','$nombre','$tipo','$capacidad','$contenido','$porcentaje','$destino')";

    }else{
        $query = "UPDATE depositos set nombre = '$nombre', tipo = '$tipo', capacidad = '$capacidad', contenidoActual = '$contenido', porcentaje = '$porcentaje', destino = '$destino' WHERE d = $id";

    }
    
    $resultado = mysqli_query($connect, $query);

    echo "Registro grabado correctamente " . $query;

    $connect->close();

}