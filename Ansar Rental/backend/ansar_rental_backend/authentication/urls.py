from django.urls import path, include
from .views import *

urlpatterns = [
    path('tenant/', include('authentication.tenant.urls')),
    path('owner/', include('authentication.owner.urls')),
    path('signup/', SignupView.as_view()),
    # path('send-password-reset-email/', )
]
