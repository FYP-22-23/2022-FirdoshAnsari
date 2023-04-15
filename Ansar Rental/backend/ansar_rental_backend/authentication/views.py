import json
import socket

import psutil
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.shortcuts import render
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from jwt.utils import force_bytes
from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import AccessToken

from authentication.owner.serializers import OwnerSerializer
from authentication.tenant.serializers import TenantSerializer
from tenant.send_mail import send_mail_mailgun
from .owner.models import Owner
from .tenant.models import Tenant


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
                string = token[i1:i2 + 1].replace("'", '"')
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
            return Response({'detail': str(e)}, status=status.HTTP_401_UNAUTHORIZED)


class ResetPasswordView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, uidb64, token):
        try:
            email = urlsafe_base64_decode(uidb64).decode()
            user = get_user_model().objects.get(email=email)
        except:
            user = None

        if user is not None and default_token_generator.check_token(user, token):
            return render(request, 'reset_password.html', {'user_name': user.username})
        else:
            return Response('Reset link expired', 401)

    def post(self, request, uidb64, token):
        email = urlsafe_base64_decode(uidb64).decode()
        user = Tenant.objects.filter(email=email).first()

        if not user:
            user = Owner.objects.filter(email=email).first()

        if user is None or not default_token_generator.check_token(user, token):
            return Response('Reset link expired', 401)

        password = request.data.get('password')
        confirm_password = request.data.get('confirm_password')

        if not password or not confirm_password:
            return Response('Password and Confirm Password are required', 401)
        if password != confirm_password:
            return Response('Password and Confirm Password do not match', 401)

        user.set_password(password)
        user.save()
        return Response('Password reset successfully')


class SendPasswordResetLinkView(APIView):
    permission_classes = (AllowAny,)
    authentication_classes = ()

    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response('Email is required', 401)

        user = Tenant.objects.filter(email=email).first()
        if not user:
            user = Owner.objects.filter(email=email).first()
        if not user:
            return Response('Invalid email address', 401)

        # Generate password reset token
        token = default_token_generator.make_token(user)
        email = urlsafe_base64_encode(force_bytes(user.email))

        # Build password reset link
        host = request.get_host()

        if host.startswith('127.0.0.1') or host.startswith('localhost'):
            ip_lhost = next(
                (addr.address for net_if,
                addrs in psutil.net_if_addrs().items()
                 for addr in addrs if addr.family == socket.AF_INET
                 and addr.address.startswith('192')
                 ),
                None
            )
            host = f'{ip_lhost}:{request.get_port()}'
        reset_link = f"{host}:{request.get_port()}/reset-password/{email}/{token}/"

        # Send password reset link to email
        send_mail_mailgun(
            email=user.email,
            subject='Password Reset',
            body=f'Please click the link to reset your password: {reset_link}/>'
        )

        return Response({'message': 'Password reset link sent to email'}, status=status.HTTP_200_OK)
