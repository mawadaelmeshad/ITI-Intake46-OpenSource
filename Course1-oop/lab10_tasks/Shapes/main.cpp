#include <iostream>

using namespace std;

class Shape{
protected:
    int dim1;
    int dim2;
public:
    Shape(){
       dim1=2;
       dim2=4;
    }
    Shape(int _dim1){
        dim2=dim1= _dim1;
    }
    Shape(int _dim1, int _dim2){
        dim1=_dim1;
        dim2=_dim2;
    }
    void setDim1(int _dim1){
        dim1=_dim1;
    }
    void setDim2(int _dim2){
        dim2=_dim2;
    }
    int getDim1(){
        return dim1;
    }
    int getDim2(){
        return dim2;
    }

    virtual void Print(){
        cout<<"Dimension 1 is : "<<dim1<<endl;
        cout<<"Dimension 2 is : "<<dim2<<endl;
    }

    virtual float calcArea() = 0;
};

class Circle : public Shape{
public:
    Circle(int dim1): Shape(dim1){

    }
    float calcArea(){
        return (22.0 / 7)* (dim1*dim1);
    }
    void Print(){
        cout << "Circle Area: " << calcArea() << endl;
    }
};


class Rectangle : public Shape{

public:
    Rectangle(int dim1,int dim2): Shape(dim1,dim2){
    }
    float calcArea(){
        return dim1*dim2;
    }
    void Print(){
        cout << "Rectangle Area: " << calcArea() << endl;
    }
};

class Square : public Rectangle{

public:
    Square(int dim1,int dim2): Rectangle(dim1,dim2){
    }
    float calcArea(){
        return dim1*dim2;
    }
    void Print(){
        cout << "Square Area: " << calcArea() << endl;
    }
};

void myFun(Shape* shape) {
       shape->Print();
}

int main()
{
    Rectangle r(5, 4);
    Circle c(5);
    Square s(5,5);

    cout<<"___________Array of shapes _________"<<endl;
    float sum=0;
    Shape* arr[3] = {&r, &c, &s};
    for(int i=0;i<3;i++){
        myFun(arr[i]);
        sum+=arr[i]->calcArea();
    }
    cout<<"sum of areas is : "<<sum<<endl;


    return 0;
}
