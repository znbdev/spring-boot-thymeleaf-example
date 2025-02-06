#!/bin/bash

# 清屏函数
clear_screen() {
    printf "\033c"
}

# 显示菜单函数
show_menu() {
    clear_screen
    echo "项目构建工具菜单"
    echo "当前 Java 版本: $current_java_version"
    echo "当前构建工具: $current_build_tool"
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

# 切换 Java 版本
switch_java_version() {
    # 保存当前目录
    local current_dir=$(pwd)

    # 切换到脚本所在目录
    cd "$(dirname "$0")"

    # 执行 java_switch.sh 脚本
    ./java_switch.sh

    # 返回原目录
    cd "$current_dir"

    # 更新当前 Java 版本
    current_java_version=$(java -version 2>&1 | awk -F '"' '/version/ {print $2}')
}

# 切换构建工具
switch_build_tool() {
    if [[ $current_build_tool == "Gradle" ]]; then
        current_build_tool="Maven"
    else
        current_build_tool="Gradle"
    fi
    echo "已切换到 $current_build_tool"
    read -n 1 -s -r -p "按任意键继续..."
}

# 执行构建工具操作
execute_build_tool() {
    if [[ $current_build_tool == "Gradle" ]]; then
        # 调用 Gradle 脚本
        ./gradle_operations.sh
    else
        # 调用 Maven 脚本
        ./maven_operations.sh
    fi
}

# 定义菜单选项
options=(
    "切换 Java 版本"
    "切换构建工具 (Gradle/Maven)"
    "执行构建工具操作"
    "退出"
)

# 定义选择的索引
selected=0

# 初始化变量
current_java_version=$(java -version 2>&1 | awk -F '"' '/version/ {print $2}')
current_build_tool="Gradle"

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
            clear_screen
            case $selected in
                0)
                    switch_java_version
                    ;;
                1)
                    switch_build_tool
                    ;;
                2)
                    execute_build_tool
                    ;;
                3)
                    echo "退出脚本。"
                    exit 0
                    ;;
            esac
            ;;
    esac
done
