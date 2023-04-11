<?php
    include_once("db.php");
    $conexion = new db();
    $conectar = $conexion->conectar();
    $consulta = 'SELECT * FROM usuario';
    $pdo = $conectar->prepare($consulta);
    $pdo->execute();
    $json = array();
    while ($row = $pdo->fetch(PDO::FETCH_ASSOC)) {
        $usuario = array (
            'ID' => $row['ID'],'login' => $row['login'],
            'passwd'=>$row['password'],'action'=>$row['action'],
            'completed'=>$row['completed'],'initial_date'=>$row['initial_date'],
            'HP_character'=>$row['HP_character'],'HP_enemy'=>$row['HP_enemy'],
            'ID_enemy'=>$row['ID_enemy']
        );
        $json[] = $usuario;
    }
    echo json_encode($json);
?>