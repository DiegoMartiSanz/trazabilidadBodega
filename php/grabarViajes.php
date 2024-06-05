<?php
header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Headers: Content-Type');

include('conexion.php');

$id = $_POST['id'];
$viti = $_POST['viti'];
$parcela = $_POST['parcela'];
$fecha = $_POST['fecha'];
echo $fecha;

$kg = $_POST['kilos'];
$ph = $_POST['ph'];
$grado = $_POST['grado'];
$depo = $_POST['deposi'];

$metodo = $_POST['metodo'];



if ($connect->connect_errno) {

    echo "Fallo al conectar a MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;

} else {
    if($metodo == 'insertar'){
        $query = "INSERT INTO viajesuva VALUES ('null','$fecha','$grado','$ph','$kg','$viti','$depo','$parcela')";

    }else{
        $query = "UPDATE viajesuva set fecha = '$fecha', grado = $grado, ph = '$ph', kgViaje = '$kg', idViticutor = '$viti', idDeposito = '$depo', idParcela = '$parcela' WHERE vu = $id";

    }
    
    $resultado = mysqli_query($connect, $query);

    echo "Registro grabado correctamente " . $query;

    $query2 = "UPDATE depositos set contenidoActual = contenidoActual + ($kg * 0.69565), porcentaje = round(((contenidoActual * 100)/capacidad),2) where id = $depo";

    $resultado = mysqli_query($connect, $query2);

    echo "Registro  grabado correctamente " . $query2;
}