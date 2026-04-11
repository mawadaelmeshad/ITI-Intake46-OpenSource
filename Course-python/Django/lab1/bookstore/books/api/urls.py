from django.urls import path, include
from .views import book_index_api, book_create_api, book_detail_api
from .routers import router

urlpatterns = [
    path('index/', book_index_api, name='api-book-index'),
    path('store/', book_create_api, name='api-book-create'),
    path('info/<int:pk>/', book_detail_api, name='api-book-detail'),
    
    path('', include(router.urls)),
]
