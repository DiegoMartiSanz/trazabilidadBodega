<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="css/inicio.css">
</head>
<body>
    <header>
        <div>
            <a href="login.php">Iniciar Sesion</a>
        </div>
    </header>
    <section>
        <h1 class="titulo">WineLine</h1>
        <div style="height: 400px ;">
            <img class="img" src="img/WineLine.png" alt="wineLine">
        </div>
        <form action="trazabilidad.php" method="post" style="width:100%">
            <input type="number" id="botella" name="botella" required>
            <button type="submit">Revisar Trazabilidad</button>
        </form>
    </section>
</body>
</html>