from django.urls import path
from . import views


urlpatterns = [
        path('', views.main, name = 'main'), # open "main" page on '127.0.0.1:8000/'
]
