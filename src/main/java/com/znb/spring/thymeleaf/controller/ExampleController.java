package com.znb.spring.thymeleaf.controller;

import com.znb.spring.thymeleaf.util.SpaceToNbsp;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringEscapeUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.util.HtmlUtils;

@Slf4j
@Controller
public class ExampleController {

    @GetMapping("/example1")
    public String example1(Model model) {
        return "example1";
    }

    @GetMapping("/example2")
    public String example2(Model model) {
        return "example2";
    }

    @GetMapping("/example3")
    public String example3(Model model) {
        SpaceToNbsp.replaceSpaceWithNbsp("");
        model.addAttribute("", "");
        return "example3";
    }

    @GetMapping("/inputForm")
    public String inputForm(Model model) {
        return "inputForm";
    }

    @PostMapping("/submitInput")
    public String submitInput(@RequestParam("userInput") String userInput, Model model) {
        model.addAttribute("input", userInput);

        String escapedInput1 = HtmlUtils.htmlEscape(userInput);
        model.addAttribute("input1", escapedInput1);
        log.info("escapedInput1: {}", escapedInput1);
        String escapedInput2 = SpaceToNbsp.replaceSpaceWithNbsp(userInput);
        model.addAttribute("input2", escapedInput2);
        log.info("escapedInput2: {}", escapedInput2);
        return "result";
    }

}
