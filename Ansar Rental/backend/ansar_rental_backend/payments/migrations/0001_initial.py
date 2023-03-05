# Generated by Django 4.1.5 on 2023-02-27 17:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('bills', '0001_initial'),
        ('tenant', '0008_alter_tenant_starting_date'),
    ]

    operations = [
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('paid_amount', models.PositiveIntegerField()),
                ('due_amount', models.PositiveIntegerField(default=0)),
                ('remarks', models.CharField(max_length=255)),
                ('created_at', models.DateField(auto_now_add=True)),
                ('month', models.IntegerField(choices=[('1', 'Baisakh'), ('2', 'Jestha'), ('3', 'Ashar'), ('4', 'Swrawan'), ('5', 'Bhadra'), ('6', 'Ashwin'), ('7', 'Kartik'), ('8', 'Mangshir'), ('9', 'Poush'), ('10', 'Magh'), ('11', 'Falgun'), ('12', 'Chaitra')])),
                ('bill', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bills.bill')),
                ('tenant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tenant.tenant')),
            ],
        ),
    ]