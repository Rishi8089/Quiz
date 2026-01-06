from django.urls import path
from .views import register_api, login_api, logout_api

urlpatterns = [
    path("register/", register_api, name="register"),
    path("login/", login_api, name="login"),
    path("logout/", logout_api, name="logout"),
]
