#!/bin/bash

# 清屏函数
clear_screen() {
    printf "\033c"
}

# 显示菜单函数
show_menu() {
    clear_screen
    echo "Gradle 操作菜单"
    echo "当前 Java 版本: $(java -version 2>&1 | awk -F '"' '/version/ {print $2}')"
    echo "请使用上下箭头键选择操作，回车确认："
    echo

    for i in "${!options[@]}"; do
        if [[ $i -eq $selected ]]; then
            echo "> ${options[$i]}"
        else
            echo "  ${options[$i]}"
        fi
    done
}

# 读取键盘输入函数
read_key() {
    read -s -n 3 key 2>/dev/null >&2
    if [[ $key = $'\e[A' ]]; then
        echo "up"
    elif [[ $key = $'\e[B' ]]; then
        echo "down"
    elif [[ $key = "" ]]; then
        echo "enter"
    fi
}

# 执行 Gradle 命令函数
execute_gradle_command() {
    clear_screen
    echo "执行: ./gradlew $1"
    ./gradlew $1
    echo
    read -n 1 -s -r -p "按任意键继续..."
}

# 定义菜单选项
options=(
    "构建项目 (build)"
    "清理项目 (clean)"
    "运行测试 (test)"
    "运行项目 (run)"
    "查看依赖 (dependencies)"
    "刷新依赖 (--refresh-dependencies)"
    "显示可用任务 (tasks)"
    "生成项目报告 (projectReport)"
    "自定义 Gradle 命令"
    "返回主菜单"
)

# 定义选择的索引
selected=0

# 主循环
while true; do
    show_menu

    case $(read_key) in
        "up")
            ((selected--))
            if [[ $selected -lt 0 ]]; then
                selected=$((${#options[@]} - 1))
            fi
            ;;
        "down")
            ((selected++))
            if [[ $selected -ge ${#options[@]} ]]; then
                selected=0
            fi
            ;;
        "enter")
            case $selected in
                0) execute_gradle_command "build" ;;
                1) execute_gradle_command "clean" ;;
                2) execute_gradle_command "test" ;;
                3) execute_gradle_command "run" ;;
                4) execute_gradle_command "dependencies" ;;
                5) execute_gradle_command "build --refresh-dependencies" ;;
                6) execute_gradle_command "tasks" ;;
                7) execute_gradle_command "projectReport" ;;
                8)
                    clear_screen
                    read -p "请输入自定义 Gradle 命令: " custom_command
                    execute_gradle_command "$custom_command"
                    ;;
                9)
                    echo "返回主菜单"
                    exit 0
                    ;;
            esac
            ;;
    esac
done
