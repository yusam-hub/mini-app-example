<?php

return [
    'serverDefault' => 'default',

    'servers' => [
        'default' => [
            'connection' => [
                'bindAddress' => app_ext_env('WS_PING_PONG_HOST', '127.0.0.1'),
                'bindPort' => app_ext_env('WS_PING_PONG_PORT', '9100'),
                'bindPullAddress' => app_ext_env('WS_PING_PONG_PULL_HOST', '127.0.0.1'),
                'bindPullPort' => app_ext_env('WS_PING_PONG_PULL_PORT', '9101'),
            ],
            'incomingMessagesClass' => [
                \YusamHub\WebSocket\WsServer\IncomingMessages\PingPongIncomingMessage::class,
            ],
            'externalMessagesClass' => [
                \YusamHub\WebSocket\WsServer\ExternalMessages\PingPongExternalMessage::class,
            ],
        ],
    ],

    'clientDefault' => 'default',
    'clients' => [
        'default' => [
            'connection' => [
                'bindAddress' => app_ext_env('WS_PING_PONG_HOST', '127.0.0.1'),
                'bindPort' => app_ext_env('WS_PING_PONG_PORT', '9100'),
            ],
            'outgoingMessagesClass' => [
                \YusamHub\WebSocket\WsClient\OutgoingMessages\PingOutgoingMessage::class,
            ],
            'incomingMessagesClass' => [
                \YusamHub\WebSocket\WsClient\IncomingMessages\PongIncomingMessage::class,
            ],
        ],
    ],

    'externalDefault' => 'default',
    'externals' => [
        'default' => [
            'connection' => [
                'bindPullAddress' => app_ext_env('WS_PING_PONG_PULL_HOST', '127.0.0.1'),
                'bindPullPort' => app_ext_env('WS_PING_PONG_PULL_PORT', '9101'),
            ],
        ],
    ]

];
