#include <iostream>
struct node{
    int data;
    node *prev;
};
class Stack{
    node *tos;
public:
    Stack(){
        tos==nullptr;
    }
    void Push(int d){
        node *temp = new node();
        temp->data=d;
        temp->prev=nullptr;
        if(tos==nullptr){
            tos=temp;
        }
        else{
            temp->prev = tos;
            tos=temp;
        }

    }
    int Pop(int &d){
        if(tos==nullptr){
            return 0;
        }
        d=tos->data;
        node *temp = tos;
        tos=tos->prev;
        delete temp;
        return 1;

    }

};
using namespace std;

int main()
{
    Stack s1;
    s1.Push(1);
    s1.Push(2);
    s1.Push(3);
    s1.Push(4);
    int x;
    if(s1.Pop(x)!=0){
        cout<<x<<endl;
    }if(s1.Pop(x)!=0){
        cout<<x<<endl;
    }
    if(s1.Pop(x)!=0){
        cout<<x<<endl;
    }
    if(s1.Pop(x)!=0){
        cout<<x<<endl;
    }


    return 0;
}
