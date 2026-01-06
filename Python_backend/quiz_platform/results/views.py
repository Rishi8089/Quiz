from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Result
from .serializers import ResultSerializer   # ✅ FIXED


@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def save_result(request):
    data = request.data

    if not data.get("quiz_title"):
        return Response(
            {"error": "quiz_title is required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    Result.objects.create(
        user=request.user,
        quiz_title=data["quiz_title"],
        score=data["score"],
        total_questions=data["total_questions"],
    )

    return Response(
        {"message": "Result saved successfully"},
        status=status.HTTP_201_CREATED
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def result_history(request):
    results = Result.objects.filter(user=request.user).order_by("-created_at")
    serializer = ResultSerializer(results, many=True)  # ✅ Works now
    return Response(serializer.data, status=status.HTTP_200_OK)
