<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRUD Depositos</title>
    <link rel="stylesheet" href="css/estilosdeposito.css">
</head>

<body>
    <main>
        <header class="cabecera">
            <h1 id="titulo">DEPÓSITOS</h1>

            <button style="background-color: transparent;border: 0;"> <a href="./listado.php"> Volver </a> </button>
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
                    DATOS DEL DEPÓSITO
                </h3>
            </header>

            <fieldset>
                <div class="container">
                    <form name="formu" id="formu" method="post">
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
                                <label for="cnombre">Nombre</label>
                            </div>
                            <div class="col-75">
                                <input id="cnombre" name="nombre" placeholder="Nombre Apellidos" type="text" required>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-25">
                                <label for="ctipo">Tipo Depósito</label>
                            </div>
                            <div class="col-75">
                                <select id="ctipo" name="tipo" class="selector">
                                    
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-25">
                                <label for="ccap">Capacidad</label>
                            </div>
                            <div class="col-75">
                                <input type="number" id="ccap" name="cap" required>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-25">
                                <label for="ccont">Contenido Actual</label>
                            </div>
                            <div class="col-75">
                                <input type="number" id="ccont" name="cont" required>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-25">
                                <label for="cdestino">Destino del depósito</label>
                            </div>
                            <div class="col-75">
                                <select id="cdestino" name="destino" class="selector">
                                    
                                </select>
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

<script src="js/deposito.js"></script>
</html>