<?php

namespace App\Model;

use YusamHub\AppExt\Models\JsTable\JsTableQuery;
use YusamHub\AppExt\Models\JsTable\JsTableResponse;
use YusamHub\AppExt\Models\JsTable\JsTableRow;
use YusamHub\Helper\Numeric;

class EmailJsTableRow extends JsTableRow
{
    const PAGE_MAX = 100;
    const LIMIT_MIN = 1;
    const LIMIT_MAX = 60;

    public int $id = 0;
    public string $email = '';
    public string $createdAt = '';
    public ?string $modifiedAt = null;

    public static function createExamples()
    {
        for($i=1; $i < 1000; $i++) {
            app_ext_db_global()->pdoExt()->insert(TABLE_TMP_EMAILS, [
                'id' => null,
                'email' => sprintf('email%d@email%d.loc', $i, $i)
            ]);
        }
    }

    /**
     * @param JsTableQuery $query
     * @return JsTableResponse
     */
    public static function getEmailsJsTableResponse(
        JsTableQuery $jsTableQuery
    ): JsTableResponse
    {
        $tableResponse = new JsTableResponse(static::class);
        $tableResponse->query->page = Numeric::clamp($jsTableQuery->page, 1, self::PAGE_MAX);
        $tableResponse->query->limit = Numeric::clamp($jsTableQuery->limit, self::LIMIT_MIN, self::LIMIT_MAX);
        $tableResponse->query->sortFieldName = $jsTableQuery->sortFieldName;
        $tableResponse->query->sortDirection = $jsTableQuery->sortDirection;

        $query = <<<MYSQL
select 
    *
from 
    tmp_emails
:where_condition
:order_condition        
limit :offset, :limit
MYSQL;
        $offset = ($tableResponse->query->page - 1) * $tableResponse->query->limit;

        $where_conditions = [];
        $where_conditions_bindings = [];

        foreach($jsTableQuery->filter as $field => $value) {
            if (!empty($value)) {
                $where_conditions[] = sprintf('%s = ?', $field);
                $where_conditions_bindings[] = $value;
            }
        }

        $where_condition = !empty($where_conditions) ? 'where ' . implode(" and ", $where_conditions) : '';

        $order_conditions = [];
        if (!empty($tableResponse->query->sortFieldName) && !empty($tableResponse->query->sortDirection) && in_array($tableResponse->query->sortDirection, ['asc','desc'])) {
            $order_conditions[] = sprintf('%s %s', $tableResponse->query->sortFieldName, $tableResponse->query->sortDirection);
        }

        $order_condition = !empty($order_conditions) ? 'order by ' . implode(", ", $order_conditions) : '';

        $rows = app_ext_db_global()
            ->pdoExt()
            ->fetchAll(
                strtr(
                    $query,
                    [
                        ':where_condition' => $where_condition,
                        ':order_condition' => $order_condition,
                        ':offset' => $offset,
                        ':limit' => $tableResponse->query->limit
                    ]
                ),
                $where_conditions_bindings
            );

        $queryBuilder = app_ext_db_global()->pdoExt()->queryBuilder();
        $queryBuilder
            ->select('*')
            ->from(TABLE_TMP_EMAILS);
        foreach($jsTableQuery->filter as $field => $value) {
            if (!empty($value)) {
                $queryBuilder->andWhere([$field => $value]);
            }
        }
        if (!empty($tableResponse->query->sortFieldName) && !empty($tableResponse->query->sortDirection) && in_array($tableResponse->query->sortDirection, ['asc','desc']))
        {
            $queryBuilder->orderBy([
                $tableResponse->query->sortFieldName => $tableResponse->query->sortDirection
            ]);
        }
        $queryBuilder->offset(($tableResponse->query->page - 1) * $tableResponse->query->limit);
        $queryBuilder->limit($tableResponse->query->limit);
        //$rows2 = $queryBuilder->fetchAll();

        $tableResponse->data->import($rows);
        $tableResponse->detail->count = count($rows);

        return $tableResponse;
    }
}
