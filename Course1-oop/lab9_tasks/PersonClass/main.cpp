#include <iostream>
#include <cstring>

using namespace std;

class Person{
    int id=10;
    char name[10]="mawada";
    int age=22;

public:
    void setID(int _id){
        id=_id;
    }
    void setName(char* _name){
        strcpy(name,_name);
    }
    void setAge(int _age){
        age=_age;
    }
    void Print(){
        cout<<"Id : "<<id<<endl;
        cout<<"Name : "<<name<<endl;
        cout<<"Age : "<<age<<endl;
    }
};

class emp: public Person{
    int salary=2000;
public:
    void setSalary(int _salary){
        salary=_salary;
    }
    void Print(){
        Person::Print();
        cout<<"Salary :"<<salary<<endl;
    }

};

class student: public Person{
    int grade;
public:
    void setGrade(int _grade){
        grade=_grade;
    }
    void Print(){
        cout<<"Grade is : "<<grade<<endl;
    }
};

int main()
{
    cout<<"_____________Person________________"<<endl;
    Person p;
    p.Print();


    cout<<"_____________Employee________________"<<endl;
    emp em1;
    em1.setSalary(3000);
    em1.Print();

    cout<<"_____________Student________________"<<endl;
    student st;
    st.setGrade(200);
    st.Person::Print();
    st.Print();

    return 0;
}
