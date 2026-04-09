from django import forms
from .models import Book
from authors.models import Author

class BookForm(forms.Form):
    title = forms.CharField(max_length=255, widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Enter book title'}))
    brief = forms.CharField(widget=forms.Textarea(attrs={'class': 'form-control', 'rows': 4, 'placeholder': 'Enter brief description'}))
    image = forms.ImageField(required=False, widget=forms.ClearableFileInput(attrs={'class': 'form-control'}))
    no_of_page = forms.IntegerField(min_value=1, widget=forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Number of pages'}))
    price = forms.DecimalField(max_digits=10, decimal_places=2, min_value=0.01, widget=forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Price'}))
    authors = forms.ModelMultipleChoiceField(
        queryset=Author.objects.all(),
        widget=forms.CheckboxSelectMultiple
    )
    def __init__(self, *args, **kwargs):
        self.book_id = kwargs.pop('book_id', None)
        super(BookForm, self).__init__(*args, **kwargs)

    def clean_title(self):
        title = self.cleaned_data.get('title')
        if Book.objects.filter(title=title).exclude(id=self.book_id).exists():
            raise forms.ValidationError("This book title already exists.")
        return title
