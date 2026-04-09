from data.store import users

def get_credentials():
    email = input("Enter email: ").strip()
    password = input("Enter password: ")
    return email, password

def authenticate(email, password):
    for u in users:
        if u.email == email and u.password == password:
            return u
    return None

def login():
    while True:
        print("\n" + "*" * 10 + " Login " + "*" * 10)
        email, password = get_credentials()
        user = authenticate(email, password)
        
        if user:
            print(f"Welcome {user.first}!")
            return user
        
        print("Invalid credentials.")
        retry = input("Try again? (y/n): ").lower()
        if retry != 'y':
            return None