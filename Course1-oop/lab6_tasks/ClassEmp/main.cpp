#include <iostream>

using namespace std;


class emp{

private:
    int id=1;
    char name[10]="ahmed";
    int age=20;
    int salary=2500;

public:
    int getSalary(){
        return salary;
    }

    void setSalary(int _salary){
        if(salary<3000 && salary>1000)
            salary=_salary;
    }

    void printData(){
        cout<<"id: "<<id<<endl;
        cout<<"age: "<<age<<endl;
        cout<<"name: "<<name<<endl;
        cout<<"salary: "<<salary<<endl;
    }
};
int main()
{
    emp emp1;
    emp1.getSalary();
    emp1.setSalary(2000);
    emp1.printData();
    return 0;
}
