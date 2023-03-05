<?php

namespace App\Classes;

class PdoExt extends \YusamHub\DbExt\PdoExt
{
    protected ?string $connectionName;

    /**
     * @param string|null $connectionName
     */
    public function __construct(?string $connectionName = null)
    {
        $this->connectionName = $connectionName;
        if (is_null($this->connectionName)) {
            $this->connectionName = app_ext_config("database.default");
        }
        $this->pdo = app_create_pdo($this->connectionName);

        parent::__construct($this->pdo);
    }

    /**
     * @param string $sql
     * @param array $bindings
     * @return void
     */
    protected function debugLog(string $sql, array $bindings): void
    {
        app_ext_logger()->debug('[DB:'.strtoupper($this->connectionName) . "]: " . $sql, $bindings);
    }
}