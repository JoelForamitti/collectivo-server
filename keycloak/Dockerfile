FROM quay.io/keycloak/keycloak:22.0 as builder

# Enable health and metrics support
ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true

# Configure a database vendor
ENV KC_DB=postgres

WORKDIR /opt/keycloak

# Install start script
USER root
COPY ./scripts/kcWithAutoImport.sh /opt/keycloak/bin/kcWithAutoImport.sh
RUN chmod +x /opt/keycloak/bin/kcWithAutoImport.sh && chown keycloak:root /opt/keycloak/bin/kcWithAutoImport.sh

USER keycloak

RUN /opt/keycloak/bin/kc.sh build --db=postgres
RUN /opt/keycloak/bin/kc.sh show-config

FROM quay.io/keycloak/keycloak:22.0
COPY --from=builder /opt/keycloak/ /opt/keycloak/

COPY ./scripts/kcWithAutoImport.sh /opt/keycloak/bin/kcWithAutoImport.sh

ENTRYPOINT [ "/opt/keycloak/bin/kcWithAutoImport.sh" ]
