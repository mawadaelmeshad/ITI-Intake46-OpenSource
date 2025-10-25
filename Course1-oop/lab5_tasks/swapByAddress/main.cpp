#include <iostream>

using namespace std;

void swap(int* x,int* y){
    int temp=*x;
    *x=*y;
    *y=temp;
    cout<<"x:"<<*x<<",Y: "<<*y;

}

int main()
{
    int a,b;
    cout<<"Enter value of first number :"<<endl;
    cin>>a;
    cout<<"Enter value of second number :"<<endl;
    cin>>b;

    int* ptr1=&a;
    int* ptr2=&b;
    swap(ptr1,ptr2);
    return 0;
}
