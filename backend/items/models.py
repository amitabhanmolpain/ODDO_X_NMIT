from django.db import models
from django.conf import settings

class Product(models.Model):
    seller = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='products')
    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=100)
    image_url = models.URLField(blank=True, null=True)  # For now, store image link

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
