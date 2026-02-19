package com.mycompany.mavenproject1;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author mawad
 */
import com.mycompany.mavenproject1.Employee;
import jakarta.json.bind.*;

public class JsonBWrite {
    public static void main(String[] args) {

        Employee emp = new Employee(1, "Alice", 5000.0);

        Jsonb jsonb = JsonbBuilder.create();

        String json = jsonb.toJson(emp);
        System.out.println(json);

        
    }
}