#include <iostream>
#include <windows.h>
#include <conio.h>
#include <cstring>

using namespace std;

void gotoxy(int x, int y) {
    COORD coord;
    coord.X = x;
    coord.Y = y;
    SetConsoleCursorPosition(GetStdHandle(STD_OUTPUT_HANDLE), coord);
}
void textattr(int color) {
        HANDLE hConsole = GetStdHandle(STD_OUTPUT_HANDLE);
        SetConsoleTextAttribute(hConsole, color);
}

struct emp{
    string name;
    int age;
    int id;
};
struct node{
    emp e;
    node *next;
    node *prev;
};

class LinkedList {
    node *head;
    node *tail;

private:
    node* searchById(int id){
        node *temp = head;
        while(temp){
            if(temp->e.id == id){
                return temp;
            }
            else{
                temp = temp->next;
            }
        }
        return nullptr;
    }
public:
    LinkedList(){
    head = tail = nullptr;
    }

    void append(int id , string name , int age){
        node *temp = new node();
        (temp->e).id = id;
        (temp->e).name = name;
        (temp->e).age = age;
        temp->prev = nullptr;
        temp->next = nullptr;
        if(head == nullptr){
            head = tail = temp;
        }
        else{
            temp->prev = tail;
            tail->next = temp;
            tail = temp;
        }


    }

    void insertAfter(int idOfInsertion, int id , string name , int age){

        node *temp = new node();
        node *curr = searchById(idOfInsertion);
        if(!curr){
            cout<<"id of insertion not found use append!"<<endl;
            return;
        }
        (temp->e).id = id;
        (temp->e).name = name;
        (temp->e).age = age;

         temp->next = curr->next;
         temp->prev = curr;
         curr->next = temp;


        cout<<"Item inserted successfully after id : "<<idOfInsertion<<endl;


    }
    void display(){
        node *temp = head;
        if(temp == nullptr){
            cout<<"No items yet!" <<endl;
        }
        else{
            while(temp){
                cout<<"id : "<<temp->e.id<<endl;
                temp = temp->next;
            }
        }

    }

    int countNodes(){
        node *temp = head;
        int counter = 0;
        while(temp){
            counter++;
           temp = temp->next ;
        }
        return counter;
    }

    void Search(int id){
        node* node1 = searchById(id);
        if(node1){
             cout<<"Employee found and its name is: "<<node1->e.name<<endl;

        }
        else{
            cout<<"Employee id not found"<<endl;
        }
    }

    void deleteNode(int id){
        node *node1 = searchById(id);

        if(node1){
           if(node1 == head && node1 == tail){
               head= tail = nullptr;
                cout<<"Node Deleted Successfully"<<endl;

           }
           else{
            node1->prev->next =node1->next;
            node1->next->prev = node1->prev;
            cout<<"Node Deleted Successfully"<<endl;
           }

        }
        else{
            cout<<"Node not found, error deleting it"<<endl;
        }
    }

    void deleteAll(){
        node *temp = head;

        while(temp){
            node *nextTemp = temp->next;
            delete temp;
            temp = nextTemp;

        }
        head = tail = nullptr;
        cout<<"Items deleted successfully"<<endl;
    }
    ~LinkedList(){
        deleteAll();
    }

};

int main()
{
    LinkedList list;
    char menu [7][20] = {"new", "display" , "Counter", "Search", "delete", "Insret After", "Delete All" };
    int index=0;
    char ch;

     do{
        system("cls");
        for(int i=0;i<7;i++){
            if(i==index)
                textattr(0x04);
            gotoxy(2,3+i);
            cout<<menu[i];
            textattr(0x07);
        }
        ch=getch();
        switch(ch){
        case -32:
            ch=getch();
            if(ch==72 && index > 0) index--; //up
            if(ch==80 && index < 7) index++; //down
            break;
        case 13:  //enter key

            if (index == 0) {
                    system("cls");
                    cout << "\nNew selected!" << endl;

                    int id, age;
                    string name;
                    cout<<"Enter the id: "<<endl;
                    cin>>id;
                    cout<<"Enter the age: "<<endl;
                    cin>>age;
                    cout<<"Enter the name: "<<endl;
                    cin>>name;
                    list.append(id, name , age);
                    cout<<"Item appended successfully"<<endl;
                    getch();

            }
            if (index == 1){
                system("cls");
                cout << "\nDisplay menu selected!" << endl;
                list.display();
                 getch();

            }
            if (index == 2) {
                system("cls");
                cout << "\nCounter selected!" << endl;
                cout<<"Count of nodes is : "<< list.countNodes();
                getch();
            }

            if (index == 3) {
                system("cls");
                cout << "\nSearch selected!" << endl;
                int id;
                cout<<"Enter id of employee you want to delete"<<endl;
                cin>>id;
                list.Search(id);

                getch();
            }
             if (index == 4) {
                system("cls");
                cout << "\Delete selected!" << endl;
                int id;
                cout<<"Enter id of employee you want to delete"<<endl;
                cin>>id;
                list.deleteNode(id);

                getch();
            } if (index == 5) {
                system("cls");
                cout << "\insert after selected!" << endl;
                int id;
                cout<<"Enter id of insertion"<<endl;
                cin>>id;

                int id2, age;
                string name;
                cout<<"Enter the id: "<<endl;
                cin>>id2;
                cout<<"Enter the age: "<<endl;
                cin>>age;
                cout<<"Enter the name: "<<endl;
                cin>>name;
                list.insertAfter(id, id2, name, age);
                list.display();

                getch();
            }

            if (index == 6) {
            system("cls");
            cout << "\Delete all  selected!" << endl;
            list.deleteAll();
            getch();
            }

            break;

        case 27:
            break;
        }
       } while(ch!=27);






    list.append(1, "Alice", 25);
    list.append(2, "Bob", 30);
    list.append(3, "Charlie", 35);
    list.display();


    cout << "Total nodes: " << list.countNodes() << endl;




    return 0;
}
