from django.db import models
from django.conf import settings
import datetime

# Existing choices for condition
CONDITION_CHOICES = [
    ('excellent', 'Excellent'),
    ('good', 'Good'),
    ('fair', 'Fair'),
    ('poor', 'Poor'),
]

# Year choices dynamically generated
YEAR_CHOICES = [(year, year) for year in range(2000, datetime.date.today().year + 1)]

CATEGORY_CHOICES = [
    ('clothes', 'Clothes'),
    ('furniture', 'Furniture'),
    ('electronics', 'Electronics'),
    ('beddings', 'Beddings'),
    ('wearables', 'Wearables'),
    ('home_decor', 'Home Decor'),
    ('study_material', 'Study Material'),
    ('kitchen_appliances', 'Kitchen Appliances'),
]

class Product(models.Model):
    seller = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='products')

    title = models.CharField(max_length=255)
    description = models.TextField()

    quantity = models.PositiveIntegerField(default=1)
    condition = models.CharField(max_length=20, choices=CONDITION_CHOICES, default='good')
    brand = models.CharField(max_length=100, null=True, blank=True)
    model = models.CharField(max_length=100, null=True, blank=True)
    year_of_manufacture = models.IntegerField(choices=YEAR_CHOICES, null=True, blank=True)
    working_condition_description = models.TextField(null=True, blank=True)

    weight = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True, help_text="Weight in kg")
    dimensions = models.CharField(max_length=100, null=True, blank=True, help_text="L x W x H in cm")
    colour = models.CharField(max_length=50, null=True, blank=True)

    is_original_box = models.BooleanField(default=False)
    manual_included = models.BooleanField(default=False)

    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)  # ✅ Strict dropdown
    image_url = models.URLField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
