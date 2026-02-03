/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package task2;
import java.util.function.Function;


/**
 *
 * @author mawad
 */
public class Equation  implements Function <Double[], String>{
    @Override
    public String apply(Double[] arr){
        double a = arr[0];
        if(a==0){
            throw new IllegalArgumentException("a must not be zero (not a quadratic equation)");
        }
        double b= arr[1];
        double c = arr[2];
         double underRootPart = (b * b) - (4 * a * c);
         
          if (underRootPart > 0) {
            double x1 = (-b + Math.sqrt(underRootPart)) / (2 * a);
            double x2 = (-b - Math.sqrt(underRootPart)) / (2 * a);
            return "Two roots: x1 = " + x1 + ", x2 = " + x2;
        } else if (underRootPart == 0) {
            double x = -b / (2 * a);
            return "One root: x = " + x;
        } else {
            return "No real roots";
        }
         
        
    }
    
    
    
}
