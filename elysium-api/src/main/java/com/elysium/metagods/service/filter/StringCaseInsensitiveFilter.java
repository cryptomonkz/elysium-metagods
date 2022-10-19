package com.elysium.metagods.service.filter;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import tech.jhipster.service.filter.StringFilter;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class StringCaseInsensitiveFilter extends StringFilter {

    public StringCaseInsensitiveFilter(StringCaseInsensitiveFilter filter) {
        super(filter);
    }

    @Override
    public StringCaseInsensitiveFilter copy() {
        return new StringCaseInsensitiveFilter(this);
    }

}
