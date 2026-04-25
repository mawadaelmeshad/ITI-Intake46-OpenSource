<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChatController extends Controller
{
    public function chat(Request $request)
    {
        // validation
        $request->validate([
            'message' => 'required|string'
        ]);

        // send to n8n
        $response = Http::post('https://mawada.app.n8n.cloud/webhook/chat', ['message' => $request->message]);


        if ($response->failed()) {
            return response()->json([
                'error' => 'AI service failed'
            ], 500);
        }


        return response()->json([
            'reply' => $response->json('reply')
        ]);
    }
}
