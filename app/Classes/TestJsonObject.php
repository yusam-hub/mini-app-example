<?php

namespace App\Classes;

use YusamHub\JsonExt\JsonObject;

class TestJsonObject extends JsonObject
{
    public ?int $id = null;
    protected ?string $data = null;

    /**
     * @return string|null
     */
    public function getData(): ?string
    {
        return $this->data;
    }

    /**
     * @param string|null $data
     * @return void
     */
    public function setData(?string $data): void
    {
        $this->data = $data;
    }

}