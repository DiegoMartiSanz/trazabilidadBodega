<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trazabilidad</title>
    <link rel="stylesheet" href="css/trazabilidad.css">
</head>
<body>
    <header>
        <div>
            <a href="index.php">Volver</a>
        </div>
    </header>
    <h1>Trazabilidad</h1>
    <table>
        <tr>
            <td>Id operación</td>
            <td>Id origen</td>
            <td>Id destino</td>
            <td>Tipo de operación</td>
            <td>Fecha</td>
            <td>Cantidad</td>
            <td>Descripción</td>
            <td>Productos</td>
        </tr>
        <?php
        file_put_contents('debug.txt','hola', 8);
        $host_name = "localhost";

        $database = "bodega";
        
        $user_name = "root";
        
        $password = "";
        
        $conn = mysqli_connect($host_name, $user_name, $password, $database);

        if (mysqli_connect_errno()) {
        
          echo '<p>"Error: Fallo al conectarse a MySQL debido a: ' . mysqli_connect_error() . '</p>';
        }
        
        $empiece=$_POST['botella'];
        
        $arr = [[]];

        function encontarOrigen($hijo,$arr,$index = 0){
            global $conn;
            $sql = "SELECT * FROM operaciones WHERE idDestino = " . $hijo ;
            
            $resultado = mysqli_query($conn, $sql);
            $row = $resultado->fetch_object();
            $output = [];
            
            while ($row != null) {
                //inserto en la pagina web las filas con los datos recogidos de la base  de datos
                echo "
                <tr>
                    <td>".$row->o."</td>
                    <td>".$row->idOrigen."</td>
                    <td>".$row->idDestino."</td>
                    <td>".$row->operacion."</td>
                    <td>".$row->fecha."</td>
                    <td>".$row->cantidad."</td>
                    <td>".$row->descripcion."</td>
                    <td>".$row->productos."</td>
                </tr>";
                $hijo2=$row->idOrigen;
                $output[] = $row;
                $row = $resultado->fetch_object();
            }
            $arr[$index][]=$output;
            
            foreach($output as $algo){
                $arr = encontarOrigen($hijo2,$arr,$index++);
            }
            
            return $arr;
        }
            $arr = encontarOrigen($empiece,$arr);
           
            $conn->close();
        ?>
    </table>
</body>
</html>