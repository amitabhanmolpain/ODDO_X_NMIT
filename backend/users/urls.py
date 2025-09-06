from django.urls import path
from .views import RegisterView, LoginView, ProfileView, users_root

urlpatterns = [
    path('', users_root, name='users-root'),  # <-- new root endpoint
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', ProfileView.as_view(), name='profile'),
]
