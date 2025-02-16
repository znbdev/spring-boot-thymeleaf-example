package com.znb.spring.thymeleaf.validation.register;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = DynamicNotBlankValidator.class)
@Target({ ElementType.FIELD, ElementType.TYPE })  // 作用于字段和类
@Retention(RetentionPolicy.RUNTIME)
public @interface DynamicNotBlank {
    String message1();
    String message2();
    String message() default "{validation.error}";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

