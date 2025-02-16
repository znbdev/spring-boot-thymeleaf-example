package com.znb.spring.thymeleaf.service;

import com.znb.spring.thymeleaf.bean.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class SampleService {

    public void setMsgType(User user) {
        if (StringUtils.isEmpty(user.getMsgType())) {
            user.setMsgType("1");
        }
        log.info("msgType: {}", user.getMsgType());
    }
}
