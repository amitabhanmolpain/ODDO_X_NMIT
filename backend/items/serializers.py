from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    seller_name = serializers.CharField(source='seller.username', read_only=True)
    image = serializers.URLField(source='image_url', required=False, allow_blank=True)

    class Meta:
        model = Product
        fields = [
            'id', 'title', 'description', 'price', 'category', 'image', 
            'seller_name', 'created_at', 'quantity', 'condition', 'brand', 
            'model', 'year_of_manufacture', 'weight', 'dimensions', 'colour',
            'is_original_box', 'manual_included', 'working_condition_description'
        ]
        read_only_fields = ('seller',)

    def create(self, validated_data):
        # Handle image_url mapping
        if 'image_url' in validated_data:
            validated_data['image_url'] = validated_data.pop('image_url', None)
        return super().create(validated_data)