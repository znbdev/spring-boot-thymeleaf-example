# Spring Boot Thymeleaf example: CRUD Application

Build a Spring Boot Thymeleaf CRUD example with Maven that use Spring Data JPA to interact with H2/MySQL/PostgreSQL
database. You'll know:

- How to configure Spring Data, JPA, Hibernate to work with Database
- How to define Data Entity and Repository interfaces
- Way to create Spring Controller to process HTTP requests
- Way to use Spring Data JPA to interact with H2/MySQL/PostgreSQL Database
- How to use Thymeleaf template engine for View layer

# Requirement

* JDK 1.8

# Installation

### Build code
##### Using Gradle
```shell
./gradlew wrapper
./gradlew clean build --refresh-dependencies
./gradlew clean build -PskipTests=true --refresh-dependencies
./gradlew clean build --refresh-dependencies --stacktrace
```
##### Using Maven
```shell
cd [target repository dir]
mvn dependency:purge-local-repository
mvn clean install -Dmaven.test.skip -Dcheckstyle.skip
mvn dependency:tree -Dverbose
mvn dependency:tree | grep tomcat
mvn dependency:tree | grep LocalStrings
```

