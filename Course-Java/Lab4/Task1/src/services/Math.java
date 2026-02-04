package services;
import exceptions.NegativeNumException;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
/**
 *
 * @author mawad
 */
public class Math {
    public int factorial(int x) throws NegativeNumException {
        if (x < 0){
            throw new NegativeNumException();
        }
        int res = 1;
        for (int i = 1; i <= x; i++)
            res *= i;
        return res;
    }
    public int square(int x) throws NegativeNumException {
        if (x < 0)
            throw new NegativeNumException();
        return x * x;
    }
     public int cube(int x) throws NegativeNumException {
        if (x < 0)
            throw new NegativeNumException();
        return x * x * x;
    }

    
}
