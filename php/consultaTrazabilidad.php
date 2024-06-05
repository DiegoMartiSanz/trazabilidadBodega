<?php
file_put_contents('debug.txt','hola', 8);
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
$host_name = "localhost";

$database = "bodega";

$user_name = "root";

$password = "";

$connect = mysqli_connect($host_name, $user_name, $password, $database);

$lote = $_POST["lote"];
$array = [[]];

function encontarOrigen($hijo,$array,$index = 0){
    $sql = "SELECT * FROM operaciones WHERE idDestino = " . $hijo ;

    $resultado = mysqli_query($connect, $sql);

    while ($row = mysqli_fetch_assoc0($resultado)) {
        $output[] = $row;
    }
    
    $array[$index][]=$output;

    foreach($output as $algo){
        $array = encontarOrigen($algo["idOrigen"],$array,$index++);
    }
    return $array;
}

$array = encontarOrigen(25,$array);

file_put_contents("./debug.txt",print(json_encode($array)), 8);

print(json_encode($array));
$connect->close();