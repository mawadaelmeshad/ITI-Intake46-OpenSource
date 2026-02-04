/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package task3;
import complex.Complex;
import complex.ComplexNum;



/**
 *
 * @author mawad
 */
public class Task3 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Complex<Double> c1 = new ComplexNum(3.0, 4.0);
        Complex<Double> c2 = new ComplexNum(1.0, 2.0);
        
        Complex<Double> sum = c1.add(c2);
        System.out.println("c1 + c2 = " + sum);
        
    }
    
}
