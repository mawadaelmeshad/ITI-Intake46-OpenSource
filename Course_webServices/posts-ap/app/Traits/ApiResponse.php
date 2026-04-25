<?php
// app/Traits/ApiResponse.php

namespace App\Traits;

trait ApiResponse
{
    protected function success($data, string $message = '', int $code = 200)
    {
        return response()->json([
            'success' => true,
            'data'    => $data,
            'message' => $message,
        ], $code);
    }

    protected function error(string $message, int $code, $errors = null)
    {
        $response = ['success' => false, 'message' => $message];
        if ($errors) {
            $response['errors'] = $errors;
        }
        return response()->json($response, $code);
    }
}