#include <iostream>

using namespace std;
class complex{

public:
    int real;
    int img;

    int getReal(){
        return real;
    }
    void setReal(int _real){
        real=_real;
    }
    int getImg(){
        return img;
    }
    void setImg(int _img){
        img=_img;
    }

    complex add(complex num){
        complex result;
        result.real=real+num.real;
        result.img=img+num.img;
        return result;
    }



};

complex sub(complex num1,complex num2){
    complex result;
    result.real=num2.real-num1.real;
    result.img=num2.img-num1.img;
    return result;
}

void printData(complex num){
    if(num.img>0){
        cout<<"the number: "<<num.real<<"+"<<num.img<<"i"<<endl;
    }
    else if(num.img<0){
        cout<<"the number: "<<num.real<<num.img<<"i"<<endl;
    }
}


int main()
{
    complex num1;
    num1.real=2;
    num1.img=3;
    complex num2;
    num2.real=8;
    num2.img=9;
    complex sum= num1.add(num2);
    printData(sum);
    complex subRes=sub(num1,num2);
    printData(subRes);


    return 0;
}
