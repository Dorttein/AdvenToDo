<?php
    include_once("../db.php");
    $conexion = new db();
    $conectar = $conexion->conectar();

    $ID = $_POST['ID'];
    $ID_enemy = $_POST['ID_enemy'];

    $params = array(
        ":ID" => $ID,
        ":ID_enemy" => $ID_enemy
    );
    $params2 = array(
        ":ID" => $ID
    );

    $consulta = 'UPDATE usuario SET ID_enemy =:ID_enemy WHERE ID = :ID';
    $pdo = $conectar->prepare($consulta);
    $pdo->execute($params);

    $consulta2 = 'UPDATE usuario SET 
    HP_enemy = 100 WHERE ID = :ID';
    $pdo2 = $conectar->prepare($consulta2);
    $pdo2->execute($params2);

    $resultado=0;
    $consulta3 = 'SELECT ID_enemy FROM usuario WHERE ID = :ID';
    $pdo3 = $conectar->prepare($consulta3);
    $pdo3->execute($params2);
    $resultado = $pdo2->fetchColumn();
    echo $resultado;
?>