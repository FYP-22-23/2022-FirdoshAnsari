from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from authentication.owner.models import Owner


class OwnerTokenObtainSerializer(TokenObtainPairSerializer):
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
            'is_admin': user.is_superuser,
        }
        data['token'] = data.pop('access')
        del data['refresh']
        data['success'] = True
        return data

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        return token


class OwnerSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)

    class Meta:
        model = Owner
        fields = '__all__'

    def create(self, validated_data):
        validated_data['is_landlord'] = True
        return Owner.objects.create_owner(**validated_data)
