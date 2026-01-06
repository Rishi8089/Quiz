from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.authentication import BasicAuthentication
from rest_framework.response import Response


@api_view(['POST'])
@authentication_classes([])   # 🔥 disables CSRF
@permission_classes([AllowAny])
def register_api(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if not username or not password:
        return Response({"error": "Username and password required"}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists"}, status=400)

    User.objects.create_user(
        username=username,
        email=email,
        password=password
    )

    return Response({"message": "User registered successfully"})


@api_view(['POST'])
@authentication_classes([])   # 🔥 disables SessionAuthentication
@permission_classes([AllowAny])
def login_api(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is None:
        return Response({"error": "Invalid credentials"}, status=401)

    login(request, user)  # session-based login
    return Response({"message": "Login successful"})



@api_view(['POST'])
@authentication_classes([])   # 🔥 disables CSRF
@permission_classes([AllowAny])
def logout_api(request):
    logout(request)
    return Response({"message": "Logged out successfully"})
