from django.conf import settings
from django.contrib.auth.backends import ModelBackend

from authentication.owner.models import Owner
from authentication.tenant.models import Tenant
from rest_framework_simplejwt.tokens import AccessToken
import json


class OwnerBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            user = Owner.objects.get(username=username)
            if user.check_password(password):
                return user
        except Owner.DoesNotExist:
            return None

    @classmethod
    def authenticate_header(cls, request):
        return 'Bearer realm="api", error="invalid_credentials", error_description="Invalid email or password"'


class TenantBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            user = Tenant.objects.get(username=username)
            if user and user.check_password(password):
                return user
            
            return None
        except Tenant.DoesNotExist:
            return None
        except:
            return self.get_tenant(request)
        
    def get_tenant(self, request):
        access = AccessToken(request.headers.get('Authorization').replace('Bearer ', ''))
        token = str(access.get_token_backend)
        i1 = token.find('{')
        i2 = token.find('}')
        string = token[i1:i2+1].replace("'", '"')
        new_dict = json.loads(string)
        
        user_id = new_dict['user_id']
        auth_user = Tenant.objects.filter(pk=user_id).first()
        return auth_user

        
    @classmethod
    def authenticate_header(cls, request):
        return 'Bearer realm="api", error="invalid_credentials", error_description="Invalid email or password"'
