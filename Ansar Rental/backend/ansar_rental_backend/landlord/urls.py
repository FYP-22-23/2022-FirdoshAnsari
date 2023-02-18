from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LandlordViewSet

router = DefaultRouter()
router.register('', LandlordViewSet)

urlpatterns = [
    path('', include(router.urls))
]
