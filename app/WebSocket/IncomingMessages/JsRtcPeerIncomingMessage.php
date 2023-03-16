<?php

namespace App\WebSocket\IncomingMessages;


use App\WebSocket\Ext\JsRtcPeerConnections;

use YusamHub\Helper\DotArray;
use YusamHub\WebSocket\WsServer\IncomingMessages\BaseIncomingMessage;

class JsRtcPeerIncomingMessage extends BaseIncomingMessage
{
    protected ?JsRtcPeerConnections $jsRtcPeerConnections = null;

    protected DotArray $dotArrayMsg;

    public function setWebSocketMessage(string $msg, array $arrayMsg): void
    {
        parent::setWebSocketMessage($msg, $arrayMsg);
        $this->dotArrayMsg = new DotArray($this->arrayMsg);
    }

    /**
     * @return JsRtcPeerConnections
     */
    protected function getJsRtcPeerConnections(): JsRtcPeerConnections
    {
        if ($this->jsRtcPeerConnections === null) {
            $this->jsRtcPeerConnections = $this->wsConnection->getWebSocketServer()->getProperty('jsRtcPeerConnections');
        }
        return $this->jsRtcPeerConnections;
    }

    /**
     * @return bool
     */
    public function validate(): bool
    {
        return
            $this->dotArrayMsg->has('rtcType') && $this->dotArrayMsg->get('rtcType') === 'TjsRtcPeer'
            &&
            $this->dotArrayMsg->has('rtcFromPeerUuid')
            &&
            $this->dotArrayMsg->has('rtcToPeerUuid')
            &&
            $this->dotArrayMsg->has('rtcData');
    }

    /**
     * @return void
     */
    public function execute(): void
    {
        if ($this->dotArrayMsg->has('rtcData.type') && $this->dotArrayMsg->get('rtcData.type') === 'rtc-local-peer-uuid-update') {
            $this->wsConnection->setConnectionAttribute('rtcLocalPeerUuid', $this->dotArrayMsg->get('rtcFromPeerUuid'));
            $this->getJsRtcPeerConnections()->registerPeerUuid($this->wsConnection, $this->dotArrayMsg->get('rtcFromPeerUuid'));
            return;
        }
        $this->wsConnection->getWebSocketServer()->broadcastMessageByAttribute([
            'rtcType' => $this->dotArrayMsg->get('rtcType'),
            'rtcFromPeerUuid' => $this->dotArrayMsg->get('rtcFromPeerUuid'),
            'rtcToPeerUuid' => $this->dotArrayMsg->get('rtcToPeerUuid'),
            'rtcData' => $this->dotArrayMsg->get('rtcData'),
        ], 'rtcLocalPeerUuid', $this->dotArrayMsg->get('rtcToPeerUuid'));
    }
}
