from django.contrib.auth.models import BaseUserManager


class OwnerManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        raise Exception('You cannot create an user')

    def create_superuser(self, email, password, **extra_fields):
        raise Exception('You cannot create an admin')

    def create_owner(self, email, password=None, **extra_fields):
        groups = extra_fields.pop('groups')
        permissions = extra_fields.pop('user_permissions')

        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        # user.groups.set(groups)
        # user.permissions.set(permissions)
        # user.save(using=self._db)
        return user
