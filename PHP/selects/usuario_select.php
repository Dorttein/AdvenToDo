<?php
    include_once("../db.php");
    $conexion = new db();
    $conectar = $conexion->conectar();

    $user = $_POST['user'];
    $passwd = $_POST['passwd'];

    $params = array(
        ":user" => $user
    );

    $consulta = 'SELECT * FROM usuario WHERE login = :user';
    $pdo = $conectar->prepare($consulta);
    $pdo->execute($params);
    $json = array();
    while ($row = $pdo->fetch(PDO::FETCH_ASSOC)) {
        if(password_verify($passwd,$row['password']) != False){
            $usuario = array (
                'ID' => $row['ID'],'login' => $row['login'],
                'passwd'=>$row['password'],'action'=>$row['action'],
                'HP_character'=>$row['HP_character'],'HP_enemy'=>$row['HP_enemy'],
                'ID_enemy'=>$row['ID_enemy']
            );
            $json[] = $usuario;
        }
    }
    echo json_encode($json);
?>