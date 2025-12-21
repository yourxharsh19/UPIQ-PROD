package com.upiq;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

/**
 * Unified Spring Boot application for UPIQ.
 * 
 * This application merges multiple microservices into a single deployment unit
 * for simplified hosting and deployment (portfolio-ready).
 * 
 * It can be split back into microservices by separating the packages 
 * and introducing a service registry (Eureka) and API Gateway.
 */
@SpringBootApplication
@EntityScan(basePackages = "com.upiq")
@EnableJpaRepositories(basePackages = "com.upiq")
public class UpiqApplication {

    public static void main(String[] args) {
        SpringApplication.run(UpiqApplication.class, args);
    }
}
