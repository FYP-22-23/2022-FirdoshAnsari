# Generated by Django 4.1.5 on 2023-04-14 08:02

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tenant', '0026_alter_tenant_starting_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tenant',
            name='starting_date',
            field=models.DateField(default=datetime.datetime(2023, 4, 14, 13, 47, 45, 357117)),
        ),
    ]