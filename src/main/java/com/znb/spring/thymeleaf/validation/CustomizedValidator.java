package com.znb.spring.thymeleaf.validation;

import com.znb.spring.thymeleaf.bean.User;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class CustomizedValidator implements ConstraintValidator<CustomizedValidatorUi, User> {

    private String message1;
    private String message2;

    @Override
    public void initialize(CustomizedValidatorUi annotation) {
//        this.message1 = annotation.message1();
//        this.message2 = annotation.message2();
        this.message1 = "备注不能为空1";
        this.message2 = "备注不能为空2";
    }

    @Override
    public boolean isValid(User user, ConstraintValidatorContext context) {
        if (user == null) {
            return true; // 避免 null 对象报错
        }

        String note = user.getNote();
        String msgType = user.getMsgType();

        if (note != null && !note.trim().isEmpty()) {
            return true; // note 不为空，校验通过
        }

        String errorMessage = "备注不能为空";
        if ("1".equals(msgType)) {
            errorMessage = message1;
        } else if ("2".equals(msgType)) {
            errorMessage = message2;
        }

        // 自定义错误消息
        context.disableDefaultConstraintViolation();
        context.buildConstraintViolationWithTemplate(errorMessage)
                .addPropertyNode("note")  // 指定错误字段
                .addConstraintViolation();

        return false;
    }
}