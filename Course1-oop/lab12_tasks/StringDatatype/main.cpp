#include <iostream>

using namespace std;
template <class t>
class String{
    t* arr;
    int size;
public:
    String(){
    size=0;
    arr= new t[1];
    arr[0]=t('\0');
    }
    String(const t* str){
        if(!str){
            size=0;
            arr= new t[1];
            arr[0]=t('\0');
        }
        else{
            size=0;
            while(str[size] != '\0') size++;
            arr = new t[size+1];
            for(int i=0;i<size;i++){
                arr[i] = str[i];
            }
            arr[size]='\0';
        }

    }

    String(int _size) {
        size = _size;
        arr = new t[size + 1];
        for (int i = 0; i < size; i++) {
            arr[i] = t('\0');
        }
        arr[size] = t('\0');
    }

    String(const String& c){
        size=c.size;
        arr= new t[size+1];
        for(int i=0;i<size;i++){
            arr[i]= c.arr[i];
        }
        arr[size] = t('\0');
    }
    ~String(){
        delete [] arr;
    }

    void display() const {
        for (int i = 0; i < size; i++) {
            cout << arr[i];
        }
        cout<<endl;
    }

    String operator=(String& s){
        if(this != &s){
            delete [] arr;
            size=s.size;
            arr= new t[size+1];
            for(int i=0;i<size;i++){
                arr[i]=s.arr[i];
            }
            arr[size]=t('\0');
        }
        return *this;
    }

    String operator+(String& s){
           int new_size=s.size+size;
           String res(new_size);
            for(int i=0;i<size;i++){
                res.arr[i]=arr[i];
            }
            for(int i=0;i<res.size;i++){
                res.arr[s.size+i]=s.arr[i];
            }
            res.arr[new_size]=t('\0');

        return res;
    }
    bool operator<(String& s){
        int i = 0;
        while (i < size && i < s.size) {
            if (arr[i] < s.arr[i]) return true;
            if (arr[i] > s.arr[i]) return false;
            i++;
        }
        return size < s.size;
    }
    bool operator>(String& s) {
        return s < *this;
    }


    bool operator==(String& s) const {
        if (size != s.size) return false;
        for (int i = 0; i < size; i++) {
            if (arr[i] != s.arr[i]) return false;
        }
        return true;
    }
    String toLower(){
        for(int i=0;i<size;i++){
            if(arr[i] >='A' && arr[i]<= 'Z'){
                arr[i]= arr[i] + 32;
            }
        }
        return *this;
    }


     String toUpper(){
        for(int i=0;i<size;i++){
            if(arr[i] >='a' && arr[i]<= 'z'){
                arr[i]= arr[i] - 32;
            }
        }
        return *this;
    }


};

int main()
{
  String<char> s1("MAWAda");
   cout<<"s1 : ";
    s1.display();  // mawada

    String<char> s3;
    s3 = s1;
    cout<<"s3 assigned to s1 : ";
    s3.display();  // mawada

    String<char> s4 = s3 + s1;
    cout<<"s4 concatenation : ";
    s4.display();
    cout<<"s4 ";
    cout<<"To Lower: "<<endl;
    s4.toLower();
    s4.display();
    cout<<"s4 ";
    cout<<"To Upper: "<<endl;
    s4.toUpper();
    s4.display();
    if(s4<s1){
        cout<<"s4 Less than s1"<<endl;
    }
    else if(s4>s1){
        cout<<"s4 Bigger than s1"<<endl;
    }
    return 0;
}
