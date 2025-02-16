package com.znb.spring.thymeleaf.controller;

import com.znb.spring.thymeleaf.bean.User;
import com.znb.spring.thymeleaf.service.SampleService;
import com.znb.spring.thymeleaf.util.SpaceToNbsp;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.util.HtmlUtils;

import javax.validation.Valid;

@Slf4j
@RequiredArgsConstructor
@Controller
public class ExampleController {

    private final SampleService sampleService;

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

    @GetMapping("/spa")
    public String spa(Model model) {
        return "spa";
    }

    @GetMapping("/suggest")
    public String suggest(Model model) {
        return "suggest";
    }

    @GetMapping("/suggest4ob")
    public String suggestOb(Model model) {
        return "suggest_ob";
    }

    @GetMapping("/search")
    public String search(Model model) {
        return "search";
    }

    @GetMapping("/jsTry")
    public String jsTry(Model model) {
        return "jsTry";
    }

    @GetMapping("/register")
    public String showForm(Model model) {
        model.addAttribute("user", new User());
        return "register";
    }

    @PostMapping("/register")
    public String processForm(@Valid User user, BindingResult bindingResult) {

        sampleService.setMsgType(user);

        if (bindingResult.hasErrors()) {
            return "register";
        }
        // 处理表单提交
        return "success";
    }

}
