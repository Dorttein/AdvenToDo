<?php
    include_once("../db.php");
    $conexion = new db();
    $conectar = $conexion->conectar();

    $nombre = $_POST['nb'];
    $reward = $_POST['rw'];
    $limit = $_POST['lm'];
    $important = $_POST['imp'];
    $ID_Lista = $_POST['idl'];
    $fechaHoy = date('Y-m-d');

    $params = array(
        ":nombre" => $nombre,
        ":reward" => $reward,
        ":fechaHoy" => $fechaHoy,
        ":limite" => $limit,
        ":important" => $important,
        ":ID_Lista" => $ID_Lista
    );

    $consulta = 'INSERT INTO tarea (id, name, detail, reward, completed, initial_date, limit_date, again, important, ID_lista) 
    VALUES (null, :nombre, "", :reward, 0, :fechaHoy, :limite, 0, :important, :ID_Lista)';
    $pdo = $conectar->prepare($consulta);
    if ($pdo->execute($params)) {
        echo "1";
    } else {
        echo "0";
    }
?>