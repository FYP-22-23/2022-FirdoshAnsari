from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LandlordViewSet, RoomNumbersView, TenantsForRoomView

router = DefaultRouter()
router.register('', LandlordViewSet)

urlpatterns = [
    path('roomNumbers', RoomNumbersView.as_view()),
    path('tenants_for_room/', TenantsForRoomView.as_view()),
    path('', include(router.urls)),
]
