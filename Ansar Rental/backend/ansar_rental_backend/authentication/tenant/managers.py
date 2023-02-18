from django.contrib.auth.models import BaseUserManager


class TenantManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        raise Exception('You cannot create an user')

    def create_superuser(self, email, password, **extra_fields):
        raise Exception('You cannot create an admin')

    def create_tenant(self, email, password=None, **extra_fields):
        # del extra_fields['groups']
        # del extra_fields['user_permissions']
        groups = extra_fields.pop('groups')
        permissions = extra_fields.pop('user_permissions')
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        # user.groups.set(groups)
        # user.user_permissions.set(user_permissions=permissions)
        # user.save(using=self._db)
        return user
