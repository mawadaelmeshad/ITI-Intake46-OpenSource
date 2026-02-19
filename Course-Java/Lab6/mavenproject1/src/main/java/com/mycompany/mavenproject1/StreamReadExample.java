package com.mycompany.mavenproject1;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author mawad
 */

import jakarta.json.Json;
import jakarta.json.stream.JsonParser;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

public class StreamReadExample {
    public static void main(String[] args) throws IOException {
        try (FileInputStream fis = new FileInputStream("newjson.json");
             JsonParser parser = Json.createParser(fis)) {
            while (parser.hasNext()) {
                JsonParser.Event event = parser.next();
                switch (event) {
                    case KEY_NAME:
                        System.out.println("Key: " + parser.getString());
                        break;
                    case VALUE_STRING:
                        System.out.println("String Value: " + parser.getString());
                        break;
                    case VALUE_NUMBER:
                        System.out.println("Number Value: " + parser.getInt());
                        break;
                    case START_OBJECT:
                        System.out.println("{ Object Start }");
                        break;
                    case END_OBJECT:
                        System.out.println("{ Object End }");
                        break;
                    case START_ARRAY:
                        System.out.println("[ Array Start ]");
                        break;
                    case END_ARRAY:
                        System.out.println("[ Array End ]");
                        break;

                }
            }
        } catch (FileNotFoundException e) {
        }
    }
}