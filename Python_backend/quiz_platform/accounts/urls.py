from django.urls import path
from .views import login_api, register_api, logout_api

urlpatterns = [
    path("login/", login_api),
    path("register/", register_api),
    path("logout/", logout_api),
]
