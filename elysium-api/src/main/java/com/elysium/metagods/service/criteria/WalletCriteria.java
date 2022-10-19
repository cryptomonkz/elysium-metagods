package com.elysium.metagods.service.criteria;

import com.elysium.metagods.service.filter.StringCaseInsensitiveFilter;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.Accessors;
import org.springdoc.api.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.*;

import java.io.Serializable;

/**
 * Criteria class for the {@link com.elysium.metagods.domain.Wallet} entity. This class is used
 * to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /wallets?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@Data
@ToString
@ParameterObject
@NoArgsConstructor
@EqualsAndHashCode
@Accessors(chain = true)
public class WalletCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringCaseInsensitiveFilter address;

    private StringFilter nickname;

    private DoubleFilter tokenBalance;

    private LongFilter nonce;

    private InstantFilter nonceGenerationDate;

    private Boolean distinct;

    public WalletCriteria(WalletCriteria other) {
        this.distinct = other.distinct;
        this.id = other.id == null ? null : other.id.copy();
        this.address = other.address == null ? null : other.address.copy();
        this.nickname = other.nickname == null ? null : other.nickname.copy();
        this.tokenBalance = other.tokenBalance == null ? null : other.tokenBalance.copy();
        this.nonce = other.nonce == null ? null : other.nonce.copy();
        this.nonceGenerationDate = other.nonceGenerationDate == null ? null : other.nonceGenerationDate.copy();
    }

    @Override
    public WalletCriteria copy() {
        return new WalletCriteria(this);
    }

}
