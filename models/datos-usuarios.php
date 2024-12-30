<?php 

class misUsuarios {


    public function verUsuarios(){

        require_once 'conexion.php';
        $conexion = new Conexion();
        $consulta = "SELECT * FROM usuarios";
        $modules = $conexion->prepare($consulta);
        $modules->execute();
        $data = $modules->fetchAll(PDO::FETCH_ASSOC);
        return $data;
    }
}

