from django.contrib import admin
from .models import Quiz, Question, Option


class OptionInline(admin.TabularInline):
    model = Option
    extra = 4


class QuestionInline(admin.TabularInline):
    model = Question
    extra = 2
    inlines = [OptionInline]  # Options nested inside questions


@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    inlines = [QuestionInline]
    list_display = ['title', 'duration_minutes', 'created_at', 'created_by']
    search_fields = ['title']


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    inlines = [OptionInline]
    list_display = ['text', 'quiz', 'points'] 



# Register your models here.