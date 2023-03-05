<?php

namespace App\Interfaces;

use Symfony\Component\Console\Output\OutputInterface;
use YusamHub\AppExt\Logger\Logger;

interface AppLoggingInterface
{
    public function logSetLogger(Logger $logger): void;

    public function logGetLogger(): ?Logger;

    public function logSetOutput(?OutputInterface $output): void;

    public function logGetOutput(): ?OutputInterface;

    public function logDebug(string $message, array $context = []): void;

    public function logError(string $message, array $context = []): void;

    public function logInfo(string $message, array $context = []): void;

    public function logAlert(string $message, array $context = []): void;

    public function logNotice(string $message, array $context = []): void;

    public function logEmergency(string $message, array $context = []): void;

    public function logWarning(string $message, array $context = []): void;

    public function logCritical(string $message, array $context = []): void;
}