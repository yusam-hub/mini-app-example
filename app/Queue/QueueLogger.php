<?php

namespace App\Queue;

use App\Queue\Jobs\QueueLoggerJob;
use YusamHub\AppExt\Logger\Logger;
use YusamHub\RedisExt\RedisExt;

class QueueLogger extends Logger
{
    const QUEUE_NAME = 'queue-logger';
    protected RedisExt $redisExt;

    protected array $config;

    /**
     * @param array $config
     */
    public function __construct(array $config = [])
    {
        $this->config = $config;
        $this->redisExt = app_ext_redis_global()->newRedisExt();
    }

    /**
     * @param $level
     * @param $message
     * @param array $context
     * @return void
     */
    public function log($level, $message, array $context = [])
    {
        $this->redisExt->queuePush(self::QUEUE_NAME, new QueueLoggerJob($level, $message, $context, $this->config['extra']??[]));
    }

}