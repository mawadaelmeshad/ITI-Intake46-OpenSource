#include <iostream>

using namespace std;

int main()
{
    int arr[10]={10,9,8,2,3,1,5,4,6,7};

    for(int i=1;i<10;i++){
        int key=arr[i];
        int j=i-1;
        while(j>=0 && arr[j]>key){
            arr[j+1]=arr[j];
            j--;
        }
         arr[j+1]=key;


    }

    for(int i=0;i<10;i++){
        cout<<arr[i]<<" ";
    }
    return 0;
}
