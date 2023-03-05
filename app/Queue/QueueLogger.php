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
     * @throws \RedisException
     */
    public function __construct(array $config = [])
    {
        $this->config = $config;
        $redisConfig = (array) app_ext_config("redis.connections." .  app_ext_config("redis.default"));
        $this->redisExt = new RedisExt($redisConfig??[]);
    }

    /**
     * @throws \RedisException
     */
    public function log($level, $message, array $context = [])
    {
        $this->redisExt->queuePush(self::QUEUE_NAME, new QueueLoggerJob($level, $message, $context, $this->config['extra']??[]));
    }

}