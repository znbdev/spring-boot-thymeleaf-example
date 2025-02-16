package com.znb.spring.thymeleaf.bean;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
public class User {

    @NotBlank(message = "姓名不能为空")
    @Size(min = 2, max = 50, message = "姓名长度必须在 2 到 50 个字符之间")
    private String name;

    @Min(value = 18, message = "年龄必须大于等于 18 岁")
    private int age;

    @Email(message = "邮箱格式不正确")
    private String email;

    @NotBlank(message = "备注不能为空")
    private String note;

}