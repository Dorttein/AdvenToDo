<?php
    include_once("../db.php");
    $conexion = new db();
    $conectar = $conexion->conectar();

    $ID1_object = $_POST['ID1'];
    $ID2_object = $_POST['ID2'];
    $ID3_object = $_POST['ID3'];
    $ID_user = $_POST['ID_user'];
    
    $params = array(
        ":ID1_object" => $ID1_object,
        ":ID2_object" => $ID2_object,
        ":ID3_object" => $ID3_object
    );

    $params2 = array(
        ":ID_user" => $ID_user
    );

    $ataque=4;
    $defensa=0;
    $recoil=0;
	$heal=0;

    $consulta = 'SELECT * FROM object WHERE ID LIKE :ID1_object OR ID LIKE :ID2_object OR ID LIKE :ID3_object';
    $pdo = $conectar->prepare($consulta);
    $pdo->execute($params);
    $json = array();
    while ($row = $pdo->fetch(PDO::FETCH_ASSOC)) {
        $ataque+=$row["ATK"];
        $defensa+=$row["DEF"];
        $recoil+=$row["recoil"];
        $heal+=$row["heal"];
    }

    $consulta2 = 'SELECT enemy.damage FROM enemy INNER 
    JOIN usuario ON enemy.ID = usuario.ID_enemy
    WHERE usuario.ID = :ID_user';
    $pdo2 = $conectar->prepare($consulta2);
    $pdo2->execute($params2);
    while ($row = $pdo2->fetch(PDO::FETCH_ASSOC)) {
        $damage=$row["damage"];
    }

    $json = [
        "ataque" => $ataque,
        "defensa" => $defensa,
        "recoil" => $recoil,
        "heal" => $heal,
        "damage" => $damage
    ];
    echo json_encode($json);
?>