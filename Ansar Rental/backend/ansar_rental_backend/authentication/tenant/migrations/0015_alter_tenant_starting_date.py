# Generated by Django 4.1.5 on 2023-03-03 02:07

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tenant', '0014_alter_tenant_starting_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tenant',
            name='starting_date',
            field=models.DateField(default=datetime.datetime(2023, 3, 3, 7, 52, 56, 571995)),
        ),
    ]
