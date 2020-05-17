<?php

namespace Engine\View;

class View
{
    private $page;

    public function __construct($page)
    {
        $this->page = $page;
    }

    public function libsCss()
    {
        $items = scandir(LIBS_DIR . '/css');
        $items = array_diff($items, ['.','..']);

        $links = "";

        foreach ($items as $item) {
            $links .= "<link rel=\"stylesheet\" href=\"/libs/css/{$item}\">";
        }
        return $links;
    }

    public function libsJs()
    {
        $items = scandir(LIBS_DIR . '/js');
        $items = array_diff($items, ['.','..']);

        $scripts = "";

        foreach ($items as $item) {
            $scripts .= "<script src=\"/libs/js/{$item}\"></script>";
        }
        return $scripts;
    }

    public function fileCss()
    {
        $css = "<link rel='stylesheet' href='/view/{$this->page}/styles.css'>";
        return $css;
    }

    public function fileJs()
    {
        $js = "<script src='/view/{$this->page}/scripts.js'></script>";
        return $js;
    }
    

    public function render()
    {
        $page = VIEW_DIR . "/{$this->page}/index.html";

        ob_start();
        require $page;
        $page = ob_get_clean();
        
        require VIEW_DIR . "/layout.php";
    }
}