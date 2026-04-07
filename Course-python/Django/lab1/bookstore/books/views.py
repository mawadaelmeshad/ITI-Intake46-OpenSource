from django.shortcuts import render

# Create your views here.
def index(request):
    books = [
        {'id': 1, 'title': 'The Great Gatsby', 'author': 'F. Scott Fitzgerald'},
        {'id': 2, 'title': 'To Kill a Mockingbird', 'author': 'Harper Lee'},
        {'id': 3, 'title': '1984', 'author': 'George Orwell'},
    ]
    return render(request, 'books/index.html', {'books': books})

def book_info(request, book_id):
    books = {
        1: {'title': 'The Great Gatsby', 'author': 'F. Scott Fitzgerald', 'year': 1925},
        2: {'title': 'To Kill a Mockingbird', 'author': 'Harper Lee', 'year': 1960},
        3: {'title': '1984', 'author': 'George Orwell', 'year': 1949},
    }
    book = books.get(book_id)
    return render(request, 'books/book_info.html', {'book': book})