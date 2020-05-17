<?php


namespace App\Database;

use \RedBeanPHP\R as R;

class Connection
{
    private $server;
    private $host;

    private $dbname;
    private $login;
    private $password;


    protected $patch;

    public function __construct(){

        $this->server = $_SERVER["SERVER_NAME"];
        $this->host = $_SERVER["SERVER_ADDR"];


        $this->hostMonitoring();

//        var_dump($_SERVER["SERVER_NAME"]);

        if (!R ::testConnection()) {
            R::setup("mysql:host={$this->host};dbname={$this->dbname}",
                "{$this->login}",
                "{$this->password}");
        }
    }

    private function hostMonitoring()
    {
        switch ($this->server) {

            case "ztavruz.loc":
                    $this->dbname = "testbase";
                    $this->login = "root";
                    $this->password = "123";
                    break;

            case "qwerty":
                $this->dbname   = "qwerty";
                $this->login    = "qwerty";
                $this->password = "qwerty";
                break;
        }
    }

}