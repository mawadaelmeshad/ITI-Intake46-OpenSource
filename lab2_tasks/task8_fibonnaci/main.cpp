#include <iostream>

using namespace std;

int main()
{
    int num;
    cout<< "please enter number"<<endl;
    cin>>num;
    if (num == 0) {
        cout << "Fibonacci is 0" << endl;
        return 0;
    }
    if (num == 1) {
        cout << "Fibonacci is 1" << endl;
        return 0;
    }

    int x=0,y=1,z;
    for (int i=2;i<= num;i++) {
        z = x + y;
        x = y;
        y = z;
    }

    cout << "fibonacci number at the index " << num << " is: " << y << endl;

    return 0;
}
