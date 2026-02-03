package task1;
import java.util.function.Function;


/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author mawad
 */
public class Temp implements Function<Float, Float> {
    @Override
    public Float apply(Float t){
        return (float)((t*1.8)+ 32);
    }
    
}
