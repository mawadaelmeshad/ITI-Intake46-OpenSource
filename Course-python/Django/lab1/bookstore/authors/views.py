from django.shortcuts import render

def landing(request):
    authors = [
        {'id': 1, 'name': 'F. Scott Fitzgerald', 'bio': 'Famous for classic novels such as The Great Gatsby.', 'books_count': 5},
        {'id': 2, 'name': 'Harper Lee', 'bio': 'American novelist best known for her masterpiece To Kill a Mockingbird.', 'books_count': 2},
        {'id': 3, 'name': 'George Orwell', 'bio': 'Renowned for his insightful political essays and novels like 1984.', 'books_count': 8},
        {'id': 4, 'name': 'Maya Angelou', 'bio': 'Celebrated poet and memoirist known for I Know Why the Caged Bird Sings.', 'books_count': 12},
    ]
    return render(request, 'authors/landing.html', {'authors': authors})
