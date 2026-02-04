/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package task2;
import shapes.*;
import java.util.*;
/**
 *
 * @author mawad
 */
public class Task2 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
         List<Shape> shapes = new ArrayList<>();
          shapes.add(new Rect());
          shapes.add(new Circle());
          Test.drawShapes(shapes);
          
    }
    
}
