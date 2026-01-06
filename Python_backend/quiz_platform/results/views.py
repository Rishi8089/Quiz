from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
)
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from rest_framework import status

from .models import Result


# -------------------------------------------------------
# SAVE RESULT  (POST)
# -------------------------------------------------------
@api_view(["POST"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])   # 🔒 require login
def save_result(request):
    data = request.data

    quiz_title = data.get("quiz_title")
    score = data.get("score")
    total_questions = data.get("total_questions")

    # --------- VALIDATION ----------
    if not quiz_title:
        return Response(
            {"error": "quiz_title is required"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # ⚠️ important: 0 must be allowed → check is None
    if score is None or total_questions is None:
        return Response(
            {"error": "score and total_questions are required"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # --------- SAVE ----------
    result = Result.objects.create(
        user=request.user,                # 🔥 logged-in user stored
        quiz_title=quiz_title,
        score=score,
        total_questions=total_questions,
    )

    percentage = (result.score / result.total_questions) * 100

    return Response(
        {
            "message": "Result saved successfully",
            "quiz_title": result.quiz_title,
            "score": result.score,
            "total_questions": result.total_questions,
            "percentage": round(percentage, 2),
            "created_at": result.created_at,
        },
        status=status.HTTP_201_CREATED,
    )


# -------------------------------------------------------
# RESULT HISTORY (GET)
# -------------------------------------------------------
@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def result_history(request):
    results = Result.objects.filter(user=request.user).order_by("-created_at")

    history = []
    for r in results:
        percentage = (r.score / r.total_questions) * 100
        history.append(
            {
                "quiz_title": r.quiz_title,
                "score": r.score,
                "total_questions": r.total_questions,
                "percentage": round(percentage, 2),
                "created_at": r.created_at,
            }
        )

    return Response(history, status=status.HTTP_200_OK)
