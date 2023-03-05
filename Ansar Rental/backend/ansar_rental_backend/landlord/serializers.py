from rest_framework import serializers

from authentication.owner.models import Owner


class OwnerSerializer(serializers.ModelSerializer):
    joined = serializers.SerializerMethodField()

    class Meta:
        model = Owner
        fields = ['username', 'email', 'joined', 'id']

    def get_id(self, obj):
        return obj.pk

    def get_joined(self, obj):
        return obj.created_at.strftime('%Y-%m-%d')

    # def save(self, **kwargs):
    #     # kwargs['groups'] = []
    #     print(kwargs)
    #     # kwargs['user_permissions'] = []
    #     return super().save(**kwargs)

