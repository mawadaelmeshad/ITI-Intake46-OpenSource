from data.store import projects, Project
from datetime import datetime

def get_non_empty(prompt, label="Field"):
    while True:
        val = input(f"{prompt}: ").strip()
        if val:
            return val
        print(f"{label} cannot be empty.")

def get_amount(prompt):
    while True:
        val = input(f"{prompt}: ").strip()
        if val.isdigit() and int(val) > 0:
            return val
        print("Invalid amount. Please enter a positive integer.")

def get_dates():
    while True:
        start_str = input("Start date (YYYY-MM-DD): ").strip()
        end_str = input("End date (YYYY-MM-DD): ").strip()
        try:
            start_date = datetime.strptime(start_str, "%Y-%m-%d")
            end_date = datetime.strptime(end_str, "%Y-%m-%d")
            if end_date <= start_date:
                print("Error: End date must be after start date.")
                continue
            return start_str, end_str
        except ValueError:
            print("Invalid date format. Please use YYYY-MM-DD (e.g., 2025-01-30).")

def create_project(user):
    print("\n--- Create Project ---")
    
    title = get_non_empty("Title", "Title")
    details = get_non_empty("Details", "Details")
    target = get_amount("Target amount (EGP)")
    start_date, end_date = get_dates()

    projects.append(Project(user.email, title, details, target, start_date, end_date))
    print("Project created successfully!")