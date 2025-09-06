from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    seller_name = serializers.CharField(source='seller.username', read_only=True)
    image = serializers.CharField(source='image_url', read_only=True)  # Map image_url to image for frontend

    class Meta:
        
        model = Product
        fields = ['id', 'title', 'description', 'price', 'category', 'image', 'seller_name', 'created_at']
        read_only_fields = ('seller',)