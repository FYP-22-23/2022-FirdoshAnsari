from django.urls import path

from .views import *

urlpatterns = [
    path('login/', OwnerTokenObtainPairView.as_view()),
]
