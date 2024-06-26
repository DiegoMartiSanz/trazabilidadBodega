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
    <title>CRUD Viajes Uva</title>
    <link rel="stylesheet" href="css/estilosviaje.css">
</head>
<body>
    <main>
        <header class="cabecera">
            <h1 id="titulo">VIAJES UVA</h1>
            
            <button style="background-color: transparent;border: 0;"><a href="./listado.php"> Volver </a></button>
        </header>

        <article class="menu">

            <input type="submit" class="boton" id="Nuevo" title="Boton Derecho Nuevo" value="NUEVO" />

            <input type="submit" class="boton" id="GrabarModificar" value="GRABAR" />

            <input type="submit" class="boton" id="visuPrimero" value="PRIMERO" />

            <input type="submit" class="boton" id="bAnterior" value="ANTERIOR" />

            <input type="submit" class="boton" id="bSiguiente" value="SIGUIENTE" />

            <input type="submit" class="boton" id="visuUltimo" value="ULTIMO" />

            <input type="submit" class="boton" id="borrarRegistro" value="BORRAR" />

        </article>


        <article aria-label="Datos de la Parcela" class="datosdelejercicio">
            <header>
                <h3>
                    DATOS DEL VIAJE
                </h3>
            </header>

            <fieldset>
                <div class="container">
                    <form name="formu" id="formu">
                        <div class="row">
                            <div class="col-10">
                                <label for="cid">Id</label>
                            </div>
                            <div class="col-90">
                                <input type="text" value="0" id="cid" name="id" disabled
                                    style="background-color: rgba(128, 128, 128, 0.5); color: white;">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-10">
                                <label for="cviti">Id Viticultor</label>
                            </div>
                            <div class="col-90">
                                <select name="viti" id="cviti" class="selector" style="width: 101%;">

                                </select>
                            </div>
                            <!-- <div class="col-25">
                                <label for="cparcela">Id Parcela</label>
                            </div>
                            <div class="col-25">
                                <select name="parcela" id="cparcela" class="selector">

                                </select>
                            </div> -->
                        </div>
                        <div class="row">
                            <div class="col-25">
                                <label for="cfecha">Fecha</label>
                            </div>
                            <div class="col-25">
                                <input type="date" name="fecha" id="cfecha" class="selector" required>
                            </div>
                        
                            <div class="col-25">
                                <label for="ckilos">Kilos Transportados</label>
                            </div>
                            <div class="col-25">
                                <input type="number" id="ckilos" name="kilos" required>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-25">
                                <label for="cph">PH</label>
                            </div>
                            <div class="col-25">
                                <input type="number" id="cph" name="ph" required>
                            </div>
                        
                            <div class="col-25">
                                <label for="cgrado">Grado de azucar</label>
                            </div>
                            <div class="col-25">
                                <input type="number" id="cgrado" name="grado" required>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-25">
                                <label for="cnombreDepo">Id depósito seleccionado</label>
                            </div>
                            <!-- El caracter ‎ es un caracter en blanco para que me mantenga la altura del parrafo -->
                            <div class="col-75">
                                <p id = "cnombreDepo" disabled
                                    style="background-color: rgba(128, 128, 128, 0.5); color: white; border-radius: 3px; border: 2px solid rgba(0, 0, 0, 0.308)">
                                    
                                </p>
                                <p id="ciddepo" name="depo" hidden>
                                    ‎ 
                                </p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-100">
                                <label for="depositos">DEPÓSITOS</label>
                            </div>
                            <div id="contenedorDepositos">
                                
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
<script src="js/viajes.js"></script>
</html>