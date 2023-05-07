<?php
    include_once("../db.php");
    $conexion = new db();
    $conectar = $conexion->conectar();

    $ID = $_POST['ID'];

    $completed = $_POST['cp'];
    $nombre = $_POST['nb'];
    $details = $_POST['dt'];
    $reward = $_POST['rw'];
    $limit = $_POST['lm'];
    $important = $_POST['imp'];

    $params = array(
        ":ID" => $ID,
        ":completed" => $completed,
        ":nombre" => $nombre,
        ":details" => $details,
        ":reward" => $reward,
        ":limite" => $limit,
        ":important" => $important
    );

    $consulta = 'UPDATE tarea SET completed = :completed, name = :nombre, detail = :details, reward = :reward, limit_date = :limite, important = :important WHERE ID = :ID';
    $pdo = $conectar->prepare($consulta);
    if ($pdo->execute($params)) {
        echo "1";
    } else {
        echo "0";
    }
?>