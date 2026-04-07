from django.urls import path
from authors.views import landing

urlpatterns = [
    path('', landing, name='authors.landing'),
]
