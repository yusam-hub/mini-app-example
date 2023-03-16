<?php

return [
    'serverDefault' => 'default',

    'servers' => [
        'default' => [
            'connection' => [
                'bindAddress' => app_ext_env('WS_SERVER_BIND_ADDRESS', '0.0.0.0'),
                'bindPort' => app_ext_env('WS_SERVER_BIND_PORT', '9100'),
                'bindPullAddress' => app_ext_env('WS_SERVER_BIND_PULL_ADDRESS', '0.0.0.0'),
                'bindPullPort' => app_ext_env('WS_SERVER_BIND_PULL_PORT', '9101'),
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
                'bindAddress' => app_ext_env('WS_CLIENT_BIND_ADDRESS', '0.0.0.0'),
                'bindPort' => app_ext_env('WS_CLIENT_BIND_PORT', '9100'),
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
                'bindPullAddress' => app_ext_env('WS_CLIENT_BIND_PULL_ADDRESS', '0.0.0.0'),
                'bindPullPort' => app_ext_env('WS_CLIENT_BIND_PULL_PORT', '9101'),
            ],
        ],
    ]

];
