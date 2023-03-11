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
     * @param DaemonConsole $daemonConsole
     * @param bool $isLoop
     * @param string $queue
     */
    public function __construct(DaemonConsole $daemonConsole, bool $isLoop, string $queue)
    {
        $this->redisExt = app_ext_redis_global()->newRedisExt();
        parent::__construct($daemonConsole, $isLoop, $queue);
    }

    /**
     * @return DaemonJobInterface|null
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