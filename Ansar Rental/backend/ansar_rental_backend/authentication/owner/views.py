from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import OwnerTokenObtainSerializer
from ..backends import OwnerBackend


class OwnerTokenObtainPairView(TokenObtainPairView):
    serializer_class = OwnerTokenObtainSerializer

    def post(self, request, *args, **kwargs):
        self.authentication_classes = (OwnerBackend,)
        data = request.data
        username = data['username']
        password = data['password']
        user = authenticate(request, username=username, password=password)

        if isinstance(user, User):
            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)
            response = Response(serializer.validated_data, status=200)
            return response

        user = OwnerBackend().authenticate(request, username=username, password=password)

        if not user:
            return Response({'error': 'Invalid username or password'})

        self.authentication_classes = (OwnerBackend,)

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        response = Response(serializer.validated_data, status=200)
        return response

        # landlord_view = LandlordTokenObtainPairView.as_view()
        # response = landlord_view(request=request._request)
        #
        # return Response(response.data)
