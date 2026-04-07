class Queue:
    def __init__(self):
        self.items=[]
    def insert(self,value):
        self.items.append(value)
    def pop(self):
        if self.is_empty():
            print("Queue is empty!")
            return None
        return self.items.pop(0)
    def is_empty(self):
        return len(self.items) == 0
    
if __name__ == "__main__":

    q1 = Queue()
    q1.insert(10)
    q1.insert(20)
    print(q1.pop())