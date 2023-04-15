from django.urls import path, include
from .views import *

urlpatterns = [
    path('tenant/', include('authentication.tenant.urls')),
    path('owner/', include('authentication.owner.urls')),
    path('signup/', SignupView.as_view()),
    path('reset-password/<str:uidb64>/<str:token>/', ResetPasswordView.as_view(), name='reset_password'),
    path('send-reset-link/', SendPasswordResetLinkView.as_view(), name='send_reset_link'),
    # path('send-password-reset-email/', )
]
