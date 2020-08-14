FROM openjdk:8-jdk-alpine
VOLUME /tmp
EXPOSE 8080
ADD softplan-server/target/softplan-0.0.1-SNAPSHOT.jar softplan_app.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/softplan_app.jar"]