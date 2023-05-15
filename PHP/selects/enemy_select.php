<?php
    include_once("../db.php");
    $conexion = new db();
    $conectar = $conexion->conectar();

    $ID_user = $_POST['user'];

    $params = array(
        ":ID_user" => $ID_user
    );

    $consulta = 'SELECT * FROM usuario WHERE ID LIKE :ID_user';
    $pdo = $conectar->prepare($consulta);
    $pdo->execute($params);
    while ($row = $pdo->fetch(PDO::FETCH_ASSOC)) {
        
        $params2 = array(
            ":ID_enemy" => $row['ID_enemy']
        );

        $consulta2 = 'SELECT loot FROM enemy WHERE ID LIKE :ID_enemy';
        $pdo2 = $conectar->prepare($consulta2);
        $pdo2->execute($params2);
        $loot = $pdo2->fetchColumn();
        if(!empty($loot)){
            echo $loot;
        }else{
            echo "0";
        }
    }
?>