from auth.register import register
from auth.login import login
from projects.create import create_project
from projects.view import view_projects
from projects.edit import edit_project
from projects.delete import delete_project

def main():
    current_user = None

    while True:
        print("-----Funding App--------")
        print("1. Register")
        print("2. Login")
        print("3. Exit")
        choice = input("Choose: ")

        if choice == "1":
            register()

        elif choice == "2":
            current_user = login()
            if current_user:
                while True:
                    print("--- User Menu ---")
                    print("1. Create Project")
                    print("2. View Projects")
                    print("3. Edit Project")
                    print("4. Delete Project")
                    print("5. Logout")
                    option = input("Choose: ")

                    if option == "1":
                        create_project(current_user)
                    elif option == "2":
                        view_projects()
                    elif option == "3":
                        edit_project(current_user)
                    elif option == "4":
                        delete_project(current_user)
                    elif option == "5":
                        break

        elif choice == "3":
            print("bye!")
            break

if __name__ == "__main__":
    main()