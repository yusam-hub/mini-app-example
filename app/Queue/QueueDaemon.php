<?php

namespace App\Queue;

use YusamHub\Daemon\DaemonConsole;
use YusamHub\Daemon\DaemonQueue;
use YusamHub\Daemon\Interfaces\DaemonJobInterface;
use YusamHub\RedisExt\RedisExt;

class QueueDaemon extends DaemonQueue
{
    protected RedisExt $redisExt;

    /**
     * @throws \RedisException
     */
    public function __construct(DaemonConsole $daemonConsole, bool $isLoop, string $queue)
    {
        $config = (array) app_ext_config("redis.connections." .  app_ext_config("redis.default"));
        $this->redisExt = new RedisExt($config??[]);
        parent::__construct($daemonConsole, $isLoop, $queue);
    }

    /**
     * @throws \RedisException
     */
    protected function getNextJob(): ?DaemonJobInterface
    {
        $o = $this->redisExt->queueShift($this->queue);
        if ($o instanceof DaemonJobInterface) {
            return $o;
        }
        return null;
    }
}