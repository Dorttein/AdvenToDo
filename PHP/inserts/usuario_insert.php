<?php
    include_once("../db.php");
    $conexion = new db();
    $conectar = $conexion->conectar();

    $user = $_POST['user'];
    $passwd = $_POST['passwd'];
    $passwordCripted = password_hash($passwd,PASSWORD_BCRYPT);

    $params = array(
        ":user" => $user,
        ":passwd" => $passwordCripted
    );

    $consulta = 'INSERT INTO usuario (id, login, password, action, HP_character, HP_enemy, ID_enemy) VALUES (null, :user, :passwd, 0, 0, 0, 0)';
    $pdo = $conectar->prepare($consulta);
    if ($pdo->execute($params)) {
        $params2 = array(
            ":user" => $user
        );
        $consulta2 = 'SELECT * FROM usuario WHERE login = :user';
        $pdo = $conectar->prepare($consulta2);
        $pdo->execute($params2);
        while ($row = $pdo->fetch(PDO::FETCH_ASSOC)) {
                $IDE=$row['ID'];
        }
        $params3 = array(
            ":IDE" => $IDE
        );
        $consulta3 = 'INSERT INTO `lista` (`ID`, `name`, `ID_user`) VALUES (null, "Mi Dia", :IDE);';
        $pdo = $conectar->prepare($consulta3);
        $pdo->execute($params3);
        $consulta4 = 'INSERT INTO `lista` (`ID`, `name`, `ID_user`) VALUES (null, "Tareas", :IDE);';
        $pdo = $conectar->prepare($consulta4);
        $pdo->execute($params3);
        echo "1";
    } else {
        echo "0";
    }
?>
