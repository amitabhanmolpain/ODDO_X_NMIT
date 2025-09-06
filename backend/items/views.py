
from rest_framework import generics, permissions
from .models import Product
from .serializers import ProductSerializer
from django.db.models import Q

class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all().order_by('-created_at')
    serializer_class = ProductSerializer

    def perform_create(self, serializer):
        serializer.save(seller=self.request.user)

    def get_permissions(self):
        if self.request.method == 'POST':
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]


class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

# --- Full Text Search ---
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class ProductSearchView(APIView):
    """
    Search products by text query.

    GET /items/search/?q=search_term
    - Searches across title, description, and category fields.
    - Returns a list of matching products.
    Example:
        /items/search/?q=ps5
    """
    def get(self, request):
        query = request.GET.get('q', '')
        if not query:
            return Response({'results': []})
        products = Product.objects.filter(
            Q(title__icontains=query) |
            Q(description__icontains=query) |
            Q(category__icontains=query)
        ).order_by('-created_at')
        serializer = ProductSerializer(products, many=True)
        return Response({'results': serializer.data}, status=status.HTTP_200_OK)
