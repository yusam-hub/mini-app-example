<?php

namespace App\Queue\Jobs;

use YusamHub\Daemon\Daemon;
use YusamHub\Daemon\DaemonJob;

class QueueLoggerJob extends DaemonJob
{
    public string $level;
    public string $message;
    public array $context;
    public array $extra;

    public function __construct(string $level, string $message, array $context = [], array $extra = [])
    {
        $this->level = $level;
        $this->message = $message;
        $this->context = $context;
        $this->extra = $extra;
    }

    public function handle(Daemon $daemon): void
    {
        app_ext_logger($this->extra['channel']??'app')->log($this->level, $this->message, $this->context);
    }
}