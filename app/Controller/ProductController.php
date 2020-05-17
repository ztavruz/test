<?php


namespace App\Controller;

use App\Service\ProductService;

class ProductController
{
    private $service;

    public function __construct(ProductService $service)
    {
        $this->service = $service;

    }

}