import json

from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import Tenant
from .serializers import TenantTokenObtainPairSerializer
from ..backends import TenantBackend


class TenantTokenObtainPairView(TokenObtainPairView):
    serializer_class = TenantTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        username = data['username']
        password = data['password']

        user = TenantBackend().authenticate(request, username=username, password=password)

        if not user:
            return Response({'error': 'Invalid username or password'}, 401)

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        response = Response(serializer.validated_data, status=200)
        return response


@api_view(['POST'])
@permission_classes([AllowAny])
@authentication_classes([])
def change_password(request):
    access = AccessToken(request.headers.get('Authorization').replace('Bearer ', ''))
    token = str(access.get_token_backend)
    i1 = token.find('{')
    i2 = token.find('}')
    string = token[i1:i2 + 1].replace("'", '"')
    new_dict = json.loads(string)

    user_id = new_dict['user_id']
    user = Tenant.objects.filter(pk=user_id).first()

    old_password = request.data.get('old_password')
    new_password = request.data.get('new_password')
    confirm_password = request.data.get('confirm_password')

    if not (old_password and new_password and confirm_password):
        return Response({'error': 'All fields are required.'}, status=400)

    if new_password != confirm_password:
        return Response({'error': 'New password and confirmation password do not match.'}, status=400)

    if not user.check_password(old_password):
        return Response({'error': 'Invalid old password.'}, status=400)

    user.set_password(new_password)
    user.save()

    return Response({'success': 'Password changed successfully.'})
