from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken


# ---------------------------
# REGISTER
# ---------------------------
@api_view(["POST"])
def register_api(request):
    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:
        return Response({"error": "Username & password required"}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({"error": "User already exists"}, status=400)

    user = User.objects.create_user(username=username, password=password)

    return Response({"message": "User registered successfully"}, status=201)


# ---------------------------
# LOGIN  → returns JWT tokens
# ---------------------------
@api_view(["POST"])
def login_api(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)

    if user is None:
        return Response({"error": "Invalid username or password"}, status=401)

    refresh = RefreshToken.for_user(user)

    return Response(
        {
            "message": "Login successful",
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "is_superuser": user.is_superuser,
        },
        status=200,
    )


# ---------------------------
# LOGOUT (client just deletes token)
# ---------------------------
@api_view(["POST"])
def logout_api(request):
    return Response({"message": "Logged out"}, status=200)
