package com.example.examproject_kommunevalg_20_12_2021.repository;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

@Configuration
@PropertySource("classpath:application.properties")
public class DatabaseConnection {
    private static Connection connection;


    @Value("root")
    public void setUserStatic(String value) {
        userStatic = value;
    }

    @Value("passwordHere")
    public void setPasswordStatic(String value) {
        passwordStatic = value;
    }

    @Value("jdbc:mysql://127.0.0.1:3306/exam_db?serverTimezone=UTC")
    public void setUrlStatic(String value) {
        urlStatic = value;
    }

    public static String userStatic;

    public static String passwordStatic;

    public static String urlStatic;



    public static Connection getConnection()  {

        try {
            if (connection != null && connection.isValid(10)) {
                return connection;
            }
            userStatic="root";
            connection = DriverManager.getConnection(urlStatic, userStatic, passwordStatic);
        }

        catch (SQLException ignored) {

        }

        return connection;
    }

}