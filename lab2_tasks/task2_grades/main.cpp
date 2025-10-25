#include <iostream>

using namespace std;

int main()
{
    int degree;
    cout<<"Please enter your grade:"<<endl;
    cin>>degree;

    if(degree>=85)
        cout<<"Your grade is excellent!"<<endl;
    else if(degree >=75)
        cout<<"Your grade is very good!"<<endl;
    else if(degree >=65)
        cout<<"Your grade is good!"<<endl;
    else if(degree >=50)
        cout<<"You passed!"<<endl;
    else
        cout<<"You failed!"<<endl;
    return 0;
}
