<?php
    include_once("../db.php");
    $conexion = new db();
    $conectar = $conexion->conectar();

    $ID_user = $_POST['ID_user'];

    $params = array(
        ":ID_user" => $ID_user
    );

    $consulta = 'SELECT * FROM locked WHERE ID_user LIKE :ID_user';
    $pdo = $conectar->prepare($consulta);
    $pdo->execute($params);
    $unlocked = array();
    while ($row = $pdo->fetch(PDO::FETCH_ASSOC)) {
        $id_object = $row['ID_object'];

        if ($id_object > 0 && $id_object < 11) {
            if (!isset($unlocked[1])) {
                $unlocked[1] = $id_object;
            } else {
                $unlocked[1] = max($unlocked[1], $id_object);
            }
        } elseif ($id_object > 10 && $id_object < 21) {
            if (!isset($unlocked[2])) {
                $unlocked[2] = $id_object;
            } else {
                $unlocked[2] = max($unlocked[2], $id_object);
            }
        } elseif ($id_object > 20 && $id_object <= 30) {
            if (!isset($unlocked[3])) {
                $unlocked[3] = $id_object;
            } else {
                $unlocked[3] = max($unlocked[3], $id_object);
            }
        }
    }
    echo json_encode($unlocked);
?>