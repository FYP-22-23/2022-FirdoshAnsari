from django.urls import path, include
from rest_framework import routers
from .views import BillViewSet

router = routers.DefaultRouter()
router.register('', BillViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
