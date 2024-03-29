import com.google.protobuf.gradle.id

plugins {
    java
    id("org.springframework.boot") version "3.2.2"
    id("io.spring.dependency-management") version "1.1.4"
    id("com.google.protobuf") version "0.9.4"
}

group = "com.spring.boot"
version = "0.0.1-SNAPSHOT"


java {
    sourceCompatibility = JavaVersion.VERSION_17
}

configurations {
    compileOnly {
        extendsFrom(configurations.annotationProcessor.get())
    }
}

repositories {
    mavenCentral()
}



protobuf {
    protoc {
        artifact = "com.google.protobuf:protoc:3.25.2"
    }

    plugins {
        // Optional: an artifact spec for a protoc plugin, with "grpc" as
        // the identifier, which can be referred to in the "plugins"
        // container of the "generateProtoTasks" closure.
        id("grpc") {
            artifact = "io.grpc:protoc-gen-grpc-java:1.61.0"
        }
    }

    generateProtoTasks {
        all().forEach {
            it.plugins {
                id("grpc") {
                }
            }
        }
    }
}

sourceSets {
    main {
        // Include the generated files in the main source set
        java {
            srcDirs("build/generated/source/proto/main/grpc")
        }
    }
}

dependencies {
    implementation("org.springframework.security:spring-security-config:6.2.1")
    implementation("com.corundumstudio.socketio:netty-socketio:2.0.8")
    implementation("io.jsonwebtoken:jjwt-gson:0.12.5")
    runtimeOnly("io.jsonwebtoken:jjwt-orgjson:0.12.5")

    implementation("io.jsonwebtoken:jjwt-api:0.12.5")
    runtimeOnly("io.jsonwebtoken:jjwt-impl:0.12.5")
    runtimeOnly("io.jsonwebtoken:jjwt-jackson:0.12.5")
    compileOnly("javax.annotation:javax.annotation-api:1.3.2")
    implementation("com.google.protobuf:protobuf-java:3.25.2")
    implementation("io.grpc:grpc-protobuf:1.61.0")
    implementation("io.grpc:protoc-gen-grpc-java:1.61.0")
    implementation("io.grpc:grpc-stub:1.61.0")
    implementation("io.github.lognet:grpc-spring-boot-starter:5.1.5")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.boot:spring-boot-starter-validation")
    implementation("org.springframework.boot:spring-boot-starter-web")
    compileOnly("org.projectlombok:lombok")
    runtimeOnly("org.postgresql:postgresql")
    annotationProcessor("org.projectlombok:lombok")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.springframework.security:spring-security-test")

    protobuf(files("src/proto/"))

}

tasks.withType<Test> {
    useJUnitPlatform()
}