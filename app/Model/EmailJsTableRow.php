<?php

namespace App\Model;

use YusamHub\AppExt\Models\JsTable\JsTableQuery;
use YusamHub\AppExt\Models\JsTable\JsTableResponse;
use YusamHub\AppExt\Models\JsTable\JsTableRow;
use YusamHub\Helper\Numeric;

class EmailJsTableRow extends JsTableRow
{
    const PAGE_MAX = 100;
    const LIMIT_MIN = 5;
    const LIMIT_MAX = 60;

    public int $id = 0;
    public string $email = '';

    /**
     * @param JsTableQuery $query
     * @return JsTableResponse
     */
    public static function getEmailsJsTableResponse(
        JsTableQuery $query
    ): JsTableResponse
    {
        $tableResponse = new JsTableResponse(static::class);
        $tableResponse->query->page = Numeric::clamp($query->page, 1, self::PAGE_MAX);
        $tableResponse->query->limit = Numeric::clamp($query->limit, self::LIMIT_MIN, self::LIMIT_MAX);
        $tableResponse->query->sortFieldName = $query->sortFieldName;
        $tableResponse->query->sortDirection = $query->sortDirection;

        $rows = [
            [
                'id' => 1,
                'email' => 'test1@test1.loc'
            ],
            [
                'id' => 2,
                'email' => 'test2@test2.loc'
            ]
        ];
        $tableResponse->data->import($rows);
        $tableResponse->detail->count = count($rows);

        return $tableResponse;
    }
}
