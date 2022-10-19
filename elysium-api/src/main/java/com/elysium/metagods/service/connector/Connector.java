package com.elysium.metagods.service.connector;

import lombok.AllArgsConstructor;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.function.Supplier;

@Service
@AllArgsConstructor
public abstract class Connector {

    private final RestTemplate restTemplate;

    protected <T, U> Optional<T> doGet(
            UriComponentsBuilder uriComponentsBuilder,
            Supplier<HttpEntity<U>> httpEntitySupplier,
            Supplier<ParameterizedTypeReference<T>> typeReferenceSupplier
    ) {
        return call(uriComponentsBuilder, HttpMethod.GET, httpEntitySupplier, typeReferenceSupplier);
    }

    protected <T, U> Optional<T> doPost(
        UriComponentsBuilder uriComponentsBuilder,
        Supplier<HttpEntity<U>> httpEntitySupplier,
        Supplier<ParameterizedTypeReference<T>> typeReferenceSupplier
    ) {
        return call(uriComponentsBuilder, HttpMethod.POST, httpEntitySupplier, typeReferenceSupplier);
    }

    protected <T, U> Optional<ResponseEntity<T>> doCall(
            UriComponentsBuilder uriComponentsBuilder,
            HttpMethod httpMethod,
            Supplier<HttpEntity<U>> httpEntitySupplier,
            Supplier<ParameterizedTypeReference<T>> typeReferenceSupplier
    ) {
        URI uri = uriComponentsBuilder.build().toUri();
        ResponseEntity<T> responseEntity = restTemplate.exchange(
                uri,
                httpMethod,
                httpEntitySupplier.get(),
                typeReferenceSupplier.get()
        );
        return Optional.of(responseEntity);
    }

    protected <T, U> Optional<T> call(
            UriComponentsBuilder uriComponentsBuilder,
            HttpMethod httpMethod,
            Supplier<HttpEntity<U>> httpEntitySupplier,
            Supplier<ParameterizedTypeReference<T>> typeReferenceSupplier
    ) {
        return doCall(uriComponentsBuilder, httpMethod, httpEntitySupplier, typeReferenceSupplier)
                .map(HttpEntity::getBody);
    }

    private static HttpHeaders getHttpHeaders(Map<String, String> headers) {
        HttpHeaders httpHeaders = new HttpHeaders();
        headers.forEach(httpHeaders::add);
        return httpHeaders;
    }

    protected static <U> HttpEntity<U> getHttpEntity(Map<String, String> headers) {
        HttpHeaders httpHeaders =
                Optional.ofNullable(headers).map(Connector::getHttpHeaders).orElseGet(HttpHeaders::new);
        return new HttpEntity<>(httpHeaders);
    }

    protected static <U> HttpEntity<U> getHttpEntity(U body, Map<String, String> headers) {
        return Optional.ofNullable(body)
                       .map(nonNullBody -> new HttpEntity<>(body, getHttpHeaders(headers)))
                       .orElseGet(() -> getHttpEntity(headers));
    }

    protected static <U> HttpEntity<U> getHttpEntity(U body) {
        return getHttpEntity(body, Collections.emptyMap());
    }

    protected static <U> HttpEntity<U> getHttpEntity() {
        return getHttpEntity(Collections.emptyMap());
    }

    protected static <U> HttpEntity<U> getHttpEntityWithJSON(U body) {
        Map<String, String> headers = new HashMap<>();
        headers.put(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE);
        headers.put(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
        return getHttpEntity(body, headers);
    }

}

