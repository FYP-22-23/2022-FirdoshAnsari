# Generated by Django 4.1.5 on 2023-03-19 15:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payments', '0003_remove_payment_tenant_payment_room_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payment',
            name='remarks',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]