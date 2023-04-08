from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from payments.models import Payment
from .models import Bill
from .serializers import BillSerializer


class BillViewSet(viewsets.ModelViewSet):
    queryset = Bill.objects.all()
    serializer_class = BillSerializer
    authentication_classes = ()
    permission_classes = ()

    @action(detail=False, methods=['get'])
    def get_all_pending_bills(self, request):
        paid_bills = Payment.objects.values_list('bill__id', flat=True)
        unpaid_bills = Bill.objects.exclude(id__in=paid_bills)
        serializer = self.get_serializer(unpaid_bills, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def get_pending_bills(self, request):
        room_number = request.data.get('room_number')
        paid_bills = Payment.objects.filter(room_number=room_number).values_list('bill__id', flat=True)
        unpaid_bills = Bill.objects.filter(room_number=room_number).exclude(id__in=paid_bills)
        serializer = self.get_serializer(unpaid_bills, many=True)
        return Response(serializer.data)
