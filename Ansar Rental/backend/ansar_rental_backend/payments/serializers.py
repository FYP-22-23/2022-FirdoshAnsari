from rest_framework import serializers
from .models import Payment


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ('id', 'paid_amount', 'due_amount', 'remarks', 'created_at', 'month', 'room_number', 'bill')
        read_only_fields = ('id', 'created_at')
