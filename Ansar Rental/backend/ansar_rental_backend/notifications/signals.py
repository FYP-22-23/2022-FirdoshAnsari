from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Notification
from invoices.models import Invoice
from exponent_server_sdk import PushClient, PushMessage

client = PushClient()

def send_message(expo_token, title, body):
  print(expo_token)
  message = PushMessage(to=expo_token, body=body, title=title)
  client.publish(push_message=message)

@receiver(post_save, sender=Invoice)
def create_notification(sender, instance, created, **kwargs):
    if created:
        title = f"Invoice for the month of {instance.month}"
        description = f"Please clear your bill of Rs. {instance.total_amount} before the due date."
        Notification.objects.create(
            tenant=instance.tenant,
            title=title,
            description=description
        )

@receiver(post_save, sender=Notification)
def send_push_notification_to_tenant(sender, instance, created, **kwargs):
    if created:
        fcm_token = instance.tenant.fcm_token
        if fcm_token:
            send_message(fcm_token, instance.title, instance.description)

