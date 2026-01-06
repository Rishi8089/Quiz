from django.db import models
from django.contrib.auth.models import User

class Result(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    quiz_title = models.CharField(max_length=100)
    score = models.IntegerField()
    total_questions = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):   # ✅ FIXED
        return f"{self.user.username} - {self.quiz_title}"
