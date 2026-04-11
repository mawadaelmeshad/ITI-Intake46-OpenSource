from rest_framework import routers
from .views import BookViewSet

# Standard Router configuration
router = routers.DefaultRouter()
router.register(r'library', BookViewSet, basename='library')
