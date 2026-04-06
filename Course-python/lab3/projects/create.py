from data.store import projects, Project
from datetime import datetime

def create_project(user):
    print("--- Create Project ---")
    print()
    title = input("Title: ")
    details = input("Details: ")
    target = input("Target amount (EGP): ")

    start = input("Start date (YYYY-MM-DD): ")
    end = input("End date (YYYY-MM-DD): ")

    try:
        start_date = datetime.strptime(start, "%Y-%m-%d")
        end_date = datetime.strptime(end, "%Y-%m-%d")
        if end_date <= start_date:
            print("End date must be after start date")
            return
    except:
        print("invalid date format")
        return

    projects.append(Project(user.email, title, details, target, start, end))
    print("Project created successfully!")