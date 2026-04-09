from django.shortcuts import render, get_object_or_404, redirect
from .models import Book
from .forms import BookForm

# Create your views here.
def index(request):
    books = Book.objects.all()
    return render(request, 'books/index.html', {'books': books})

def book_info(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    return render(request, 'books/book_info.html', {'book': book})

def book_create(request):
    if request.method == 'POST':
        form = BookForm(request.POST, request.FILES)
        if form.is_valid():
            book = Book.objects.create(
                title=form.cleaned_data['title'],
                brief=form.cleaned_data['brief'],
                image=form.cleaned_data['image'],
                no_of_page=form.cleaned_data['no_of_page'],
                price=form.cleaned_data['price']
            )
            book.authors.set(form.cleaned_data['authors'])
            return redirect('books_index')
    else:
        form = BookForm()
    return render(request, 'books/book_form.html', {'form': form, 'title': 'Add New Book'})

def book_update(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    if request.method == 'POST':
        form = BookForm(request.POST, request.FILES, book_id=book.id)
        if form.is_valid():
            book.title = form.cleaned_data['title']
            book.brief = form.cleaned_data['brief']
            if form.cleaned_data['image']:
                book.image = form.cleaned_data['image']
            book.no_of_page = form.cleaned_data['no_of_page']
            book.price = form.cleaned_data['price']
            book.save()
            
            # Update ManyToMany relationship
            book.authors.set(form.cleaned_data['authors'])
            return redirect('book_info', book_id=book.id)
    else:
        # Pre-populate with current authors
        form = BookForm(initial={
            'title': book.title,
            'brief': book.brief,
            'image': book.image,
            'no_of_page': book.no_of_page,
            'price': book.price,
            'authors': book.authors.all()
        }, book_id=book.id)
    return render(request, 'books/book_form.html', {'form': form, 'title': f'Update {book.title}'})

def book_delete(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    if request.method == 'POST':
        book.delete()
        return redirect('books_index')
    return render(request, 'books/book_confirm_delete.html', {'book': book})