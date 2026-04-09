from data.store import projects
from projects.view import view_projects

def get_delete_index():
    view_projects()
    if not projects:
        return None
    while True:
        choice = input("\nEnter project index to delete (or 'q' to cancel): ").strip().lower()
        if choice == 'q': return None
        try:
            idx = int(choice)
            if 0 <= idx < len(projects):
                return idx
            print("Index out of range. Please choose a valid index.")
        except ValueError:
            print("Please enter a valid numeric index.")

def delete_project(user):
    idx = get_delete_index()
    if idx is None: return

    if projects[idx].owner != user.email:
        print("\nError: You can only delete your own projects!")
        return

    del projects[idx]
    print("\nProject deleted successfully!")