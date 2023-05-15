<?php
    include_once("../db.php");
    $conexion = new db();
    $conectar = $conexion->conectar();

    $ID = $_POST['ID'];
    $lista = $_POST['lista'];

    $params1 = array(
        ":lista" => $lista
    );

    $params2 = array(
        ":IDE" => $ID,
        ":lista" => $lista
    );

    $consulta = 'SELECT * FROM lista WHERE name = :lista';
    $pdo = $conectar->prepare($consulta);
    $pdo->execute($params1);

    if ($pdo->rowCount() > 0) {
        echo "0";
    } else {
        $consulta2 = 'INSERT INTO `lista` (`ID`, `name`, `ID_user`) VALUES (null, :lista, :IDE);';
        $pdo = $conectar->prepare($consulta2);
        if ($pdo->execute($params2)) {
            echo "1";
        } else {
            echo "0";
        }
    }
?>