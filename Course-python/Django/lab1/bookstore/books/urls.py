from django.contrib import admin
from django.urls import path, include

from books.views import index, book_info

urlpatterns = [
    # books
    path('index/', index, name='books.index'),
    path('book_info/<int:book_id>/', book_info, name='books.book_info'),
]