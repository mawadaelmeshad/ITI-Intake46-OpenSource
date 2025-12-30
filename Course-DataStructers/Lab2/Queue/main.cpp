#include <iostream>
struct node{
    int data;
    node *next;
};
class Queue{
    node* frontt;
    node* rear;
public:
    Queue(){
        rear=frontt=nullptr;
    }
    void Enqueue(int d){
        node *temp = new node();
        if(temp==nullptr){
            return;
        }
        temp->data=d;
        temp->next=nullptr;
        if(frontt==nullptr){
            frontt=rear=temp;
        }
        else{
            rear->next=temp;
            rear=temp;
        }
    }
    int Dequeue(int &d){
        if(frontt==nullptr){
            return 0;
        }
        d=frontt->data;
        node *temp = frontt;
        frontt=frontt->next;
        delete temp;
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
    if(q1.Dequeue(x)!=0){
    cout<<x<<endl;
   }
    if(q1.Dequeue(x)!=0){
    cout<<x<<endl;
   }
    if(q1.Dequeue(x)!=0){
    cout<<x<<endl;
   }
    return 0;
}
