from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from authentication.tenant.models import Tenant


class TenantTokenObtainPairSerializer(TokenObtainPairSerializer):
    def update(self, instance, validated_data):
        pass

    def create(self, validated_data):
        pass

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['name'] = user.first_name + ' ' + user.last_name

        return token


class TenantSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField(required=True)
    name = serializers.CharField(required=True)

    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user
        data['user'] = {
            '_id': user.id,
            'username': user.username,
            'email': user.email,
        }
        data['token'] = data.pop('access')
        del data['refresh']
        data['success'] = True
        return data

    class Meta:
        model = Tenant
        fields = '__all__'

    def create(self, validated_data):
        validated_data['is_tenant'] = True
        return Tenant.objects.create_tenant(**validated_data)

