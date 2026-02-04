/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package task1;
import services.Math;
/**
 *
 * @author mawad
 */
public class Task1 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Math m = new Math();
        try{
            System.out.print(m.factorial(-2));
            
        }
        catch(Exception e){
            
            System.out.print(e.getMessage());
        }
        
        
    }
    
}
