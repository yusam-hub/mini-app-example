<?php

namespace App\HttpServer\Middleware;

use App\HttpServer\Interfaces\HttpServerInterface;
use Fig\Http\Message\StatusCodeInterface;
use Psr\Http\Message\ServerRequestInterface;
use React\EventLoop\Loop;
use React\Http\Message\Response;
use Symfony\Component\HttpFoundation\Request;

class RoutesMiddleware
{
    protected HttpServerInterface $httpServer;

    public function __construct(HttpServerInterface $httpServer)
    {
        $this->httpServer = $httpServer;
    }

    /**
     * @param ServerRequestInterface $request
     * @return mixed
     */
    public function __invoke(ServerRequestInterface $request)
    {
        $symphonyRequest = new Request(
            $request->getQueryParams(),
            (array) $request->getParsedBody(),
            [],
            $request->getCookieParams(),
            $request->getUploadedFiles(),
            array_merge(
                $request->getServerParams(),
                [
                    'REQUEST_METHOD' => $request->getMethod(),
                    'HTTP_HOST' => $request->getUri()->getHost(),
                    'REQUEST_SCHEME' => $request->getUri()->getScheme(),
                    'QUERY_STRING' => $request->getUri()->getQuery(),
                    'REQUEST_URI' => $request->getUri()->getPath() . $request->getUri()->getQuery(),
                    'DOCUMENT_URI' => $request->getUri()->getPath(),
                ]
            ),
            $request->getBody()->getContents()
        );

        $controllerKernel = new \App\Http\ControllerKernel(
            app()->getRootDir() . '/routes',
            $symphonyRequest,
            'default.php',
            true
        );

        try {

            return $controllerKernel->fetchResponse();

        } catch (\Throwable $e) {
            $response = [
                'error' => [
                    'message' => $e->getMessage(),
                    'code' => $e->getCode(),
                    'file' => $e->getFile(),
                    'line' => $e->getLine(),
                    'class' => get_class($e),
                ],
            ];
            return Response::plaintext(print_r($response, true))->withStatus(417);
        }
    }
}