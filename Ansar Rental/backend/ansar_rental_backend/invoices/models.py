from django.db import models
from payments.enums import Month
from authentication.tenant.models import Tenant

# Create your models here.
class Invoice(models.Model):
    objects = models.Manager()

    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE)

    month = models.TextField(choices=Month.get_choices())
    total_amount = models.PositiveBigIntegerField()
    consumed_electricity_unit = models.PositiveBigIntegerField(default=0)
    due_amount = models.PositiveIntegerField(default=0)
    is_pending = models.BooleanField(default=True)