import json

from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import Owner
from .serializers import OwnerTokenObtainSerializer
from ..backends import OwnerBackend


class OwnerTokenObtainPairView(TokenObtainPairView):
    serializer_class = OwnerTokenObtainSerializer
    authentication_classes = (OwnerBackend,)
    permission_classes = ()

    def post(self, request, *args, **kwargs):
        data = request.data
        username = data['username']
        password = data['password']
        user = authenticate(request, username=username, password=password)

        if isinstance(user, User):
            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)
            response = Response(serializer.validated_data, status=200)
            return response

        self.authentication_classes = (OwnerBackend,)
        user = OwnerBackend().authenticate(request, username=username, password=password)

        if not user:
            return Response({'error': 'Invalid username or password'})

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        response = Response(serializer.validated_data, status=200)
        return response


@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def change_password(request):
    access = AccessToken(request.headers.get('Authorization').replace('Bearer ', ''))
    token = str(access.get_token_backend)
    i1 = token.find('{')
    i2 = token.find('}')
    string = token[i1:i2 + 1].replace("'", '"')
    new_dict = json.loads(string)

    user_id = new_dict['user_id']
    user = Owner.objects.filter(pk=user_id).first()

    if not user:
        user = User.objects.filter(pk=user_id).first()

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
