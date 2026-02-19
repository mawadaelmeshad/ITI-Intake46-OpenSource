package com.mycompany.mavenproject1;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author mawad
 */
import jakarta.json.*;
import jakarta.json.stream.*;
import java.io.*;
import java.util.Map;

public class StreamWrite {
    public static void main(String[] args) throws Exception {

        FileWriter fw = new FileWriter("stream_output.json");

        Map<String, Object> config = new java.util.HashMap<>();
        config.put(JsonGenerator.PRETTY_PRINTING, true);

        JsonGeneratorFactory factory = Json.createGeneratorFactory(config);
        JsonGenerator gen = factory.createGenerator(fw);

        gen.writeStartObject()                      // {
            .write("company", "TechCorp")
            .writeStartArray("employees")           //   "employees": [
                .writeStartObject()                 //     {
                    .write("id", 1)
                    .write("name", "Alice")
                    .write("salary", 5000.0)
                .writeEnd()                         //     }
                .writeStartObject()
                    .write("id", 2)
                    .write("name", "Bob")
                    .write("salary", 6000.0)
                .writeEnd()
            .writeEnd()                             //   ]
        .writeEnd();                                // }

        gen.close();
        fw.close();
        System.out.println("Stream write done!");
    }
}
