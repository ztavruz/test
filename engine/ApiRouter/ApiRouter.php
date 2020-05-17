<?php


namespace Engine\ApiRouter;


class ApiRouter
{
    private $routes = [];

    public function __construct()
    {
        $this->add("/files/upload",       FilesController::class, "upload");
        $this->add("/files/display",      FilesController::class, "display");
        $this->add("/task/create",        TaskController::class,  "create");
        $this->add("/task/list",          TaskController::class,  "list");

    }

    public function add($url, $controller, $method, $level_access = "A")
    {
        $this->routes[$url] = [
            '_controller' => $controller,
            '_method' => $method,
            '_access' => $level_access
        ];

        $this->accessLevel[] = $level_access;
    }

    public function match(string $url)
    {

        foreach ($this->routes as $route => $data){
            if($route == $url){
                return $data;
            }
        }
    }

    public function addAccessLevel(string $level)
    {
        $this->accessLevel[] = $level;
    }

    public function deleteAccessLevel(string $delete)
    {
        foreach ($this->accessLevel as $key => $level){
            if($level == $delete)
            {
                unset($this->accessLevel[$key]);
            }
        }
    }
}