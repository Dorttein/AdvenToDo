<?php
    include_once("../db.php");
    $conexion = new db();
    $conectar = $conexion->conectar();

    $ID_user = $_POST['user'];

    $params = array(
        ":ID_user" => $ID_user
    );

    $consulta = 'SELECT * FROM equiped WHERE ID_user = :ID_user';
    $pdo = $conectar->prepare($consulta);
    $pdo->execute($params);
    $json = array();
    while ($row = $pdo->fetch(PDO::FETCH_ASSOC)) {
        $objetoEquiped = array (
            'ID_object' => $row['ID_object']
        );
        $json[] = $objetoEquiped;
    }
    
    echo json_encode($json);
?>