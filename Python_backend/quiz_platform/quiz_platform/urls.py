from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView

urlpatterns = [
    # redirect root URL to React frontend
    path('', RedirectView.as_view(url='http://localhost:5173/', permanent=False)),

    # your APIs
    path('api/accounts/', include('accounts.urls')),
    path('api/quizzes/', include('quizzes.urls')),
    path('api/results/', include('results.urls')),

    # Django admin
    path('admin/', admin.site.urls),
]
