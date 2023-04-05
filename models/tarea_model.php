<?php
    include_once("db.php");
    $conexion = new db();
    $conectar = $conexion->conectar();
    $consulta = 'SELECT * FROM tarea';
    $pdo = $conectar->prepare($consulta);
    $pdo->execute();
    $json = array();
    while ($row = $pdo->fetch(PDO::FETCH_ASSOC)) {
        $tareas = array (
            'ID' => $row['ID'],'nombre' => $row['name'],
            'detail'=>$row['detail'],'reward'=>$row['reward'],
            'completed'=>$row['completed'],'initial_date'=>$row['initial_date'],
            'limit_date'=>$row['limit_date'],'again'=>$row['again'],
            'important'=>$row['important'],'ID_user'=>$row['ID_user'],
            'ID_lista'=>$row['ID_lista']
        );
        $json[] = $tareas;
    }
    echo json_encode($json);
?>