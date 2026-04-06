import re
from data.store import users, User

def is_valid_email(email):
    return re.match(r"[^@]+@[^@]+\.[^@]+", email)

def is_valid_phone(phone):
    return re.match(r"^01[0125][0-9]{8}$", phone)

def register():
    print("******Register******")
    first_name = input("Enter your first name: ")
    last_name = input("Enter your last name: ")
    email = input("Email: ")

    if not is_valid_email(email):
        print("invalid email")
        return

    for u in users:
        if u.email == email:
            print("Email already registered!, write another email")
            return

    password = input("Password: ")
    confirm = input("Confirm password: ")
    if password != confirm:
        print("Passwords do not match")
        return

    phone = input("Phone: ")
    if not is_valid_phone(phone):
        print("invalid phone number")
        return

    users.append(User(first_name, last_name, email, password, phone))
    print("Registered successfully!")