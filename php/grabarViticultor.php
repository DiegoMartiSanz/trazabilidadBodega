<?php
header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Headers: Content-Type');

include('conexion.php');

$id = $_POST['id'];
$dni = $_POST['dni'];
$nombre = $_POST['nombre'];
$telefono = $_POST['telefono'];
$direccion = $_POST['direccion'];
$poblacion = $_POST['poblacion'];
$provincia = $_POST['provincia'];
$cp = $_POST['cp'];
$metodo = $_POST['metodo'];



if ($connect->connect_errno) {

    echo "Fallo al conectar a MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;

} else {
    if($metodo == 'insertar'){
        $query = "INSERT INTO viticultor VALUES ('null','$nombre','$telefono','$direccion','$poblacion','$provincia','$cp','$dni')";

    }else{
        $query = "UPDATE viticultor set nombre = '$nombre', telefono = $telefono, direccion = '$direccion', poblacion = '$poblacion', provincia = '$provincia', codigoPostal = '$cp', dni = '$dni' WHERE vi = $id";

    }
    
    $resultado = mysqli_query($connect, $query);

    echo "Registro grabado correctamente " . $query;

    $connect->close();

}