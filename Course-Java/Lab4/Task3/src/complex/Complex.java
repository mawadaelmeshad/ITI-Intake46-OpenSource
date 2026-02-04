/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package complex;

/**
 *
 * @author mawad
 */
public interface Complex<T> {
    T getReal();
    T getImaginary();

   Complex<T> add(Complex<T> z);
   Complex<T> subtract(Complex<T> z);
   Complex<T> multiply(Complex<T> z);
   Complex<T> divide(Complex<T> z);
    
}
