from data.store import projects
from projects.view import view_projects

def delete_project(user):
    view_projects()
    if not projects:
        return
    indexx = int(input("Enter project index to delete: "))
    if indexx < 0 or indexx >= len(projects):
        print("Invalid project index")
        print()
        return
    if projects[indexx].owner != user.email:
        print("You can only delete your own projects")
        print()
        return
    projects.pop(indexx)
    print("Project deleted successfully!")
    print()