package com.znb.spring.thymeleaf.service;

import com.znb.spring.thymeleaf.bean.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class SampleService {

    public void setMsgType(User user) {
        log.info("msgType: {}", user.getMsgType());
        if (user.getMsgType() == null) {
            user.setMsgType("1");
        }
    }
}
