<?php
    include_once("../db.php");
    $conexion = new db();
    $conectar = $conexion->conectar();

    $ID = $_POST['ID'];

    $action = $_POST['action'];

    $params = array(
        ":ID" => $ID,
        ":action" => $action
    );
    $params2 = array(
        ":ID" => $ID
    );

    $consulta = 'UPDATE usuario SET action = action + :action WHERE ID = :ID';
    $pdo = $conectar->prepare($consulta);
    if ($pdo->execute($params)) {
        $consulta2 = 'SELECT action FROM usuario WHERE ID = :ID';
        $pdo2 = $conectar->prepare($consulta2);
        if ($pdo2->execute($params2)) {
            $resultado = $pdo2->fetchColumn();
            echo $resultado;
        }
    } else {
        echo "0";
    }
?>