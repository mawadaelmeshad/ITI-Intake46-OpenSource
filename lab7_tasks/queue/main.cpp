#include <iostream>

using namespace std;

class Queue{
    int* arr;
    int size;
    int tosIn;
    int tosOut;
public:
    Queue(int _size=5){
         size=_size;
         arr=new int[size];
         tosIn=-1;
         tosOut=-1;
    }
    ~Queue(){
        cout<<"Destructing ...."<<endl;
        delete [] arr;
    }
    bool isFull(){
        return tosIn == size-1;
    }
    bool isEmpty(){
        return tosIn==-1 || tosOut>tosIn;
    }
    void Enqueue(int data){

        if(isFull()){
            cout<<"Queue is full"<<endl;
        }
        else{
                if(tosIn==-1 && tosOut==-1){
                    tosOut++;
                }
                tosIn++;
                arr[tosIn]=data;
                cout<<"item added: "<<data<<endl;
        }

    }
    int Dequeue(int& data){
        if(isEmpty()){
            cout<<"Queue is empty"<<endl;
            return 0;
        }
        else{
               data=arr[tosOut];
                tosOut++;
                return 1;

        }


    }


};

int main()
{
    int s;
    cout<<"Enter size of the queue"<<endl;
    cin>>s;

    Queue q(s);
    q.Enqueue(10);
    q.Enqueue(20);
    q.Enqueue(30);
    q.Enqueue(40);
    q.Enqueue(50);
    int x;
    if(q.Dequeue(x)==1){
        cout<<x<<endl;
    }
    if(q.Dequeue(x)==1){
        cout<<x<<endl;
    }
    if(q.Dequeue(x)==1){
        cout<<x<<endl;
    }
    if(q.Dequeue(x)==1){
        cout<<x<<endl;
    }
    return 0;
}
