from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response

from .serializers import TenantTokenObtainPairSerializer
from ..backends import TenantBackend
from django.contrib.auth.hashers import check_password


class TenantTokenObtainPairView(TokenObtainPairView):
    serializer_class = TenantTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        username = data['username']
        password = data['password']

        user = TenantBackend().authenticate(request, username=username, password=password)

        if not user:
            return Response({'error': 'Invalid username or password'})

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        response = Response(serializer.validated_data, status=200)
        return response
