from data.store import projects
from datetime import datetime

def edit_project(user):
    from projects.view import view_projects
    view_projects()
    if not projects:
        return
    indexx = int(input("Enter project index to edit: "))
    if indexx < 0 or indexx >= len(projects):
        print("Invalid project index")
        return
    if projects[indexx].owner != user.email:
        print("You can only edit your own projects")
        return
    print("choose the field you want to edit")
    print("1. title")
    print("2. details")
    print("3. total target")
    print("4. time")
    
    choice = input("Enter your choice: ")
    if choice=="1":
        title = input("Enter New title: ")
        projects[indexx] = projects[indexx]._replace(title=title)
    elif choice == "2":
        details = input("Enter new details: ")
        projects[indexx] = projects[indexx]._replace(details=details)

    elif choice == "3":
        target = input("Enter new target: ")
        if not target.isdigit():
            print("Target must be a number")
            return
        projects[indexx] = projects[indexx]._replace(target=target)

    elif choice == "4":
        start = input("Enter new start date (YYYY-MM-DD): ")
        end = input("Enter new end date (YYYY-MM-DD): ")

        try:
            start_date = datetime.strptime(start, "%Y-%m-%d")
            end_date = datetime.strptime(end, "%Y-%m-%d")

            if end_date <= start_date:
                print("End date must be after start date")
                return

            projects[indexx] = projects[indexx]._replace(start=start, end=end)

        except Exception:
            print("Invalid date format")
            return
    print("Project updated successfully!")