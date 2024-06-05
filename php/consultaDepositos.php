<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
include('conexion.php');
if(isset($_POST['Envio'])){

    $contenido=$_POST['Envio'];

    $sql = "SELECT * FROM depositos ".$contenido;
    
    $resultado = mysqli_query($connect, $sql);
    
    while ($row = mysqli_fetch_assoc($resultado)) {
        $output[] = $row;
    }
    
    print(json_encode($output));
}

if(isset($_POST['Borrar'])){
    $contenido=$_POST['Borrar'];

    $sql = "DELETE FROM depositos ".$contenido;

    while (mysqli_query($connect, $sql)){
        $output[] = true;
    }
    print(json_encode($output));
    
}

$connect->close();