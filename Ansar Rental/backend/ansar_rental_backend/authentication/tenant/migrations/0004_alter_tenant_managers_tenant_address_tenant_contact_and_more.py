# Generated by Django 4.1.5 on 2023-02-21 06:08

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tenant', '0003_tenant_created_at_alter_tenant_starting_date'),
    ]

    operations = [
        migrations.AlterModelManagers(
            name='tenant',
            managers=[
            ],
        ),
        migrations.AddField(
            model_name='tenant',
            name='address',
            field=models.CharField(default=datetime.datetime(2023, 2, 21, 6, 8, 37, 248298, tzinfo=datetime.timezone.utc), max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='tenant',
            name='contact',
            field=models.PositiveIntegerField(default=980000000),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='tenant',
            name='date_of_birth',
            field=models.DateField(default=datetime.datetime(2023, 2, 21, 6, 8, 57, 322613, tzinfo=datetime.timezone.utc)),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='tenant',
            name='first_name',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='tenant',
            name='last_name',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='tenant',
            name='starting_date',
            field=models.DateField(default=datetime.datetime(2023, 2, 21, 11, 53, 19, 877300)),
        ),
    ]
