#include <iostream>

using namespace std;

class MagicBox{
    int size=3;
    int row;
    int col;

public:
    MagicBox(int _size){
        size=_size;
        row = 0;
        col = size / 2;
    }
    int arr[15][15]={0};
    void PlaceNumbers(){
        arr[row][col] = 1;
         for (int i=2; i<=size*size; i++) {
            if ((i-1)% size == 0) {
                // increment the row
                row = (row + 1) % size;
            } else {
                // decrement row , decrement column
                row = (row - 1 + size) % size;
                col = (col - 1 + size) % size;
            }
            arr[row][col] = i;
        }
    }

    void PrintSquare(){
        cout << "Magic Square:" << endl;
        for (int i = 0; i < size; i++) {
            for (int j = 0; j < size; j++) {
                cout << arr[i][j]<< " ";
            }
            cout << endl;
        }
    }
};

int main()
{

    int size;
    cout<<"Enter the size of the magic box"<<endl;
    cin>>size;
    if(size%2==0){
        cout<<"Error, please enter odd number"<<endl;
        cin>>size;
    }
    MagicBox box1(size);
    box1.PlaceNumbers();
    box1.PrintSquare();



    return 0;
}
