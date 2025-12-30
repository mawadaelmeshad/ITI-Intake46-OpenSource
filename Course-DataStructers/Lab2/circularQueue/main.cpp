#include <iostream>
class Queue{
int rear;
int frontt;
int sizee;
int *arr;

public:
    Queue(int s=5){
        rear=frontt=-1;
        sizee=s;
        arr= new int[sizee];
    }
    int isEmpty(){
    return rear==-1;
    }
    int isFull(){
        return (rear==sizee-1 && frontt==0) || !isEmpty();
    }
    void Enqueue(int d){
        if(isFull()==1){
            return;
        }
        if(rear==-1){
            frontt=rear=0;
        }
        else if(rear==sizee-1){
            rear=0;
        }
        else{
            rear++;
        }
        arr[rear]=d;
    }
    int Dequeue(int& d){
        if(isEmpty()==1){
            return 0;
        }
        d=arr[frontt];
        if(frontt==rear){
            frontt=rear=-1;

        }
        else if(frontt=sizee-1){
            frontt=0;
        }
        else{
            frontt++;
        }
        return 1;
    }
};
using namespace std;

int main()
{
    Queue q1;
    q1.Enqueue(4);
    q1.Enqueue(5);
    q1.Enqueue(6);
    q1.Enqueue(7);
    int x;
   if(q1.Dequeue(x)!=0){
    cout<<x<<endl;
   }
    return 0;
}
