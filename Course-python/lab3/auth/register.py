import re
from data.store import users, User

def is_valid_email(email):
    return re.match(r"[^@]+@[^@]+\.[^@]+", email)

def is_valid_phone(phone):
    return re.match(r"^01[0125][0-9]{8}$", phone)

def get_name(prompt):
    while True:
        name = input(prompt).strip()
        if name:
            return name
        print("Name cannot be empty.")

def get_email():
    while True:
        email = input("Email: ").strip()
        if not is_valid_email(email):
            print("Invalid email format. Please try again.")
            continue
        if any(u.email == email for u in users):
            print("Email already registered! Please use another email.")
            continue
        return email

def get_password():
    while True:
        password = input("Password: ")
        confirm = input("Confirm password: ")
        if password == confirm and password:
            return password
        if not password:
            print("Password cannot be empty.")
        else:
            print("Passwords do not match. Please try again.")

def get_phone():
    while True:
        phone = input("Phone: ").strip()
        if is_valid_phone(phone):
            return phone
        print("Invalid phone number. Must be a valid Egyptian mobile number (e.g., 010..., 011..., 012..., 015...).")

def register():
    print("\n" + "*" * 10 + " Register " + "*" * 10)
    
    first_name = get_name("Enter your first name: ")
    last_name = get_name("Enter your last name: ")
    email = get_email()
    password = get_password()
    phone = get_phone()

    users.append(User(first_name, last_name, email, password, phone))
    print("Registered successfully!")