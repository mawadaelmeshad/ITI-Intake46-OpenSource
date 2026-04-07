class QueueOutOfRangeException(Exception):
    pass
class advancedQueue:
    queues={}

    def __init__(self, name , size):
        self.name = name
        self.size=size
        self.items=[]
        advancedQueue.queues[name]= self

    def insert(self, value):
        if len(self.items) >= self.size:
            raise QueueOutOfRangeException("queue is full!")
        self.items.append(value)
    def pop(self):
        if self.is_empty():
            print("queue is empty")
            return None
        return self.items.pop(0)
    def is_empty(self):
        return len(self.items)==0

        
if __name__ == "__main__":

    q1 = advancedQueue("q1", 2)
    q2 = advancedQueue("q2", 3)
    q1.insert(10)
    q1.insert(20)
    try:
        q1.insert(30)  
    except QueueOutOfRangeException as e:
        print(e)
    print(q1.pop())
