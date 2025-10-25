#include <iostream>

using namespace std;

int main()
{
    char c;
    do {
        system("cls");
        cout << "Menu:" << endl;
        cout << "n - New" << endl;
        cout << "d - Display" << endl;
        cout << "e - Exit" << endl;
        cout << "Enter your choice: ";
        cin >> c;

        if (c == 'n') {
            cout << "You selected new!" << endl;
            system("pause");
        }
        else if (c == 'd') {
            cout << "You selected display!" << endl;
            system("pause");
        }
        else if (c != 'e') {
            cout << "invalid choice! Please enter n, d, or e" << endl;
            system("pause");
        }
    } while (c!='e');

    return 0;
}
