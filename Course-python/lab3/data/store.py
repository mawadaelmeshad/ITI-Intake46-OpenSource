from collections import namedtuple

User = namedtuple("User", ["first", "last", "email", "password", "phone"])
Project = namedtuple("Project", ["owner", "title", "details", "target", "start", "end"])

users = []
projects = []