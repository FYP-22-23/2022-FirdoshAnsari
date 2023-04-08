from django.contrib.auth.models import AbstractUser, PermissionsMixin
from django.db import models
from .managers import TenantManager

from datetime import datetime


class Tenant(AbstractUser, PermissionsMixin):
    groups = models.ManyToManyField(
        'auth.Group',
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        related_name='tenants',
        related_query_name='tenant',
    )

    user_permissions = models.ManyToManyField(
        'auth.Permission',
        blank=True,
        help_text='Specific permissions for this user.',
        related_name='tenants_permissions',
        related_query_name='tenant_permissions',
    )

    created_at = models.DateTimeField(auto_now_add=True)

    username = models.CharField(max_length=100, unique=True)
    monthly_room_rent = models.FloatField()
    monthly_water_rent = models.FloatField()
    room_number = models.CharField(max_length=10)
    guardian_name = models.CharField(max_length=100)
    fcm_token = models.CharField(max_length=255, null=True)
    guardian_contact_number = models.CharField(max_length=20)
    starting_electricity_units = models.FloatField()
    number_of_tenants = models.PositiveIntegerField()
    starting_date = models.DateField(default=datetime.now())
    notes = models.TextField(null=True, blank=True)
    document = models.FileField(upload_to='documents/', null=True, blank=True)
    photo = models.ImageField(upload_to='photos/', null=True, blank=True)
    is_tenant = models.BooleanField(default=True)
    email = models.EmailField(db_column='tenant_email', unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    contact = models.PositiveIntegerField()
    address = models.CharField(max_length=255)
    date_of_birth = models.DateField()

    objects = TenantManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['monthly_room_rent', 'monthly_water_rent', 'room_number', 'guardian_name',
                       'guardian_contact_number', 'starting_electricity_units', 'number_of_tenants', 'starting_date',
                       'first_name', 'last_name', 'contact', 'address', 'date_of_birth']
