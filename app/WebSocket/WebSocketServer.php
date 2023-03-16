<?php

namespace App\WebSocket;

use App\WebSocket\Ext\JsRtcPeerConnections;
use YusamHub\WebSocket\Interfaces\WebSocketConnectionInterface;
use YusamHub\WebSocket\Interfaces\WebSocketDaemonInterface;

class WebSocketServer extends \YusamHub\WebSocket\WebSocketServer
{
    protected JsRtcPeerConnections $jsRtcPeerConnections;

    /**
     * @param WebSocketDaemonInterface $webSocketDaemon
     */
    public function __construct(WebSocketDaemonInterface $webSocketDaemon)
    {
        parent::__construct($webSocketDaemon);
        $this->jsRtcPeerConnections = new JsRtcPeerConnections($this);
    }

    /**
     * @param WebSocketConnectionInterface $wsConnection
     * @return void
     */
    protected function connectionAttach(WebSocketConnectionInterface $wsConnection): void
    {
        parent::connectionAttach($wsConnection);
        $this->jsRtcPeerConnections->connectionAttach($wsConnection);
    }

    /**
     * @param WebSocketConnectionInterface $wsConnection
     * @return void
     */
    protected function connectionDetach(WebSocketConnectionInterface $wsConnection): void
    {
        $this->jsRtcPeerConnections->unRegisterPeerUuid($wsConnection);
        parent::connectionDetach($wsConnection);
    }

    /**
     * @return void
     */
    protected function signalShouldQuitAll(): void
    {
        $this->jsRtcPeerConnections->clearAll();
        parent::signalShouldQuitAll();
    }
}