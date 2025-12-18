# Use Java 21
FROM eclipse-temurin:21-jdk

# App directory
WORKDIR /app

# Copy jar
COPY target/ai-task-manager-0.0.1-SNAPSHOT.jar app.jar

# Expose port
EXPOSE 8080

# Run app
ENTRYPOINT ["java","-jar","/app/app.jar","--spring.profiles.active=prod"]
