#include <iostream>
struct node{
    int id;
    node *left;
    node *right;
};
class BST{
    node *root;

private:
    void insertRecursive(node *&r, node* t){
        if(r==nullptr){
            r=t;
        }
        else if(t->id < r->id){
            insertRecursive(r->left, t);
        }
        else{
            insertRecursive(r->right, t);
        }
    }
     node* Search(node* r, int &id){
        if(r==nullptr){
            return nullptr;
        }
        else if(id==r->id){
            return r;
        }
        else if(id<r->id){
            return Search(r->left, id);
        }
        else{
            return Search(r->right, id);
        }
    }

public:
    BST(){
        root=nullptr;
    }
    void insertt(int id){
        node * temp = new node();
        temp->right = temp->left = nullptr;
        temp->id= id;
        insertRecursive(root, temp);
    }
    void searchId(int id){
        Search(root, id);
    }

};
using namespace std;

int main()
{
    BST b1;
    b1.insertt(10);
  b1.searchId(10);
    return 0;
}
