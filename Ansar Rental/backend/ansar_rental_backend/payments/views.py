from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Payment
from .serializers import PaymentSerializer


class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    authentication_classes = ()
    permission_classes = ()

    def create(self, request, *args, **kwargs):
        print(request.body)
        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    @action(detail=False, methods=['POST'])
    def for_room(self, request):
        payments = Payment.objects.filter(room_number=request.data.get('room_number'))
        serializer = self.get_serializer(payments, many=True)
        return Response(serializer.data)
