# Generated by Django 4.1.5 on 2023-04-18 03:05

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bills', '0011_alter_bill_created_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bill',
            name='created_at',
            field=models.DateField(default=datetime.datetime(2023, 4, 18, 3, 5, 24, 400434)),
        ),
    ]
