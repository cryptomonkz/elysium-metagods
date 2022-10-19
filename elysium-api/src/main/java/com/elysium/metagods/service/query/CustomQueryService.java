package com.elysium.metagods.service.query;


import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Root;
import java.util.Collection;
import java.util.function.Function;

import org.springframework.data.jpa.domain.Specification;

import com.elysium.metagods.service.filter.StringCaseInsensitiveFilter;
import tech.jhipster.service.QueryService;

public abstract class CustomQueryService<ENTITY> extends QueryService<ENTITY> {

    protected Specification<ENTITY> buildSpecification(
        StringCaseInsensitiveFilter filter,
        Function<Root<ENTITY>, Expression<String>> metaclassFunction
    ) {
        if (filter.getEquals() != null) {
            return equalsIgnoreCaseSpecification(metaclassFunction, filter.getEquals());
        } else if (filter.getNotEquals() != null) {
            return notEqualsIgnoreCaseSpecification(metaclassFunction, filter.getNotEquals());
        } else if (filter.getIn() != null) {
            return valueInIgnoreCase(metaclassFunction, filter.getIn());
        } else if (filter.getNotIn() != null) {
            return valueNotInIgnoreCase(metaclassFunction, filter.getNotIn());
        } else {
            return super.buildSpecification(filter, metaclassFunction);
        }
    }

    protected Specification<ENTITY> equalsIgnoreCaseSpecification(
        Function<Root<ENTITY>,
            Expression<String>> metaclassFunction, String value
    ) {
        return (root, query, builder) -> builder.equal(
            builder.lower(metaclassFunction.apply(root)),
            value.toLowerCase()
        );
    }

    protected Specification<ENTITY> notEqualsIgnoreCaseSpecification(
        Function<Root<ENTITY>, Expression<String>> metaclassFunction,
        String value
    ) {
        return (root, query, builder) -> builder.not(builder.equal(
            builder.lower(metaclassFunction.apply(root)),
            value.toLowerCase()
        ));
    }

    protected Specification<ENTITY> valueInIgnoreCase(
        Function<Root<ENTITY>, Expression<String>> metaclassFunction,
        Collection<String> values
    ) {
        return (root, query, builder) -> {
            CriteriaBuilder.In<String> in = builder.in(builder.lower(metaclassFunction.apply(root)));
            for (String value : values) {
                in = in.value(value.toLowerCase());
            }
            return in;
        };
    }

    protected Specification<ENTITY> valueNotInIgnoreCase(
        Function<Root<ENTITY>, Expression<String>> metaclassFunction,
        Collection<String> values
    ) {
        return (root, query, builder) -> {
            CriteriaBuilder.In<String> in = builder.in(builder.lower(metaclassFunction.apply(root)));
            for (String value : values) {
                in = in.value(value.toLowerCase());
            }
            return builder.not(in);
        };
    }

}
