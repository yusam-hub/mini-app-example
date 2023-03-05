<?php

namespace App\Traits;

use Symfony\Component\Console\Output\OutputInterface;
use YusamHub\AppExt\Logger\Logger;

trait AppLoggingTrait
{
    protected ?OutputInterface $appLoggingOutput = null;
    protected ?Logger $appLoggingLogger = null;

    public function logSetLogger(Logger $logger): void
    {
        $this->appLoggingLogger = $logger;
    }

    public function logGetLogger(): ?Logger
    {
        return $this->appLoggingLogger;
    }

    public function logSetOutput(?OutputInterface $output): void
    {
        $this->appLoggingOutput = $output;
    }
    public function logGetOutput(): ?OutputInterface
    {
        return $this->appLoggingOutput;
    }

    public function logDebug(string $message, array $context = []): void
    {
        if (!is_null($this->appLoggingLogger)) {
            $this->appLoggingLogger->debug($message, $context);
        }
        $this->logMessage('DEBUG', $message, $context);
    }

    public function logNotice(string $message, array $context = []): void
    {
        if (!is_null($this->appLoggingLogger)) {
            $this->appLoggingLogger->notice($message, $context);
        }
        $this->logMessage('NOTICE', $message, $context);
    }

    public function logAlert(string $message, array $context = []): void
    {
        if (!is_null($this->appLoggingLogger)) {
            $this->appLoggingLogger->alert($message, $context);
        }
        $this->logMessage('ALERT', $message, $context);
    }

    public function logEmergency(string $message, array $context = []): void
    {
        if (!is_null($this->appLoggingLogger)) {
            $this->appLoggingLogger->emergency($message, $context);
        }
        $this->logMessage('EMERGENCY', $message, $context);
    }

    public function logCritical(string $message, array $context = []): void
    {
        if (!is_null($this->appLoggingLogger)) {
            $this->appLoggingLogger->critical($message, $context);
        }
        $this->logMessage('CRITICAL', $message, $context);
    }

    public function logWarning(string $message, array $context = []): void
    {
        if (!is_null($this->appLoggingLogger)) {
            $this->appLoggingLogger->warning($message, $context);
        }
        $this->logMessage('WARNING', $message, $context);
    }

    public function logError(string $message, array $context = []): void
    {
        if (!is_null($this->appLoggingLogger)) {
            $this->appLoggingLogger->error($message, $context);
        }
        $this->logMessage('ERROR', $message, $context);
    }

    public function logInfo(string $message, array $context = []): void
    {
        if (!is_null($this->appLoggingLogger)) {
            $this->appLoggingLogger->info($message, $context);
        }
        $this->logMessage('INFO', $message, $context);
    }

    protected function logMessage(string $typ, string $message, array $context = []): void
    {
        $lineMessage = $typ . ': ' . $message . (!empty($context) ? ' ' . json_encode($context, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) : '');

        if (!is_null($this->appLoggingOutput)) {
            $this->appLoggingOutput->writeln($lineMessage);
            return;
        }

        echo $lineMessage . PHP_EOL;
    }
}