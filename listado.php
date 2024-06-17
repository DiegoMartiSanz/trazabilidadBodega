<?php
session_star;
if(!$_SESSION["bueno"]==true){
    header("Location: index.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Listado</title>
    <link rel="stylesheet" href="css/estilosMenu.css">
</head>

<body>
    <header>
        <a href="index.php">Cerrar Sesión</a>
    </header>
    <section>
        <div class="menu">
            <label>Menú</label>
            <a class="boton" href="./crudviticultor.php">Viticultor</a>
            <a class="boton" href="./cruddepositos.php">Depósitos</a>
            <a class="boton" href="./viajesUva.php">Viajes de Uva</a>
            <a class="boton" href="./operaciones.php">Operaciones</a>
        </div>
    </section>
</body>

</html>