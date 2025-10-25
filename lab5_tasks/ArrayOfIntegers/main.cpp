#include <iostream>

using namespace std;

int main()
{
    int size;
    cout<<"Enter size of the array : "<<endl;
    cin>>size;
    int arr[size];
    int* pointer= arr;
    cout<<"Enter the values of the array"<<endl;
    for(int i=0;i<size;i++)
        cin>>pointer[i];

    cout<<"*************** First way of printing ************"<<endl;
    for(int i=0;i<size;i++){
        cout<<pointer[i]<<endl;
    }

    cout<<"*************** Second way of printing ************"<<endl;
    for(int i=0;i<size;i++){
        cout<<arr[i]<<endl;
    }

    cout<<"*************** Third way of printing ************"<<endl;
    for(int i=0;i<size;i++){
        cout<<*(pointer+i)<<endl;
    }

    cout<<"*************** Fourth way of printing ************"<<endl;
    for(int i=0;i<size;i++){
        cout<<*(arr+i)<<endl;
    }
    return 0;
}
