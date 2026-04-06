from data.store import projects

def view_projects():
    print("--- All Projects ---")
    print()
    if not projects:
        print("No projects yet.")
        print()
        return
    for i, p in enumerate(projects):
        print(f"{i} - {p.title} | {p.target} EGP | {p.start} → {p.end} | Owner: {p.owner}")