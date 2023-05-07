<?php
    include_once("../db.php");
    $conexion = new db();
    $conectar = $conexion->conectar();

    $ID_user = $_POST['ID_user'];
    $ID_user = 17;
    
    $params = array(
        ":ID_user" => $ID_user
    );

    $consulta = 'SELECT ID FROM lista WHERE ID_user = :ID_user';
    $pdo = $conectar->prepare($consulta);
    $pdo->execute($params);
    $json = array();
    while ($row = $pdo->fetch(PDO::FETCH_ASSOC)) {
        $params = array(
            ":ID_lista" => $row['ID']
        );
        $consulta_count = 'SELECT * FROM tarea WHERE ID_lista = :ID_lista';
        $pdo_tarea = $conectar->prepare($consulta_count);
        $pdo_tarea->execute($params);
        while ($row = $pdo_tarea->fetch(PDO::FETCH_ASSOC)) {
            $tareas = array (
                'ID' => $row['ID'],'nombre' => $row['name'],
                'detail'=>$row['detail'],'reward'=>$row['reward'],
                'completed'=>$row['completed'],'initial_date'=>$row['initial_date'],
                'limit_date'=>$row['limit_date'],'again'=>$row['again'],
                'importante'=>$row['important'],'ID_lista'=>$row['ID_lista']
            );
            $json[] = $tareas;
        }
    }
    echo json_encode($json);
?>









