#include <iostream>

using namespace std;

int partition(int arr[], int start, int end) {
    int pivot = arr[end];
    int i = start - 1;

    for (int j = start; j < end; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[end]);
    return i + 1;
}

void quickSort(int arr[], int start, int end) {
    if (start < end) {
        int pi = partition(arr, start, end);
        quickSort(arr, start, pi - 1);
        quickSort(arr, pi + 1, end);
    }
}
int main()
{
    int arr[10]={10,9,8,2,3,1,5,4,6,7};

    quickSort(arr, 0, 9);

    for (int i = 0; i < 10; i++) {
        cout << arr[i] << " ";
    }
    return 0;
}
