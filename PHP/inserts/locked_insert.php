<?php
    include_once("../db.php");
    $conexion = new db();
    $conectar = $conexion->conectar();

    $ID_user = $_POST['ID_user'];
    $ID_object = $_POST['ID_object'];
    
    $params = array(
        ":ID_user" => $ID_user,
        ":ID_object" => $ID_object
    );

    $consulta = 'INSERT INTO locked (ID_user, ID_object)SELECT :ID_user, :ID_object 
    WHERE NOT EXISTS (
      SELECT 1 FROM locked WHERE ID_user = :ID_user AND ID_object = :ID_object
    )';
    $pdo = $conectar->prepare($consulta);
    $pdo->execute($params);
    echo $pdo->rowCount();
?>