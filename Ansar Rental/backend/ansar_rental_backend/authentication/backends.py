from django.contrib.auth.backends import ModelBackend

from authentication.owner.models import Owner
from authentication.tenant.models import Tenant


class OwnerBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            user = Owner.objects.get(username=request.data['username'])
            if user.check_password(password):
                return user
        except Owner.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            return Owner.objects.get(pk=user_id)
        except Owner.DoesNotExist:
            return None

    @classmethod
    def authenticate_header(cls, request):
        return 'Bearer realm="api", error="invalid_credentials", error_description="Invalid email or password"'


class TenantBackend(ModelBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
        try:
            user = Tenant.objects.get(email=email)
            if user.check_password(password):
                return user
        except Tenant.DoesNotExist:
            return None
