#!/bin/bash

# 清屏函数
clear_screen() {
    printf "\033c"
}

# 显示菜单函数
show_menu() {
    clear_screen
    echo "Maven 项目操作菜单"
    echo "当前 Java 版本: $java_version"
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

# 执行命令函数
execute_command() {
    echo "执行命令: $1"
    eval $1
    echo
    read -n 1 -s -r -p "按任意键继续..."
}

# 检测 Java 版本和路径
detect_java() {
    if command -v java >/dev/null 2>&1; then
        java_version=$(java -version 2>&1 | awk -F '"' '/version/ {print $2}')
        java_path=$(which java)
        java_home=$(dirname $(dirname $java_path))
        echo "检测到 Java 版本: $java_version"
        echo "Java 路径: $java_home"
    else
        echo "未检测到 Java，请确保已安装 Java 并添加到 PATH 中。"
        exit 1
    fi
}

# 定义菜单选项
options=(
    "编译项目 (mvn compile)"
    "运行项目 (mvn exec:java)"
    "清理项目 (mvn clean)"
    "运行测试 (mvn test)"
    "打包项目 (mvn package)"
    "安装项目到本地仓库 (mvn install)"
    "查看依赖树 (mvn dependency:tree)"
    "更新项目依赖 (mvn versions:display-dependency-updates)"
    "生成项目站点 (mvn site)"
    "部署项目 (mvn deploy)"
    "退出"
)

# 定义选择的索引
selected=0

# 检测 Java 版本和路径
detect_java

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
                    execute_command "mvn compile"
                    ;;
                1)
                    execute_command "mvn exec:java"
                    ;;
                2)
                    execute_command "mvn clean"
                    ;;
                3)
                    execute_command "mvn test"
                    ;;
                4)
                    execute_command "mvn package"
                    ;;
                5)
                    execute_command "mvn install"
                    ;;
                6)
                    execute_command "mvn dependency:tree"
                    ;;
                7)
                    execute_command "mvn versions:display-dependency-updates"
                    ;;
                8)
                    execute_command "mvn site"
                    ;;
                9)
                    execute_command "mvn deploy"
                    ;;
                10)
                    echo "退出脚本。"
                    exit 0
                    ;;
            esac
            ;;
    esac
done
