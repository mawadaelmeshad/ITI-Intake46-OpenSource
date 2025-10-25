#include <iostream>

using namespace std;

int main()
{
    int arr[10];
    for(int i=0;i<10;i++){

        cout<<"enter the value of arr["<<i<<"]"<<endl;
        cin>>arr[i];
    }
    int result=0;

     for(int i=0;i<10;i++){
        int target=arr[i];
        for(int j=i+1;j<10;j++){
            if(arr[j]==target){
                int distance = j-i-1;
                if(distance > result){
                    result = distance;
                }
            }
        }
    }
    cout<<result<<endl;


    return 0;
}
