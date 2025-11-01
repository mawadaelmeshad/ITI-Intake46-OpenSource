#include <iostream>

using namespace std;

template<class t>
void Swap(t& a, t& b){
    t temp=a;
    a=b;
    b=temp;

}

int main()
{
   int a=5,b=6;
   cout<<a<<":"<<b<<endl;
   Swap<int>(a,b);
   cout<<a<<":"<<b<<endl;
    return 0;
}
