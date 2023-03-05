<?php

namespace App\Console\Commands;

use App\Interfaces\AppLoggingInterface;
use App\Traits\AppLoggingTrait;
use Symfony\Component\Console\Formatter\OutputFormatterStyle;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
abstract class BaseCommand extends \Symfony\Component\Console\Command\Command implements AppLoggingInterface
{
    use AppLoggingTrait;
    protected function initialize(InputInterface $input, OutputInterface $output)
    {
        $outputStyle = new OutputFormatterStyle('red', null, ['bold']);
        $output->getFormatter()->setStyle('error', $outputStyle);

        $outputStyle = new OutputFormatterStyle('yellow', null, ['bold']);
        $output->getFormatter()->setStyle('warning', $outputStyle);

        $outputStyle = new OutputFormatterStyle('green', null, ['bold']);
        $output->getFormatter()->setStyle('success', $outputStyle);

        $this->logSetOutput($output);
    }
}