<?php
    include_once("../db.php");
    $conexion = new db();
    $conectar = $conexion->conectar();

    $user = $_POST['user'];

    $consulta = 'SELECT * FROM object';
    $pdo = $conectar->prepare($consulta);
    $pdo->execute();
    $json = array();
    while ($row = $pdo->fetch(PDO::FETCH_ASSOC)) {
        
        $params = array(
            ":ID_object" => $row['ID'],
            ":ID_user" => $user
        );

        $consulta2 = 'SELECT * FROM locked WHERE ID_object LIKE :ID_object AND ID_user LIKE :ID_user';
        $pdo2 = $conectar->prepare($consulta2);
        $pdo2->execute($params);
        $locked = $pdo2->fetchColumn();
        if(!empty($locked)){
            $isLocked=0;
        }else{
            $isLocked=1;
        }

        $consulta3 = 'SELECT * FROM equiped WHERE ID_object LIKE :ID_object AND ID_user LIKE :ID_user';
        $pdo3 = $conectar->prepare($consulta3);
        $pdo3->execute($params);
        $equiped = $pdo3->fetchColumn();
        if(empty($equiped)){
            $isEquiped=0;
        }else{
            $isEquiped=1;
        }

        $objeto = array (
            'ID' => $row['ID'],'type' => $row['type'],
            'ATK'=>$row['ATK'],'DEF'=>$row['DEF'],
            'HP'=>$row['HP'],'recoil'=>$row['heal'],
            'locked'=>$isLocked, 'equiped'=>$isEquiped
        );
        $json[] = $objeto; 
    }
    echo json_encode($json);
?>