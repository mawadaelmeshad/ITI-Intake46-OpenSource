#include <iostream>

using namespace std;

class complex{
    int real;
    int img;
public:
    complex(int _real, int _img){
        real=_real;
        img=_img;
    }

    void print(){
        if(img>0){
            cout<<real<<"+"<<img<<"i"<<endl;
        }
        else{
            cout<<real<<img<<"i"<<endl;
        }
    }
};
int main()
{
    int r,i;
    cout<<"Enter real part"<<endl;
    cin>>r;
    cout<<"Enter imaginary part"<<endl;
    cin>>i;
    complex x(r,i);
    x.print();
    return 0;
}
