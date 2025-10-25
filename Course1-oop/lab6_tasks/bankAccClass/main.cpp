#include <iostream>
#include <cstring>

using namespace std;


class bankAcc{

private:
    int id=1;
    char name[50];
    int balance=40000;

public:

    int getId(){
        return id;
    }

    void setId(int _id){
        id=_id;
    }

    char* getName(){
        return name;
    }

    void setName(const char* _name){
        strcpy(name,_name);
    }

    int getBalance(){
        return balance;
    }

    void setBalance(int _balance){
         if(_balance<100000 && _balance>10)
            balance=_balance;
    }

     void withDraw(int _value){
        if(_value<balance)
            balance=balance-_value;
    }

    void deposit(int _value){
            balance=balance+_value;
    }
    void printData(){
        cout<<"id: "<<id<<endl;
        cout<<"name: "<<name<<endl;
        cout<<"balance: "<<balance<<endl;
    }
};
int main()
{
    bankAcc b1;
    b1.printData();
    b1.setBalance(50000);
    b1.setName("mawadah");
    b1.withDraw(2000);
    b1.deposit(1000);
    cout<<"\nAfter changes:"<<endl;
    b1.printData();

    return 0;
}
