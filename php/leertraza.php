<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
include('conexion.php');

$id = $_POST['origen'];
$fecha = $_POST['fecha'];



$sql = "SELECT * FROM operaciones WHERE idDestino = $id";

$resultado = mysqli_query($connect, $sql);

while ($row = mysqli_fetch_assoc($resultado)) {
    $output[] = $row;
}

print(json_encode($output));


$connect->close();