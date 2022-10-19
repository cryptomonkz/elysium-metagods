package com.elysium.metagods.helper;

import javax.persistence.criteria.From;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import java.util.Optional;

public class JoinHelper {

    public static <X, Y, Z> Join<Y, Z> join(From<X, Y> from, SingularAttribute<Y, Z> attribute, JoinType joinType
    ) {
        return JoinHelper.<X, Y, Z>join(
            from,
            attribute.getName(),
            joinType
        ).orElseGet(() -> from.join(attribute, joinType));
    }

    public static <X, Y, Z> Join<Y, Z> join(From<X, Y> from, SetAttribute<Y, Z> attribute, JoinType joinType
    ) {
        return JoinHelper.<X, Y, Z>join(
            from,
            attribute.getName(),
            joinType
        ).orElseGet(() -> from.join(attribute, joinType));
    }

    public static <X, Y, Z> Optional<Join<Y, Z>> join(From<X, Y> from, String attributeName, JoinType joinType) {
        return from.getJoins().stream()
            .filter(join -> isRequestedJoin(join, attributeName, joinType))
            .findFirst()
            .map(join -> (Join<Y, Z>) join);
    }

    private static <X, Y> boolean isRequestedJoin(Join<X, Y> join, String attributeName, JoinType joinType) {
        return join.getAttribute().getName().equals(attributeName) && join.getJoinType().equals(joinType);
    }

}
