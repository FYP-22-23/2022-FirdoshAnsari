from rest_framework import serializers

from authentication.tenant.models import Tenant
from payments.models import Payment
from .models import Bill


class BillSerializer(serializers.ModelSerializer):
    monthly_room_rent = serializers.SerializerMethodField()
    total = serializers.SerializerMethodField()
    water_and_waste = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()

    class Meta:
        model = Bill
        fields = ('id', 'month', 'previous_electricity_unit', 'present_electricity_unit', 'remarks', 'due_amount',
                  'electricity_rate', 'discount', 'room_number', 'monthly_room_rent', 'total', 'water_and_waste',
                  'status')
        read_only_fields = ('id',)

    @staticmethod
    def get_status(self):
        payment = Payment.objects.filter(bill_id=self.id).first()
        if payment is None:
            return "unpaid"
        return "paid"

    @staticmethod
    def get_monthly_room_rent(cls):
        tenant = Tenant.objects.filter(room_number=cls.room_number).first()
        if not tenant:
            return 0
        return tenant.monthly_room_rent

    @staticmethod
    def get_water_and_waste(cls):
        tenant = Tenant.objects.filter(room_number=cls.room_number).first()
        if not tenant:
            return 0
        return tenant.monthly_water_rent

    @staticmethod
    def get_total(cls):
        tenant = Tenant.objects.filter(room_number=cls.room_number).first()
        if not tenant:
            return 0
        consumed_electricity_unit = cls.present_electricity_unit - cls.previous_electricity_unit
        total_unit = consumed_electricity_unit * cls.electricity_rate
        monthly_room_rent = tenant.monthly_room_rent
        return total_unit + monthly_room_rent + tenant.monthly_water_rent + cls.due_amount - cls.discount
