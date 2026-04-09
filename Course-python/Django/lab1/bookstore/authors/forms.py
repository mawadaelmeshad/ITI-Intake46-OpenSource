from django import forms
from .models import Author

class AuthorForm(forms.ModelForm):
    class Meta:
        model = Author
        fields = ['name', 'email', 'bio', 'gender']
        widgets = {
            'bio': forms.Textarea(attrs={'rows': 4}),
            'gender': forms.Select(),
        }