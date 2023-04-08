from django.db import models
from authentication.tenant.models import Tenant
from bills.models import Bill
from .enums import Month


# Create your models here.
class Payment(models.Model):
    objects = models.Manager()

    room_number = models.PositiveIntegerField()

    paid_amount = models.PositiveIntegerField()
    due_amount = models.PositiveIntegerField(default=0)
    remarks = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateField(auto_now_add=True)
    month = models.TextField(choices=Month.get_choices())
    bill = models.ForeignKey(Bill, on_delete=models.CASCADE)
