# Stage 1: Build the application
FROM maven:3.8.4-openjdk-17 AS builder
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
# Mount secrets
RUN --mount=type=secret,id=app_google_apikey,dst=/run/secrets/app_google_apikey \
    sh -c 'export app_google_apikey=$(cat /run/secrets/app_google_apikey)' 
RUN cat /run/secrets/app_google_apikey
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM openjdk:17-jdk-slim
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]
