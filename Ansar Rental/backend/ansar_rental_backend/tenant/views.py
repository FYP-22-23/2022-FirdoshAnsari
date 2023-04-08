from rest_framework.viewsets import ModelViewSet

from authentication.tenant.models import Tenant
from .serializers import TenantSerializer
from authentication.backends import OwnerBackend


class TenantViewSet(ModelViewSet):
    queryset = Tenant.objects.all()
    serializer_class = TenantSerializer
    authentication_classes = (OwnerBackend, )
    permission_classes = ()
    authentication_backends = (OwnerBackend, )
