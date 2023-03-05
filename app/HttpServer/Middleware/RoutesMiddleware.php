<?php

namespace App\HttpServer\Middleware;

use App\HttpServer\HttpServer;
use Psr\Http\Message\ServerRequestInterface;
use React\Http\Message\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use YusamHub\AppExt\SymfonyExt\ControllerKernel;

class RoutesMiddleware
{
    protected HttpServer $httpServer;

    public function __construct(HttpServer $httpServer)
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

        $this->httpServer->debug("REQUEST: " . $symphonyRequest->getMethod() . ' ' . $symphonyRequest->getRequestUri(), [
            'query' => $request->getQueryParams(),
            'params' => $symphonyRequest->request->all(),
        ]);

        $controllerKernel = new ControllerKernel(
            app()->getRootDir() . '/routes',
            $symphonyRequest,
            'default.php',
            true
        );

        try {

            $response = $controllerKernel->fetchResponse();

            $this->httpServer->debug(sprintf("RESPONSE (%d): %s", $response->getStatusCode(), $response->getBody()->getContents()));

            return $response;

        } catch (\Throwable $e) {

            $responseStatusCode = 500;
            $responseStatusMessage = "Internal Server Error";

            $this->httpServer->error(sprintf("RESPONSE (%d): %s", $responseStatusCode, $responseStatusMessage), [
                'error' => [
                    'message' => $e->getMessage(),
                    'code' => $e->getCode(),
                    'file' => $e->getFile(),
                    'line' => $e->getLine(),
                    'class' => get_class($e),
                ],
            ]);

            return Response::plaintext($responseStatusMessage)->withStatus($responseStatusCode);
        }
    }
}