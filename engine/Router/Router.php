<?php

namespace Engine\Router;
use Engine\View\View;

class Router
{
    private $url;

    public function __construct()
    {
        $this->url = $this->url();

    }

    public function run()
    {
        var_dump($this->url);
       if ($this->pageExist())
       {
           $view = new View($this->url);
           return $view->render();
       }else
       {
        echo 'Страница не найдена';
       }
    }

    public function url()
    {
        $url = $_SERVER['REQUEST_URI'];
        $url = trim($url, '/');
        $url = preg_replace("#\?.*$#", null, $url);
        if ($url == '') {
            $url = 'main';
        }

        return $url;
    }

    public function pageExist()
    {
        $views = array_diff(scandir(VIEW_DIR), ['.','..']);


        foreach ($views as $view) {
            if ($view == $this->url) {
                return true;
            }
        }

        return false;
    }
}

