#include <iostream>

using namespace std;

int main()
{
    char c;
    cin>>c;

    if(c >= 'a' && c <= 'z'){
        cout<<"from small to capital :"<<char(c - 32) <<endl;
    }
    else{
        cout<<"from capital to small :"<<char(c + 32) <<endl;
    }
    return 0;
}
