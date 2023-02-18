from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import TenantTokenObtainPairSerializer
from ..backends import TenantBackend


class TenantTokenObtainPairView(TokenObtainPairView):
    serializer_class = TenantTokenObtainPairSerializer
    authentication_backend = TenantBackend
