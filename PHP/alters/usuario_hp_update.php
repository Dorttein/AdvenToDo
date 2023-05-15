<?php
    include_once("../db.php");
    $conexion = new db();
    $conectar = $conexion->conectar();

    $ID = $_POST['ID_user'];

    $damageDeal = $_POST['damageDeal'];
    $damageRecibed = $_POST['damageRecibed'];

    $params = array(
        ":ID" => $ID,
        ":damageDeal" => $damageDeal,
        ":damageRecibed" => $damageRecibed
    );
    $params2 = array(
        ":ID" => $ID
    );
    $json = array();
    // "IF(columna > 100, 100, columna)";
    $consulta = 'UPDATE usuario SET 
        HP_enemy = HP_enemy - :damageDeal,
        HP_character = IF(
            HP_character <= 0 OR HP_character > 100, 100, HP_character - :damageRecibed
            )
        WHERE ID = :ID
    ';
    $pdo = $conectar->prepare($consulta);
    $pdo->execute($params);

    $consulta2 = 'SELECT action, HP_character, HP_enemy FROM usuario WHERE ID = :ID';
    $pdo2 = $conectar->prepare($consulta2);
    if ($pdo2->execute($params2)) {
        while ($row = $pdo2->fetch(PDO::FETCH_ASSOC)) {
            $json = [
                "action" => $row["action"],
                "HP_character" => $row["HP_character"],
                "HP_enemy" => $row["HP_enemy"]
            ];
        }
    }
    echo json_encode($json);;
?>