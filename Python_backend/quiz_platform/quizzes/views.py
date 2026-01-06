

# Create your views here.
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Quiz, Question, Option
from .serializers import QuizSerializer, AnswerSubmissionSerializer


class QuizListView(generics.ListAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer


class QuizDetailView(generics.RetrieveAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer


class QuizSubmitView(APIView):
    def post(self, request, pk):
        quiz = Quiz.objects.get(pk=pk)
        submissions = request.data  # Expect list of {"question_id": 1, "option_id": 3}

        score = 0
        total_points = 0

        for submission in submissions:
            serializer = AnswerSubmissionSerializer(data=submission)
            serializer.is_valid(raise_exception=True)

            question_id = serializer.validated_data['question_id']
            option_id = serializer.validated_data['option_id']

            try:
                question = Question.objects.get(id=question_id, quiz=quiz)
                option = Option.objects.get(id=option_id, question=question)
                total_points += question.points
                if option.is_correct:
                    score += question.points
            except (Question.DoesNotExist, Option.DoesNotExist):
                return Response({"error": "Invalid question or option"}, status=status.HTTP_400_BAD_REQUEST)

        return Response({
            "score": score,
            "total": total_points,
            "percentage": round((score / total_points) * 100, 2) if total_points > 0 else 0
        })

# Create your views here.
