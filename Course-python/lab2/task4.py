def ask():
    name =input("please enter your name: ")
    if name.isdigit() or name=="" or not name.isalpha():
        print("Enter valid name")
        name =input("please enter your name: ")
    else:
        email= input("enter your email: ")
        
    return name,email

print(ask())
