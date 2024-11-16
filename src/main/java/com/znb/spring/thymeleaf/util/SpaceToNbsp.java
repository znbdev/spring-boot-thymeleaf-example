package com.znb.spring.thymeleaf.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class SpaceToNbsp {
    public static String replaceSpaceWithNbsp(String str) {
        // 使用正则表达式替换所有空格
        String pattern = "\\s+"; // 匹配一个或多个空格
        String replacement = "&nbsp;";
        Pattern r = Pattern.compile(pattern);
        Matcher m = r.matcher(str);
        return m.replaceAll(replacement);
    }

    public static void main(String[] args) {
        String originalString = "Hello World   This is a test";
        String convertedString = replaceSpaceWithNbsp(originalString);
        System.out.println(convertedString); // 输出：Hello&nbsp;World&nbsp;&nbsp;This&nbsp;is&nbsp;a&nbsp;test
    }
}