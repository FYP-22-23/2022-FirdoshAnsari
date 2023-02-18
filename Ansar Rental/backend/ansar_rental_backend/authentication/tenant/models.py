from django.contrib.auth.models import AbstractUser, PermissionsMixin
from django.db import models


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

    monthly_room_rent = models.FloatField()
    monthly_water_rent = models.FloatField()
    room_number = models.CharField(max_length=10)
    guardian_name = models.CharField(max_length=100)
    guardian_contact_number = models.CharField(max_length=20)
    starting_electricity_units = models.FloatField()
    number_of_tenants = models.PositiveIntegerField()
    starting_date = models.DateField()
    notes = models.TextField(null=True, blank=True)
    document = models.FileField(upload_to='documents/', null=True, blank=True)
    photo = models.ImageField(upload_to='photos/', null=True, blank=True)
    is_tenant = models.BooleanField(default=True)
    email = models.EmailField(db_column='tenant_email', unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'monthly_room_rent', 'monthly_water_rent', 'room_number', 'guardian_name',
                       'guardian_contact_number', 'starting_electricity_units', 'number_of_tenants', 'starting_date']
