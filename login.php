<?php
include("php/conexion.php");


?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>login</title>
    <link rel="stylesheet" href="css/stile.css">
</head>

<body>
    <?php
    if (isset($_POST['submit'])) {
        $usuario = $_POST['usuario'];
        $pass= $_POST['pass'];
        $sql = "SELECT * FROM usuarios WHERE usuario = '$usuario' AND pass = '$pass'";
        $result = $connect->query($sql);
        
        if($result->num_rows > 0){
            
            header("Location: listado.html");
            exit;
        }
    }
    ?>
    <form action="index.php" style="background-color: #ccc;display:flex;flex-direction: row-reverse;">
        <div style="align-items: end;">
            <input type="submit" value="Volver">
        </div>
    </form>
    <section class="user">
        
        <div class="user_options-container">
            <div class="user_options-text">
                <div class="user_options-unregistered">
                    <h2 class="user_unregistered-title">WineLine</h2>
                    <p class="user_unregistered-text">Solo se va a poder ingresar si tienes una cuenta ya registrada por el administrador</p>
                </div>
            </div>

            <div class="user_options-forms" id="user_options-forms">
                <div class="user_forms-login">
                    <h2 class="forms_title">Login</h2>
                    <form action="login.php" class="forms_form" method="post">
                        <fieldset class="forms_fieldset">
                            <div class="forms_field">
                                <input type="text" placeholder="Usuario" id="usuario" name="usuario" class="forms_field-input" required autofocus />
                            </div>
                            <div class="forms_field">
                                <input type="password" placeholder="Contraseña" id="pass" name="pass" class="forms_field-input" required />
                            </div>
                        </fieldset>
                        <div class="forms_buttons">
                            <input type="submit" id="submit" name="submit" value="Iniciar Sesion" class="forms_buttons-action">
                        </div>
                    </form>
                </div>
                <div class="user_forms-signup">
                    
                </div>
            </div>
        </div>
    </section>
    <script src="js/algo.js"></script>
</body>

</html>