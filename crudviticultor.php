<?php
session_start();
if(!$_SESSION["bueno"]==true){
    header("Location: index.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRUD Viticultor</title>
    <link rel="stylesheet" href="css/estilos.css">
</head>

<body>
    <main>
        <header class="cabecera">
            <h1 id="titulo">VITICULTORES</h1>

            <button class="boton"> <a href="./listado.php"> VOLVER </a> </button>
        </header>

        <article class="menu">

            <input type="button" class="boton" id="Nuevo" title="Boton Derecho Nuevo" value="NUEVO" />

            <input type="button" class="boton" id="GrabarModificar" value="GRABAR" />

            <input type="button" class="boton" id="visuPrimero" value="PRIMERO" />

            <input type="button" class="boton" id="bAnterior" value="ANTERIOR" />

            <input type="button" class="boton" id="bSiguiente" value="SIGUIENTE" />

            <input type="button" class="boton" id="visuUltimo" value="ULTIMO" />

            <input type="button" class="boton" id="borrarRegistro" value="BORRAR" />

        </article>


        <article aria-label="Datos del Viticultor" class="datosdelejercicio">
            <header>
                <h3>
                    DATOS DEL VITICULTOR
                </h3>
            </header>

            <fieldset>
                <div class="container">
                    <form name="form" id="form" method="post">
                        <div class="row">
                            <div class="col-25">
                                <label for="cid">Id</label>
                            </div>
                            <div class="col-75">
                                <input type="text" value="0" id="cid" name="id" disabled
                                    style="background-color: rgba(128, 128, 128, 0.5); color: white;">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-25">
                                <label for="cdni">DNI</label>
                            </div>
                            <div class="col-75">
                                <input pattern="[0-9]8[a-zA-Z]1" type="text" id="cdni" name="dni" placeholder="12345678A" required>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-25">
                                <label for="cnombre">Nombre y Apellidos</label>
                            </div>
                            <div class="col-75">
                                <input id="cnombre" name="nombre" placeholder="Nombre Apellidos" type="text" required>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-25">
                                <label for="ctelefono">Teléfono</label>
                            </div>
                            <div class="col-75">
                                <input type="text" id="ctelefono" name="telefono" pattern="[0-9]9" placeholder="123456789" required>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-25">
                                <label for="cdireccion">Dirección</label>
                            </div>
                            <div class="col-75">
                                <input type="text" id="cdireccion" name="direccion" required>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-25">
                                <label for="cpoblacion">Población</label>
                            </div>
                            <div class="col-75">
                                <input type="text" id="cpoblacion" name="poblacion" required>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-25">
                                <label for="cprovincia">Provincia</label>
                            </div>
                            <div class="col-75">
                                <input type="text" id="cprovincia" name="provincia" required>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-25">
                                <label for="ccp">Código Postal</label>
                            </div>
                            <div class="col-75">
                                <input pattern="[0-9]5" type="text" id="ccp" name="cp" placeholder="12345" required>
                            </div>
                        </div>

                    </form>
                </div>
            </fieldset>
        </article>

        <footer class="pie">
            Desarrollo de Aplicaciones Web(<cite>DAW</cite>) &copy; CIFP Santa Catalina
        </footer>



    </main>

</body>
<script src="js/viticultor.js"></script>

</html>