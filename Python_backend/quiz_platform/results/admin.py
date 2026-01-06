from django.contrib import admin
from .models import Result


@admin.register(Result)
class ResultAdmin(admin.ModelAdmin):
    list_display = ("user", "quiz_title", "score", "total_questions", "created_at")
    list_filter = ("created_at",)
    search_fields = ("user__username", "quiz_title")