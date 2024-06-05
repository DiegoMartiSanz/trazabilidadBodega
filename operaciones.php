 <!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OPERACIONES</title>
    <link rel="stylesheet" href="css/estilosoperaciones.css">
</head>

<body>
    <main>
        <header class="cabecera">
            <h1 id="titulo">OPERACIONES</h1>

            <button style="background-color: transparent;border: 0;"> <a href="./listado.php"> Volver </a> </button>
        </header>

        <article class="menu">

            <input type="submit" class="boton" id="Nuevo" title="Boton Derecho Nuevo" value="NUEVO" /> 

            <!-- <input type="submit" class="boton" id="visuPrimero" value="PRIMERO" /> -->

            <input type="submit" class="boton" id="bAnterior" value="ANTERIOR" />

            <input type="submit" class="boton" id="GrabarModificar" value="GRABAR" />


            <input type="submit" class="boton" id="bSiguiente" value="SIGUIENTE" />

            <!-- <input type="submit" class="boton" id="visuUltimo" value="ULTIMO" /> -->

            <!-- <input type="submit" class="boton" id="borrarRegistro" value="BORRAR" /> -->

        </article>

        <article aria-label="Datos de la Parcela" class="datosdelejercicio">
            <header>
                <h3>
                    DATOS DE LA OPERACIÓN
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
                            <div class="col-25">
                                <label for="corigen">Id Origen</label>
                            </div>
                            <div class="col-25">
                                <select name="origen" id="corigen" class="selector">

                                </select>
                            </div>
                            <div class="col-25">
                                <label for="cdestino">Id Destino</label>
                            </div>
                            <div class="col-25">
                                <select name="destino" id="cdestino" class="selector">

                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-25">
                                <label for="ccanti">Cantidad</label>
                            </div>
                            <div class="col-25">
                                <input type="number" id="ccanti" name="canti" class="selector" required>
                            </div>

                            <div class="col-25">
                                <label for="cfecha">Fecha</label>
                            </div>
                            <div class="col-25">
                                <input type="date" name="fecha" id="cfecha" class="selector">
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-10">
                                <label for="copera">Tipo de operación</label>
                            </div>
                            <div class="col-90">
                                <select id="copera" name="opera" class="selector_grande">

                                </select>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-10">
                                <label for="cdescrip">Descripción</label>
                            </div>
                            <div class="col-90">
                                <textarea type="text" id="cdescrip" name="descrip"
                                    style="width: 100%; border-radius: 3px; border: 2px solid;"></textarea>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-10">
                                <label for="cproductos">Productos</label>
                            </div>
                            <div class="col-90">
                                <textarea type="text" id="cproductos" name="productos"
                                    style="width: 100%; border-radius: 3px; border: 2px solid;"> </textarea>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-50">
                                <label for="origen">ORIGEN</label>

                                <div id="contenedorOrigen">

                                </div>
                            </div>
                            <div class="col-50">
                                <label for="destino">DESTINO</label>

                                <div id="contenedorDestino">

                                </div>
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
<script src="js/operaciones.js"></script>

</html>