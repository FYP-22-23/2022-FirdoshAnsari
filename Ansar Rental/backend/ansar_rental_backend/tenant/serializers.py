from rest_framework import serializers

from authentication.tenant.models import Tenant


class TenantSerializer(serializers.ModelSerializer):
    joined = serializers.SerializerMethodField()

    class Meta:
        model = Tenant
        fields = ['username', 'monthly_room_rent', 'monthly_water_rent', 'room_number', 'guardian_name', 'guardian_contact_number', 
                  'starting_electricity_units', 'number_of_tenants', 'starting_date', 'joined', 'id', 'email', 'id', 'fcm_token']

    def get_id(self, obj):
        return obj.pk

    def get_joined(self, obj):
        return obj.created_at.strftime('%Y-%m-%d')
