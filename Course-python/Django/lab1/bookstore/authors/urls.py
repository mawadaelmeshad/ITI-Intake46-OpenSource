from django.urls import path
from .views import AuthorListView, AuthorDetailView, AuthorCreateView, AuthorUpdateView, AuthorDeleteView

urlpatterns = [
    path('', AuthorListView.as_view(), name='authors.landing'),
    path('index/', AuthorListView.as_view(), name='authors.index'), # Keep both names for compatibility
    path('add/', AuthorCreateView.as_view(), name='authors.add'),
    path('<int:pk>/', AuthorDetailView.as_view(), name='authors.detail'),
    path('edit/<int:pk>/', AuthorUpdateView.as_view(), name='authors.edit'),
    path('delete/<int:pk>/', AuthorDeleteView.as_view(), name='authors.delete'),
]
