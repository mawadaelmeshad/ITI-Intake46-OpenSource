from data.store import users

def login():
    print("**********Login************")
    email = input("Enter email: ")
    password = input("Enter password: ")
    for u in users:
        if u.email == email and u.password == password:
            print("Welcome ", u.first)
            print()
            return u
    print("invalid credentials")
    print()
    return None