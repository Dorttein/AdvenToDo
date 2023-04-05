<?php
    class db {
        private $_conn = NULL;
        public function __construct(){}
        public static function conectar() {
            try {
		        $_conn = new PDO("mysql:host=localhost;dbname=prueba2",'root','');
                //$_conn->exec("set names utf8");
                // echo "Conexión realizada a la base de datos prueba2 :)";
            }catch (PDOException $e){
                echo "Error :( ".$e->getMessage();
            }
            return $_conn;
        }
    }
// $Abd = new db();
// $Abd->conectar();
?>