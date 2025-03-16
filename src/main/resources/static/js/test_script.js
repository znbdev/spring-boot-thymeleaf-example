// 获取当前脚本的 URL
const currentScriptSrc = document.currentScript.src;

// 使用 URL 对象解析查询字符串
const url = new URL(currentScriptSrc);
const params = new URLSearchParams(url.search);

// 获取参数
const name = params.get('name');
const age = params.get('age');

// 使用参数
console.log('Hello, ' + name + '! You are ' + age + ' years old.');

$(document).ready(function () {
    // 取消按钮点击事件
    console.log("cancel button clicked");
    $("#btnCancel").on("click", function () {
        window.location = "/tutorials/new";
    });

    // 重新加载按钮点击事件
    $("#btnReload").on("click", function () {
        // 重新加载页面
        location.reload();
    });

    // 提交按钮点击事件
//    $("#btnSubmit").on("click", function (event) {
        // 获取表单元素
//        var form = $("#tutorialForm");

        // 禁用提交按钮
//        $(this).prop("disabled", true);

        // 添加自定义验证逻辑
//        var title = $("#title").val();
//        if (title.length < 2) {
//            alert("Title must be at least 2 characters long.");
//            // 启用提交按钮
//            $(this).prop("disabled", false);
//            // 阻止表单提交
//            event.preventDefault();
//            return;
//        }

        // 如果验证通过，提交表单
//        form.submit();
//    });

    // 切换背景颜色按钮点击事件
    $("#btnToggleColor").on("click", function () {
        // 获取Level值
        var level = $("#level").val();

        // 发送AJAX请求
        $.ajax({
            url: "/checkLevel", // 直接使用绝对路径
            type: "GET",
            data: { level: level },
            success: function (response) {
                if (response) {
                    // 如果返回true，设置背景颜色为黄色
                    $("body").css("background-color", "yellow");
                } else {
                    // 如果返回false，设置背景颜色为红色
                    $("body").css("background-color", "red");
                }
            },
            error: function () {
                alert("An error occurred while checking the level.");
            }
        });
    });
});