from django.db.models.signals import post_save
from django.dispatch import receiver
from bills.models import Bill
from .models import Invoice
from authentication.tenant.models import Tenant


@receiver(post_save, sender=Bill)
def create_invoice(sender, instance, created, **kwargs):
    if created:
        tenants = Tenant.objects.filter(room_number=instance.room_number)
        tenant_ = tenants.first()
        for tenant in tenants:
            consumed_electricity_unit = instance.present_electricity_unit - instance.previous_electricity_unit
            total_unit = consumed_electricity_unit * instance.electricity_rate

            due_amount = instance.due_amount
            total_amount = total_unit + tenant_.monthly_room_rent + tenant.monthly_water_rent \
                           + due_amount - instance.discount
            Invoice.objects.create(
                tenant=tenant,
                month=instance.month,
                total_amount=total_amount,
                consumed_electricity_unit=consumed_electricity_unit,
                due_amount=due_amount,
                is_pending=True
            )
