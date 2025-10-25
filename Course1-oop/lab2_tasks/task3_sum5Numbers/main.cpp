#include <iostream>

using namespace std;

int main()
{
    int num;
    int sum=0;

    for(int i=0;i<5;i++){
        cout<<"Plaese enter num"<<i+1<<endl;
        cin>>num;
        sum+=num;
    }
    cout<<"the summation of 5 numbers is :" <<sum<<endl;
    return 0;
}
