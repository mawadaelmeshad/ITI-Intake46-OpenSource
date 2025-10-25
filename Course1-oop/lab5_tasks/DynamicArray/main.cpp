#include <iostream>

using namespace std;

int main()
{
    int size;
    cout<<"Enter size of the array : "<<endl;
    cin>>size;
    int*ptr = new int[size];

    cout<<"Enter the values of the array"<<endl;
    for(int i=0;i<size;i++)
        cin>>ptr[i];
    cout<<"You Entered : "<<endl;
    for(int i=0;i<size;i++){
        cout<<ptr[i]<<endl;
    }
    delete ptr;


    return 0;
}
