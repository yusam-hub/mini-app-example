<?php

namespace App\Classes;

use Psr\Log\LoggerInterface;
use YusamHub\AppExt\Logger\Logger;

class Logging
{
    protected static ?Logging $instance = null;

    /**
     * @return Logging|null
     */
    public static function instance(): ?Logging
    {
        if (is_null(self::$instance)) {

            self::$instance = new static();
        }

        return self::$instance;
    }

    /**
     * @var Logger[]
     */
    protected array $channels = [];

    /**
     * @param string|null $channel
     * @param array $extra
     * @return LoggerInterface
     */
    public function logger(?string $channel = null, array $extra = []): LoggerInterface
    {
        if (is_null($channel)) {
            $channel = app_ext_config('logging.default');
        }

        if (!isset($this->channels[$channel])) {
            $class = app_ext_config('logging.channels.'.$channel.'.class');
            $config = app_ext_config('logging.channels.'.$channel.'.config');
            $config['extra'] = $extra;
            $this->channels[$channel] = new $class($config);
        }

        return $this->channels[$channel];
    }

}