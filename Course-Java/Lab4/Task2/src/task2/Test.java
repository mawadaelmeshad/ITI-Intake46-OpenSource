/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package task2;

import shapes.Shape;
import java.util.List;

/**
 *
 * @author mawad
 */
public class Test {
    public static void drawShapes(List<? extends Shape> shapes){
        for(Shape s : shapes){
            s.draw();
        }
        
    }
    
}
