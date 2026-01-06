from django.urls import path
from .views import save_result, result_history

urlpatterns = [
    path("save/", save_result, name="save-result"),
    path("history/", result_history, name="result-history"),
]