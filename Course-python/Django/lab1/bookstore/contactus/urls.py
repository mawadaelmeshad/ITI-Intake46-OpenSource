from django.urls import path
from contactus.views import contact

urlpatterns = [
    path('', contact, name='contactus.contact'),
]
