from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from authentication.backends import OwnerBackend
from authentication.owner.serializers import OwnerSerializer
from authentication.tenant.serializers import TenantSerializer


class SignupView(CreateAPIView):
    authentication_classes = [JWTAuthentication, OwnerBackend]
    authentication_backends = [JWTAuthentication, OwnerBackend]
    permission_classes = ()

    def post(self, request, *args, **kwargs):
        try:
            auth_user = request.user
            if not auth_user.is_authenticated:
                return Response({'detail': 'Invalid or expired token.'}, status=status.HTTP_401_UNAUTHORIZED)

            if isinstance(auth_user, User):  # if admin
                self.serializer_class = OwnerSerializer
                serializer = self.get_serializer(data=request.data)
                serializer.is_valid(raise_exception=True)
                serializer.validated_data['is_landlord'] = True
                serializer.validated_data['is_superuser'] = False
                serializer.validated_data['is_active'] = False
                serializer.validated_data['is_admin'] = False
                serializer.validated_data['groups'] = []
                serializer.validated_data['user_permissions'] = []
                print(serializer.validated_data)
                serializer.save()
                return Response({'success': True, 'message': 'created'}, status=status.HTTP_201_CREATED)

            if auth_user.is_landlord:
                self.serializer_class = TenantSerializer
                serializer = self.get_serializer(data=request.data)
                serializer.is_valid(raise_exception=True)
                serializer.validated_data['is_tenant'] = True
                serializer.save()
                return Response({'success': True, 'message': 'created'}, status=status.HTTP_201_CREATED)

            return Response({'detail': 'User is not authorized to access this endpoint.'},
                            status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            print(str(e), 'err')
            return Response({'detail': 'Invalid or expired token.'}, status=status.HTTP_401_UNAUTHORIZED)
