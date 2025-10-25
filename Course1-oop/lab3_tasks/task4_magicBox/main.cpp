#include <iostream>

using namespace std;

int main()
{
    int size;
    cout<<"Enter the size of the magic box"<<endl;
    cin>>size;
    if(size%2==0){
        cout<<"Error, please enter odd number"<<endl;
        cin>>size;
    }
    int arr[size][size]={0};

    // place 1
    int row = 0;
    int col = size / 2;
    arr[row][col] = 1;

     for (int i=2; i<=size*size; i++) {
        if ((i-1)%size == 0) {
            // increment the row
            row = (row + 1) % size;
        } else {
            // decrement row , decrement column
            row = (row - 1 + size) % size;
            col = (col - 1 + size) % size;
        }

        arr[row][col] = i;
    }

    cout << "Magic Square:" << endl;
    for (int i = 0; i < size; i++) {
        for (int j = 0; j < size; j++) {
            cout << arr[i][j]<< " ";
        }
        cout << endl;
    }

    return 0;
}
