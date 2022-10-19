FROM openjdk:11 as build

ARG BUILD_NUMBER

RUN mkdir /app
WORKDIR /app
COPY . /app/
RUN chmod +x gradlew
RUN ./gradlew -PbuildNumber=$BUILD_NUMBER clean assemble --stacktrace
RUN cp build/libs/*.jar /app/app.jar

# clean up
FROM openjdk:11
RUN mkdir /app
WORKDIR /app

COPY --from=build /app/app.jar /app/app.jar

ENTRYPOINT exec java -Xms256m -Xmx2048m  -jar /app/app.jar
EXPOSE 8080

