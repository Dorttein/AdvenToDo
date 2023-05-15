<?php
    include_once("../db.php");
    $conexion = new db();
    $conectar = $conexion->conectar();

    $ID_user = $_POST['ID_user'];
    
    $params = array(
        ":ID_user" => $ID_user
    );

    $consulta = 'SELECT * FROM lista WHERE ID_user = :ID_user ORDER BY ID';
    $pdo = $conectar->prepare($consulta);
    $pdo->execute($params);
    $json = array();
    while ($row = $pdo->fetch(PDO::FETCH_ASSOC)) {
        $params = array(
            ":ID_lista" => $row['ID']
        );
        $consulta_count = 'SELECT COUNT(*) as count FROM tarea WHERE ID_lista = :ID_lista';
        $pdo_count = $conectar->prepare($consulta_count);
        $pdo_count->execute($params);
        $count = $pdo_count->fetch(PDO::FETCH_ASSOC)['count'];
    
        $tareas = array (
            'ID' => $row['ID'], 'nombre' => $row['name'], 'count' => $count
        );
        $json[] = $tareas;
    }
    echo json_encode($json);
?>