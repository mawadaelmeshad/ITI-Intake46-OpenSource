/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package task1;

import data.City;
import data.Country;
import data.ReadData;
import java.util.*;
import java.util.stream.*;

/**
 *
 * @author mawad
 */
public class Task1 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        ReadData readData = new ReadData("Countries.csv", "Cities.csv" );  
        List<Country> countries = readData.getCountries();
        List<City> cities = readData.getCities();

        System.out.println(countries.size());
        System.out.println(cities.size());
        
        System.out.println("Highest populated city of each country:");

        Map<String, Optional<City>> highestCityPerCountry =
                cities.stream()
                      .collect(Collectors.groupingBy(
                              City::getCountryCode,
                              Collectors.maxBy(
                                      Comparator.comparingInt(City::getPopulation)
                              )
                      ));

        highestCityPerCountry.forEach((code, cityOpt) -> {
            cityOpt.ifPresent(city ->
                    System.out.println(code + " : " +city.getName() + " (" + city.getPopulation() + ")")
            );
        });
        
        
        System.out.println("\nMost populated country of each continent:");

        Map<String, Optional<Country>> highestCountryPerContinent =
                countries.stream()
                         .collect(Collectors.groupingBy(
                                 Country::getContinent,
                                 Collectors.maxBy(
                                         Comparator.comparingInt(Country::getPopulation)
                                 )
                         ));

        highestCountryPerContinent.forEach((continent, countryOpt) -> {
            countryOpt.ifPresent(country ->
                    System.out.println(continent + " : " +country.getName() + " (" + country.getPopulation() + ")")
            );
        });
        
        
        System.out.println("\nHighest populated capital city:");

        Optional<City> highestCapital =
                cities.stream()
                      .filter(city ->
                              countries.stream()
                                       .anyMatch(country ->
                                               country.getCapital() == city.getId()
                                       )
                      )
                      .max(Comparator.comparingInt(City::getPopulation));

        highestCapital.ifPresent(city ->
                System.out.println(city.getName() +
                        " (" + city.getPopulation() + ")")
        );

              
    }
    
}
