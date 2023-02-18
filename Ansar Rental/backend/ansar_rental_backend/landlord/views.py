from rest_framework.viewsets import ModelViewSet

from authentication.owner.models import Owner
from .serializers import OwnerSerializer


class LandlordViewSet(ModelViewSet):
    queryset = Owner.objects.all()
    serializer_class = OwnerSerializer
