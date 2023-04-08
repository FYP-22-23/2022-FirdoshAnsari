from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from authentication.tenant.models import Tenant


class TenantTokenObtainPairSerializer(TokenObtainPairSerializer):
    def update(self, instance, validated_data):
        pass

    def create(self, validated_data):
        pass

    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user
        data['user'] = {
            '_id': user.id,
            'username': user.username,
            'email': user.email,
            'room_no': user.room_number,
            'is_tenant': user.is_tenant,
            'monthly_room_rent': user.monthly_room_rent,
            'fcm_token': user.fcm_token,
        }
        data['token'] = data.pop('access')
        data['success'] = True
        del data['refresh']
        return data

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        return token


class TenantSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)

    class Meta:
        model = Tenant
        fields = '__all__'

    def create(self, validated_data):
        validated_data['is_tenant'] = True
        return Tenant.objects.create_tenant(**validated_data)
