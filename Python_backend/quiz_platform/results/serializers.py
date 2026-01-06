from rest_framework import serializers
from .models import Result


class ResultSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = Result
        fields = [
            "id",
            "username",
            "quiz_title",
            "score",
            "total_questions",
            "created_at",
        ]