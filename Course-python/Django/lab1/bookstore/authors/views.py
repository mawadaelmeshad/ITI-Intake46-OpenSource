from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from .models import Author
from .forms import AuthorForm

# READ ALL
class AuthorListView(ListView):
    model = Author
    template_name = 'authors/landing.html'
    context_object_name = 'authors'

# READ ONE
class AuthorDetailView(DetailView):
    model = Author
    template_name = 'authors/author_info.html'
    context_object_name = 'author'

# CREATE
class AuthorCreateView(CreateView):
    model = Author
    form_class = AuthorForm
    template_name = 'authors/author_form.html'
    success_url = reverse_lazy('authors.landing')

# UPDATE
class AuthorUpdateView(UpdateView):
    model = Author
    form_class = AuthorForm
    template_name = 'authors/author_form.html'
    success_url = reverse_lazy('authors.landing')

# DELETE
class AuthorDeleteView(DeleteView):
    model = Author
    template_name = 'authors/author_confirm_delete.html'
    success_url = reverse_lazy('authors.landing')