package com.znb.spring.thymeleaf.validation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = CustomizedValidator.class)
@Target({ ElementType.FIELD, ElementType.TYPE })  // 作用于字段和类
@Retention(RetentionPolicy.RUNTIME)
public @interface CustomizedValidatorUi {
    String message() default "默认消息"; // 添加 message 参数
//    String message1();
//    String message2();
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}