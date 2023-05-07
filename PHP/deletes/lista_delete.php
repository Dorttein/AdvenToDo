<?php
    include_once("../db.php");
    $conexion = new db();
    $conectar = $conexion->conectar();

    $ID = $_POST['ID'];

    $params = array(
        ":IDE" => $ID
    );
    $consulta = 'DELETE FROM lista WHERE ID = :IDE';
    $pdo = $conectar->prepare($consulta);
    if ($pdo->execute($params)) {
        echo "1";
    } else {
        echo "0";
    }
?>