<?php

$host_name = "localhost";

$database = "bodega";

$user_name = "root";

$password = "";

$connect = mysqli_connect($host_name, $user_name, $password, $database);

if (mysqli_connect_errno()) {

  echo '<p>"Error: Fallo al conectarse a MySQL debido a: ' . mysqli_connect_error() . '</p>';

}