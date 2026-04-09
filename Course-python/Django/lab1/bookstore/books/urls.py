from django.urls import path
from . import views

urlpatterns = [
    path('index/', views.index, name='books_index'),
    path('book_info/<int:book_id>/', views.book_info, name='book_info'),
    path('create/', views.book_create, name='book_create'),
    path('<int:book_id>/update/', views.book_update, name='book_update'),
    path('<int:book_id>/delete/', views.book_delete, name='book_delete'),
]