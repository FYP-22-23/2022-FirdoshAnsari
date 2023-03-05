from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from datetime import datetime

from ansar_rental_backend import settings
from .managers import OwnerManager


class Owner(AbstractBaseUser, PermissionsMixin):
    groups = models.ManyToManyField(
        'auth.Group',
        blank=True,
        null=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        related_name='owners',
        related_query_name='owner',
    )

    user_permissions = models.ManyToManyField(
        'auth.Permission',
        null=True,
        blank=True,
        help_text='Specific permissions for this user.',
        related_name='owners_permissions',
        related_query_name='owner_permissions',
    )

    created_at = models.DateTimeField(auto_now_add=True)

    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_landlord = models.BooleanField(default=False)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    objects = OwnerManager()

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True


class LandlordOutstandingToken(models.Model):
    id = models.BigAutoField(primary_key=True, serialize=False)
    user = models.ForeignKey(
        Owner, on_delete=models.SET_NULL, null=True, blank=True
    )

    jti = models.CharField(unique=True, max_length=255)
    token = models.TextField()

    created_at = models.DateTimeField(null=True, blank=True)
    expires_at = models.DateTimeField()

    class Meta:
        abstract = (
                "rest_framework_simplejwt.token_blacklist" not in settings.INSTALLED_APPS
        )
        ordering = ("user",)

    def __str__(self):
        return "Token for {} ({})".format(
            self.user,
            self.jti,
        )
