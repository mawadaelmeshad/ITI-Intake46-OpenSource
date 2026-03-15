<x-layout>
    <x-slot name="title">Edit Post</x-slot>

    <div class="max-w-3xl mx-auto">
        <div class="bg-white rounded-lg shadow overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-200">
                <h2 class="text-xl font-semibold text-gray-800">Edit Post</h2>
            </div>

            <div class="px-6 py-4">
                <!-- IMPORTANT: PUT method for updates -->
                <form method="POST" action="{{ route('posts.update', $post['id']) }}">
                    @csrf
                    @method('PUT')  <!-- This tells Laravel it's an UPDATE request -->

                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            name="title"
                            value="{{ $post['title'] }}"  <!-- Pre-filled value -->
                            class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 py-2 px-3 border"
                        >
                    </div>

                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            name="description"
                            rows="5"
                            class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 py-2 px-3 border"
                        >{{ $post['description'] }}</textarea>  <!-- Pre-filled -->
                    </div>

                    <div class="mb-6">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Post Creator</label>
                        <select name="creator" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 py-2 px-3 border bg-white">
                            <option value="1" {{ $post['creator']['name'] == 'Ahmed' ? 'selected' : '' }}>Ahmed</option>
                            <option value="2" {{ $post['creator']['name'] == 'Mohamed' ? 'selected' : '' }}>Mohamed</option>
                            <option value="3" {{ $post['creator']['name'] == 'Ali' ? 'selected' : '' }}>Ali</option>
                        </select>
                    </div>

                    <div class="flex justify-end">
                        <button type="submit" class="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</x-layout>