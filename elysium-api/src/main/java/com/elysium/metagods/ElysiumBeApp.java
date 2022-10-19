package com.elysium.metagods;

import com.elysium.metagods.config.ApplicationConfigurationProperties;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.liquibase.LiquibaseProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.core.env.Environment;
import tech.jhipster.config.DefaultProfileUtil;
import tech.jhipster.config.JHipsterConstants;

import javax.annotation.PostConstruct;
import java.lang.management.ManagementFactory;
import java.lang.management.MemoryMXBean;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Arrays;
import java.util.Collection;
import java.util.Optional;

@Slf4j
@AllArgsConstructor
@SpringBootApplication
@EnableConfigurationProperties({
    LiquibaseProperties.class,
    ApplicationConfigurationProperties.class,
})
public class ElysiumBeApp {

    private static final int MB = 1024 * 1024;
    private static final String SPRING_PROFILES_ACTIVE = "SPRING_PROFILES_ACTIVE";
    private static final String APPLICATION_INSTANCE_WITH_ENTITIES = "APPLICATION_INSTANCE_WITH_ENTITIES";
    private static final String APPLICATION_INSTANCE_WITH_TRIGGERS = "APPLICATION_INSTANCE_WITH_TRIGGERS";
    private static final String APPLICATION_WEB3_SERVICE_URL = "APPLICATION_WEB3_SERVICE_URL";

    private final Environment env;

    /**
     * Initializes elysiumBe.
     * <p>
     * Spring profiles can be configured with a program argument --spring.profiles.active=your-active-profile
     * <p>
     * You can find more information on how profiles work with JHipster on <a href="https://www.jhipster.tech/profiles/">https://www.jhipster.tech/profiles/</a>.
     */
    @PostConstruct
    public void initApplication() {
        Collection<String> activeProfiles = Arrays.asList(env.getActiveProfiles());
        if (
            activeProfiles.contains(JHipsterConstants.SPRING_PROFILE_DEVELOPMENT) &&
            activeProfiles.contains(JHipsterConstants.SPRING_PROFILE_PRODUCTION)
        ) {
            log.error(
                "You have misconfigured your application! It should not run " + "with both the 'dev' and 'prod' profiles at the same time."
            );
        }
        if (
            activeProfiles.contains(JHipsterConstants.SPRING_PROFILE_DEVELOPMENT) &&
            activeProfiles.contains(JHipsterConstants.SPRING_PROFILE_CLOUD)
        ) {
            log.error(
                "You have misconfigured your application! It should not " + "run with both the 'dev' and 'cloud' profiles at the same time."
            );
        }
    }

    /**
     * Main method, used to run the application.
     *
     * @param args the command line arguments.
     */
    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(ElysiumBeApp.class);
        DefaultProfileUtil.addDefaultProfile(app);
        Environment env = app.run(args).getEnvironment();
        logApplicationStartup(env);

        MemoryMXBean memoryBean = ManagementFactory.getMemoryMXBean();
        long xmx = memoryBean.getHeapMemoryUsage().getMax() / MB;
        long xms = memoryBean.getHeapMemoryUsage().getInit() / MB;
        log.info("Initial Memory (xms) : {}mb", xms);
        log.info("{}: {}", SPRING_PROFILES_ACTIVE, env.getProperty(SPRING_PROFILES_ACTIVE));
        log.info("{}: {}", APPLICATION_INSTANCE_WITH_ENTITIES, env.getProperty(APPLICATION_INSTANCE_WITH_ENTITIES));
        log.info("{}: {}", APPLICATION_INSTANCE_WITH_TRIGGERS, env.getProperty(APPLICATION_INSTANCE_WITH_TRIGGERS));
        log.info("{}: {}", APPLICATION_WEB3_SERVICE_URL, env.getProperty(APPLICATION_WEB3_SERVICE_URL));
    }

    private static void logApplicationStartup(Environment env) {
        String protocol = Optional.ofNullable(env.getProperty("server.ssl.key-store")).map(key -> "https").orElse("http");
        String serverPort = env.getProperty("server.port");
        String contextPath = Optional
            .ofNullable(env.getProperty("server.servlet.context-path"))
            .filter(StringUtils::isNotBlank)
            .orElse("/");
        String hostAddress = "localhost";
        try {
            hostAddress = InetAddress.getLocalHost().getHostAddress();
        } catch (UnknownHostException e) {
            log.warn("The host name could not be determined, using `localhost` as fallback");
        }
        log.info(
            "\n----------------------------------------------------------\n\t" +
            "Application '{}' is running! Access URLs:\n\t" +
            "Local: \t\t{}://localhost:{}{}\n\t" +
            "External: \t{}://{}:{}{}\n\t" +
            "Profile(s): \t{}\n----------------------------------------------------------",
            env.getProperty("spring.application.name"),
            protocol,
            serverPort,
            contextPath,
            protocol,
            hostAddress,
            serverPort,
            contextPath,
            env.getActiveProfiles().length == 0 ? env.getDefaultProfiles() : env.getActiveProfiles()
        );
    }
}
