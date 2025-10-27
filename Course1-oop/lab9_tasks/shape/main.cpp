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

    void Print(){
        cout<<"Dimension 1 is : "<<dim1<<endl;
        cout<<"Dimension 2 is : "<<dim2<<endl;
    }
};

class Rectangle : public Shape{

public:
    Rectangle(int dim1,int dim2): Shape(dim1,dim2){
    }
    int calcArea(){
        return dim1*dim2;
    }
    void Print(){
        Shape :: Print();
        cout << "Rectangle Area: " << calcArea() << endl;
    }
};

class Triangle : public Shape{
public:
    Triangle(int dim1,int dim2): Shape(dim1,dim2){
    }
    double calcArea(){
        return (0.5 * dim1) * dim2;
    }
    void Print(){
        Shape :: Print();
        cout << "Triangle Area: " << calcArea() << endl;
    }
};
class Circle : public Shape{
public:
    Circle(int dim1): Shape(dim1){

    }
    double calcArea(){
        return (22.0 / 7)* (dim1*dim1);
    }
    void Print(){
        Shape :: Print();
        cout << "Circle Area: " << calcArea() << endl;
    }
};
int main()
{
    Shape sh;
    sh.Print();
    cout<<"___________________________________"<<endl;
    Rectangle r(5, 4);
    r.Print();
    cout<<"___________________________________"<<endl;

    Circle c(5);
    c.Print();

    cout<<"___________________________________"<<endl;

    Triangle t(2,4);
    t.Print();


    return 0;
}
