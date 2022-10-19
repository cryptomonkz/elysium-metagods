package com.elysium.metagods.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties(prefix = "application")
public class ApplicationConfigurationProperties {

    @Data
    public static class AuthenticationConfigurationProperties {
        private Long nonceLifetimeSeconds;
    }

    @Data
    public static class TokenOwnerConfigurationProperties {
        private Long resyncAfterSeconds;
    }

    @Data
    public static class Web3ConfigurationProperties {
        private String serviceURL;
        private Long withdrawalLifetimeSeconds;
        private Long withdrawalLifetimeReserveSeconds;
        private Long weaponPrice;
        private Long weaponMintLifetimeSeconds;
        private Long weaponMintLifetimeReserveSeconds;
        private Boolean weaponMintCelestialExclusive;
    }

    @Data
    public static class InstanceConfigurationProperties {
        private Boolean withEntities;
        private Boolean withTriggers;
    }

    private AuthenticationConfigurationProperties authentication;
    private TokenOwnerConfigurationProperties tokenOwner;
    private Web3ConfigurationProperties web3;
    private InstanceConfigurationProperties instance;

}
