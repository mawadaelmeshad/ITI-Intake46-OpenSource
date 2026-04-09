from data.store import projects
from datetime import datetime

def get_valid_index():
    from projects.view import view_projects
    view_projects()
    if not projects:
        return None
    while True:
        try:
            choice = input("\nEnter project index to edit (or 'q' to cancel): ").lower()
            if choice == 'q': return None
            idx = int(choice)
            if 0 <= idx < len(projects):
                return idx
            print("Invalid project index. Please choose from the list.")
        except ValueError:
            print("Please enter a valid number.")

def edit_field(idx, field_name, user):
    from projects.create import get_non_empty, get_amount, get_dates
    
    if projects[idx].owner != user.email:
        print("You can only edit your own projects!")
        return False

    if field_name == "title":
        new_val = get_non_empty("Enter New Title", "Title")
        projects[idx] = projects[idx]._replace(title=new_val)
    elif field_name == "details":
        new_val = get_non_empty("Enter New Details", "Details")
        projects[idx] = projects[idx]._replace(details=new_val)
    elif field_name == "target":
        new_val = get_amount("Enter New Target (EGP)")
        projects[idx] = projects[idx]._replace(target=new_val)
    elif field_name == "time":
        start, end = get_dates()
        projects[idx] = projects[idx]._replace(start=start, end=end)
    return True

def edit_project(user):
    idx = get_valid_index()
    if idx is None: return

    while True:
        print("\n--- Edit Project ---")
        print("1. Title")
        print("2. Details")
        print("3. Target Amount")
        print("4. Time (Start/End)")
        print("5. Save and Exit")
        
        choice = input("Select a field to edit: ")
        if choice == "1":
            edit_field(idx, "title", user)
        elif choice == "2":
            edit_field(idx, "details", user)
        elif choice == "3":
            edit_field(idx, "target", user)
        elif choice == "4":
            edit_field(idx, "time", user)
        elif choice == "5":
            print("Changes finalized.")
            break
        else:
            print("Invalid choice.")