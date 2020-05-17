<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . "/vendor/autoload.php";
require_once __DIR__ . "/engine/Config/const.php";
$routes = require_once __DIR__ . "/engine/Config/routes.php";

use Engine\Container\Container;
use Engine\Router\Router;
use Engine\ApiRouter\ApiRouter;

$url = $_SERVER['REQUEST_URI'];

if(preg_match("#/app#", $url))
{
    $container = new Container();
    $api = new ApiRouter();
    $api->match($url);

    $controller = $container->get($api['controller']);
    $method = $api['method'];
    $response = $controller->method();

}else
{
    $router = new Router();
    $router->run();
}







