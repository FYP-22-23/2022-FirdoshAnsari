from datetime import datetime

from django.db import models

from payments.enums import Month


# Create your models here.
class Bill(models.Model):
    objects = models.Manager()

    room_number = models.PositiveBigIntegerField()
    month = models.TextField(choices=Month.get_choices())
    present_electricity_unit = models.PositiveIntegerField()
    previous_electricity_unit = models.PositiveIntegerField()
    due_amount = models.PositiveIntegerField(default=0)
    electricity_rate = models.PositiveIntegerField()
    remarks = models.CharField(max_length=255, default='', blank=True)
    discount = models.PositiveIntegerField(default=0)
    created_at = models.DateField(default=datetime.now())
