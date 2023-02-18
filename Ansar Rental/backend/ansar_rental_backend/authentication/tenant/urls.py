from django.urls import path

from .views import *

urlpatterns = [
    path('login/', TenantTokenObtainPairView.as_view())
]
