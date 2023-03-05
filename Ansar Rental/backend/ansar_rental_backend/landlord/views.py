from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response

from authentication.owner.models import Owner
from .serializers import OwnerSerializer
from rest_framework.decorators import api_view, permission_classes
from authentication.tenant.models import Tenant
from rest_framework.views import APIView


class LandlordViewSet(ModelViewSet):
    queryset = Owner.objects.all()
    serializer_class = OwnerSerializer


class RoomNumbersView(APIView):
    permission_classes = ()
    authentication_classes = ()

    def get(self, request, format=None):
        room_numbers = map(lambda t : int(t.room_number),Tenant.objects.all())
        res = list(set(room_numbers))
        return Response(res)
