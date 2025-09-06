from django.urls import path
from .views import SignupView, ProfileView, MyListingsView, MyPurchasesView
from .views import LoginView  # your existing login

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('my-listings/', MyListingsView.as_view(), name='my-listings'),
    path('my-purchases/', MyPurchasesView.as_view(), name='my-purchases'),
]
