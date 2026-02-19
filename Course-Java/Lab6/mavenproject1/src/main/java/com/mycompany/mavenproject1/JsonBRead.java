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

public class JsonBRead {
    public static void main(String[] args) {

        String json = "{\"id\":1,\"name\":\"Alice\",\"salary\":5000.0}";

        Jsonb jsonb = JsonbBuilder.create();

        Employee emp = jsonb.fromJson(json, Employee.class);

        System.out.println(emp); 
    }
}
