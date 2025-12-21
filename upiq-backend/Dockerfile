# Build stage
FROM maven:3.9.7-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Run stage
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENV SPRING_PROFILES_ACTIVE=prod

ENTRYPOINT ["java", "-jar", "app.jar"]

# ARCHITECTURAL TRADEOFFS EXPLANATION:
# Why merged? 
# - Cost-effective hosting for portfolio (runs on 1GB RAM instead of 4GB+ needed for 5 services).
# - Easier management/deployment for simple production use cases.
# How to split back?
# - Packages are already separated (auth, transaction, category, pdf).
# - Simply create new poms for each package and re-introduce Spring Cloud Gateway/Eureka.
