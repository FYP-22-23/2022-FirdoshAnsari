from rest_framework import serializers
from .models import Bill

class BillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bill
        fields = ('id', 'month', 'previous_electricity_unit', 'present_electricity_unit', 'remarks', 'due_amount', 'electricity_rate', 'discount', 'room_number')
        read_only_fields = ('id', )
