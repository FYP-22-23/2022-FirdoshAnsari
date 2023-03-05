from django.db import models
from authentication.tenant.models import Tenant

# Create your models here.
class Notification(models.Model):
    objects = models.Manager()

    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=255)
