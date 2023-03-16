<?php

namespace App\WebSocket\Ext;

use App\WebSocket\WebSocketServer;
use YusamHub\WebSocket\Interfaces\WebSocketConnectionInterface;
class JsRtcPeerConnections
{
    /**
     * @var WebSocketServer
     */
    protected WebSocketServer $webSocketServer;

    /**
     * @var array
     */
    protected array $connections = [];

    /**
     * @param WebSocketServer $webSocketServer
     */
    public function __construct(WebSocketServer $webSocketServer)
    {
        $this->webSocketServer = $webSocketServer;
    }

    /**
     * @return void
     */
    public function clearAll(): void
    {
        $this->connections = [];
    }

    /**
     * @param WebSocketConnectionInterface $wsConnection
     * @return void
     */
    public function connectionAttach(WebSocketConnectionInterface $wsConnection): void
    {
        $wsConnection->setConnectionAttribute('connectionResourceId', $wsConnection->getConnectionResourceId());
    }

    /**
     * @param WebSocketConnectionInterface $wsConnection
     * @param string $rtcLocalPeerUuid
     * @return void
     */
    public function registerPeerUuid(WebSocketConnectionInterface $wsConnection, string $rtcLocalPeerUuid): void
    {
        $this->connections[$wsConnection->getConnectionResourceId()] = [
            'wsConnection' => $wsConnection,
            'rtcLocalPeerUuid' => $rtcLocalPeerUuid,
        ];
        $this->doChangeRegisteredPeers();
    }

    /**
     * @return array
     */
    protected function getRegisteredPeers(): array
    {
        $out = [];
        foreach($this->connections as $connectionResourceId => $item) {
            $out[] = $item['rtcLocalPeerUuid'];
        }
        return $out;
    }

    /**
     * @return void
     */
    protected function doChangeRegisteredPeers(): void
    {
        $registeredPeers = $this->getRegisteredPeers();

        foreach($this->connections as $connectionResourceId => $item) {
            /**
             * @var WebSocketConnectionInterface $wsConnection
             */
            $wsConnection = $item['wsConnection'];
            $wsConnection->sendMessage([
                'rtcType' => 'TjsRtcPeer',
                'rtcFromPeerUuid' => $item['rtcLocalPeerUuid'],
                'rtcToPeerUuid' => $item['rtcLocalPeerUuid'],
                'rtcData' => [
                    'type' => 'rtc-local-registered-peers',
                    'registeredPeers' => $registeredPeers,
                ],
            ]);
        }
    }

    /**
     * @param WebSocketConnectionInterface $wsConnection
     * @return void
     */
    public function unRegisterPeerUuid(WebSocketConnectionInterface $wsConnection): void
    {
        if (isset($this->connections[$wsConnection->getConnectionResourceId()])) {
            unset($this->connections[$wsConnection->getConnectionResourceId()]);
            $this->doChangeRegisteredPeers();
        }
    }
}
