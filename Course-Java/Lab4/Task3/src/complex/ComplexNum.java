/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package complex;

/**
 *
 * @author mawad
 */
public class ComplexNum implements Complex<Double> {
    private  Double real;
    private Double imaginary;
    public ComplexNum(Double real, Double imaginary) {
        this.real = real;
        this.imaginary = imaginary;
    }
     @Override
    public Double getReal() {
        return real;
    }
    
    @Override
    public Double getImaginary() {
        return imaginary;
    }
    
     @Override
    public Complex<Double> add(Complex<Double> other) {
        Double newReal = this.real + other.getReal();
        Double newImaginary = this.imaginary + other.getImaginary();
        return new ComplexNum(newReal, newImaginary);
    }
     @Override
    public Complex<Double> subtract(Complex<Double> other) {
        Double newReal = this.real - other.getReal();
        Double newImaginary = this.imaginary - other.getImaginary();
        return new ComplexNum(newReal, newImaginary);
    }
    
    @Override
    public Complex<Double> multiply(Complex<Double> other) {
        Double newReal = (this.real * other.getReal()) - (this.imaginary * other.getImaginary());
        Double newImaginary = (this.real * other.getImaginary()) + (this.imaginary * other.getReal());
        return new ComplexNum(newReal, newImaginary);
    }
    
     @Override
    public Complex<Double> divide(Complex<Double> other) {
        Double c = other.getReal();
        Double d = other.getImaginary();
        Double denominator = (c * c) + (d * d);
        
        if (denominator == 0) {
            throw new ArithmeticException("Cannot divide by zero");
        }
        
        Double newReal = ((this.real * c) + (this.imaginary * d)) / denominator;
        Double newImaginary = ((this.imaginary * c) - (this.real * d)) / denominator;
        return new ComplexNum(newReal, newImaginary);
    }
    @Override
    public String toString() {
        if (imaginary >= 0)
            return real + " + " + imaginary + "i";
        else
            return real + " - " + (-imaginary) + "i";
    }
    
}
