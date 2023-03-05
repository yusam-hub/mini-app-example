<?php

namespace App\HttpServer\Interfaces;

use App\Interfaces\AppLoggingInterface;

interface HttpServerInterface extends AppLoggingInterface
{
    public function isTesting(): bool;
}