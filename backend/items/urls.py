from django.urls import path
from .views import ProductListCreateView, ProductDetailView, ProductSearchView

urlpatterns = [
    path('', ProductListCreateView.as_view(), name='product-list-create'),
    path('search/', ProductSearchView.as_view(), name='product-search'),
    path('<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
]
