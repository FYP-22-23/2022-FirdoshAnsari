from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from authentication.owner.models import Owner
from authentication.tenant.models import Tenant
from .serializers import OwnerSerializer


class LandlordViewSet(ModelViewSet):
    queryset = Owner.objects.all()
    serializer_class = OwnerSerializer


class RoomNumbersView(APIView):
    permission_classes = ()
    authentication_classes = ()

    def get(self, request, format=None):
        room_numbers = map(lambda t: int(t.room_number), Tenant.objects.all())
        res = list(set(room_numbers))
        return Response(res)


class TenantsForRoomView(APIView):
    permission_classes = ()
    authentication_classes = ()

    def get(self, request):
        rooms = []
        for room_number in map(lambda t: t.room_number, Tenant.objects.all()):
            room = Tenant.objects.filter(room_number=room_number).first()
            tenants_count = room.number_of_tenants
            rooms.append({
                'room_number': int(room_number),
                'tenants': tenants_count
            })
        return Response(rooms)
