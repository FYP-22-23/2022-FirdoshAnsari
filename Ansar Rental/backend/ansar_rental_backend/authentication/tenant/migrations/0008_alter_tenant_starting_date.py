# Generated by Django 4.1.5 on 2023-02-27 17:09

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tenant', '0007_alter_tenant_starting_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tenant',
            name='starting_date',
            field=models.DateField(default=datetime.datetime(2023, 2, 27, 22, 54, 40, 349804)),
        ),
    ]