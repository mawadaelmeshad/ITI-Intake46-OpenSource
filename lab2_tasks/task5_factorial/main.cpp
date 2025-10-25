#include <iostream>

using namespace std;

int main()
{
    cout << "Enter the number!" << endl;
    int num;
    cin>>num;
    int factorial=1;
    for(int i=num;i>0;i--){
        factorial*=i;
    }
    cout<<"factorial is: "<<factorial<<endl;
    return 0;
}
