from django.db import models
from django.core.validators import MinValueValidator
from authors.models import Author
class Book(models.Model):
    title = models.CharField(max_length=255, unique=True)
    brief = models.TextField()
    image = models.ImageField(upload_to='books/images/', null=True, blank=True)
    no_of_page = models.IntegerField(validators=[MinValueValidator(1)])
    price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0.01)])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    authors = models.ManyToManyField(Author, related_name='books')


    def __str__(self):
        return self.title
