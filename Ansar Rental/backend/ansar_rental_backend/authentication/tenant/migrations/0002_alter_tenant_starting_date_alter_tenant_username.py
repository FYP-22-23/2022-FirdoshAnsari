# Generated by Django 4.1.5 on 2023-02-20 18:02

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tenant', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tenant',
            name='starting_date',
            field=models.DateField(default=datetime.datetime(2023, 2, 20, 23, 47, 57, 641255)),
        ),
        migrations.AlterField(
            model_name='tenant',
            name='username',
            field=models.CharField(max_length=100, unique=True),
        ),
    ]
