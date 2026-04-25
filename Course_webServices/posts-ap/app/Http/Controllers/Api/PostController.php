<?php
// app/Http/Controllers/Api/PostController.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    use ApiResponse;

    // Public: GET /api/posts
    public function index()
    {
        return $this->success(Post::with('user')->latest()->get(), 'Posts fetched successfully');
    }

    // Public: GET /api/posts/{id}
    public function show($id)
    {
        $post = Post::with('user')->find($id);

        if (!$post) {
            return $this->error('Post not found', 404);
        }

        return $this->success($post, 'Post fetched successfully');
    }

    // Protected: POST /api/posts
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title'   => 'required|string|min:5',
            'content' => 'required|string',
        ]);

        if ($validator->fails()) {
            return $this->error('Validation Failed', 422, $validator->errors());
        }

        $post = Post::create([
            'title'   => $request->title,
            'content' => $request->content,
            'user_id' => Auth::id(),
        ]);

        return $this->success($post, 'Post created successfully', 201);
    }

    // Protected: PUT /api/posts/{id}
    public function update(Request $request, $id)
    {
        $post = Post::find($id);

        if (!$post) {
            return $this->error('Post not found', 404);
        }

        // 403: logged-in user doesn't own this post
        if ($post->user_id !== Auth::id()) {
            return $this->error('Forbidden: you do not own this post', 403);
        }

        $validator = Validator::make($request->all(), [
            'title'   => 'sometimes|string|min:5',
            'content' => 'sometimes|string',
        ]);

        if ($validator->fails()) {
            return $this->error('Validation Failed', 422, $validator->errors());
        }

        $post->update($request->only('title', 'content'));

        return $this->success($post, 'Post updated successfully');
    }

    // Protected: DELETE /api/posts/{id}
    public function destroy($id)
    {
        $post = Post::find($id);

        if (!$post) {
            return $this->error('Post not found', 404);
        }

        if ($post->user_id !== Auth::id()) {
            return $this->error('Forbidden: you do not own this post', 403);
        }

        $post->delete();

        return $this->success(null, 'Post deleted successfully');
    }
}