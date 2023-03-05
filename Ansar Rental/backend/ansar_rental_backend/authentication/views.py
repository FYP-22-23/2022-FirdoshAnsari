from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from authentication.backends import OwnerBackend
from authentication.owner.serializers import OwnerSerializer
from authentication.tenant.serializers import TenantSerializer
from rest_framework_simplejwt.tokens import AccessToken
from .owner.models import Owner
import json


class SignupView(CreateAPIView):
    authentication_classes = []
    authentication_backends = []
    permission_classes = ()

    def post(self, request, *args, **kwargs):
        try:
            auth_user = request.user
            print(auth_user)
            if not auth_user.is_authenticated:
                # authentication_classes = [OwnerBackend, ]
                # authentication_backends = [OwnerBackend, ]
                access = AccessToken(request.headers.get('Authorization').replace('Bearer ', ''))
                token = str(access.get_token_backend)
                i1 = token.find('{')
                i2 = token.find('}')
                string = token[i1:i2+1].replace("'", '"')
                new_dict = json.loads(string)
                user_id = new_dict['user_id']
                auth_user = User.objects.filter(pk=user_id).first()
                if not auth_user:
                    auth_user = Owner.objects.filter(pk=user_id).first()

            if isinstance(auth_user, User):  # if admin
                self.serializer_class = OwnerSerializer
                serializer = self.get_serializer(data=request.data)
                serializer.is_valid(raise_exception=True)
                serializer.validated_data['is_landlord'] = True
                serializer.validated_data['is_superuser'] = False
                serializer.validated_data['is_active'] = False
                serializer.validated_data['is_admin'] = False
                serializer.validated_data['groups'] = []
                serializer.validated_data['is_active'] = True
                serializer.validated_data['user_permissions'] = []
                serializer.save()
                return Response({'success': True, 'message': 'created'}, status=status.HTTP_201_CREATED)

            if isinstance(auth_user, Owner):
                self.serializer_class = TenantSerializer
                serializer = self.get_serializer(data=request.data)
                serializer.is_valid(raise_exception=True)
                serializer.validated_data['is_tenant'] = True
                serializer.validated_data['groups'] = []
                serializer.validated_data['is_active'] = True
                serializer.validated_data['user_permissions'] = []
                serializer.save()
                return Response({'success': True, 'message': 'created'}, status=status.HTTP_201_CREATED)

            return Response({'detail': 'User is not authorized to access this endpoint.'},
                            status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            print(str(e), 'err')
            return Response({'detail': 'Invalid or expired token.'}, status=status.HTTP_401_UNAUTHORIZED)
