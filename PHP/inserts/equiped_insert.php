<?php
    include_once("../db.php");
    $conexion = new db();
    $conectar = $conexion->conectar();

    $ID_user = $_POST['user'];

    $wpEquiped = $_POST['wpEquiped'];
    $hlEquiped = $_POST['hlEquiped'];
    $shEquiped = $_POST['shEquiped'];

    $params = array(
        ":ID_user" => $ID_user
    );
    $params2 = array(
        ":ID_user" => $ID_user,
        ":wpEquiped" => $wpEquiped
    );
    $params3 = array(
        ":ID_user" => $ID_user,
        ":hlEquiped" => $hlEquiped
    );
    $params4 = array(
        ":ID_user" => $ID_user,
        ":shEquiped" => $shEquiped
    );

    $consulta = 'DELETE FROM equiped WHERE ID_user LIKE :ID_user;';
    $pdo = $conectar->prepare($consulta);
    if ($pdo->execute($params)) {
        if($wpEquiped!=0){
            $consulta2 = 'INSERT INTO `equiped` (`ID_user`, `ID_object`) VALUES (:ID_user, :wpEquiped);';
            $pdo2 = $conectar->prepare($consulta2);
            $pdo2->execute($params2);
        }
        if($hlEquiped!=0){
            $consulta3 = 'INSERT INTO `equiped` (`ID_user`, `ID_object`) VALUES (:ID_user, :hlEquiped);';
            $pdo3 = $conectar->prepare($consulta3);
            $pdo3->execute($params3);
        }
        if($shEquiped!=0){
            $consulta4 = 'INSERT INTO `equiped` (`ID_user`, `ID_object`) VALUES (:ID_user, :shEquiped);';
            $pdo4 = $conectar->prepare($consulta4);
            $pdo4->execute($params4);
        }
        echo "1";
    } else {
        echo "0";
    }
?>