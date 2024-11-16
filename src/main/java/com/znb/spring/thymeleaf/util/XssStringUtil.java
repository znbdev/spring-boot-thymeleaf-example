package com.znb.spring.thymeleaf.util;

import lombok.experimental.UtilityClass;
import org.apache.commons.lang3.StringUtils;

/**
 * 慎用StringEscapeUtils.escapeHtml方法
 * https://blog.csdn.net/shangdi1988/article/details/50737940
 */
@UtilityClass
public class XssStringUtil {

    public static String htmlEncode(String source) {
        String html = "";
        if (StringUtils.isNotEmpty(source)) {
            StringBuffer buffer = new StringBuffer();
            for (int i = 0; i < source.length(); i++) {
                char c = source.charAt(i);
                switch (c) {
                    case '<':
                        buffer.append("&lt;");
                        break;
                    case '>':
                        buffer.append("&gt;");
                        break;
                    case '&':
                        buffer.append("&amp;");
                        break;
                    case '"':
                        buffer.append("&quot;");
                        break;
                    case 10:
                    case 13:
                        break;
                    default:
                        buffer.append(c);
                }
            }
            html = buffer.toString();
        }
        return html;
    }

    public static String escapeForXss(String content) {
        if (StringUtils.isNotEmpty(content)) {
            return content.replaceAll("\"", "&quot;").replaceAll("'", "&#39;")
                    .replaceAll("<", "&lt;").replaceAll(">", "&gt;");
        } else {
            return StringUtils.EMPTY;
        }
    }

    public static String escapeForOut(String content) {
        if (StringUtils.isNotEmpty(content)) {
            return content.replaceAll("\"", "&quot;").replaceAll("'", "&#39;").replaceAll("<", "&lt;")
                    .replaceAll(">", "&gt;").replaceAll("(\r\n|\r|\n)", "<br/>");
        } else {
            return StringUtils.EMPTY;
        }
    }

}
