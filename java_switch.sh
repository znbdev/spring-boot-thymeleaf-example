#!/bin/bash

# 文件路径常量
CUSTOM_JAVA_PATHS_FILE="$HOME/.java_paths"

# 清屏函数
clear_screen() {
    printf "\033c"
}

# 显示菜单函数
show_menu() {
    clear_screen
    echo "Java 版本管理菜单"
    echo "当前 Java 版本: $current_java_version"
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

# 检测所有已安装的 Java 版本
detect_java_versions() {
    # 检查常见的 Java 安装位置
    java_homes=()

    # 用户自定义的 Java 路径
    if [[ -f "$CUSTOM_JAVA_PATHS_FILE" ]]; then
        while IFS= read -r line; do
            if [[ -d "$line" ]]; then
                java_homes+=("$line")
            fi
        done < "$CUSTOM_JAVA_PATHS_FILE"
    fi

    # macOS
    if [[ -d "/Library/Java/JavaVirtualMachines" ]]; then
        while IFS= read -r -d '' dir; do
            java_homes+=("$dir")
        done < <(find /Library/Java/JavaVirtualMachines -name "Contents/Home" -print0)
    fi

    # 用户目录下的 Java 安装
    if [[ -d "$HOME/Library/Java/JavaVirtualMachines" ]]; then
        while IFS= read -r -d '' dir; do
            java_homes+=("$dir")
        done < <(find "$HOME/Library/Java/JavaVirtualMachines" -name "Contents/Home" -print0)
    fi

    # Linux
    if [[ -d "/usr/lib/jvm" ]]; then
        while IFS= read -r -d '' dir; do
            java_homes+=("$dir")
        done < <(find /usr/lib/jvm -maxdepth 1 -type d -print0)
    fi

    # 添加当前系统默认的 Java
    java_homes+=("$(dirname $(dirname $(which java)))")

    # 删除重复项
    java_homes=($(printf "%s\n" "${java_homes[@]}" | sort -u))
}


# 显示 Java 版本选择菜单
show_java_menu() {
    clear_screen
    echo "可用的 Java 版本："
    for i in "${!java_homes[@]}"; do
        if [[ -x "${java_homes[$i]}/bin/java" ]]; then
            version=$("${java_homes[$i]}/bin/java" -version 2>&1 | awk -F '"' '/version/ {print $2}')
            if [[ "$version" == "$current_java_version" ]]; then
                echo "> $i: $version (${java_homes[$i]}) [当前]"
            else
                echo "  $i: $version (${java_homes[$i]})"
            fi
        fi
    done
    echo "  q: 退出选择"
    echo
    read -p "请选择 Java 版本 (输入数字或 'q' 退出): " choice
    if [[ $choice == "q" ]]; then
        return
    elif [[ $choice -ge 0 && $choice -lt ${#java_homes[@]} ]]; then
        export JAVA_HOME="${java_homes[$choice]}"
        export PATH="$JAVA_HOME/bin:$PATH"
        current_java_version=$("$JAVA_HOME/bin/java" -version 2>&1 | awk -F '"' '/version/ {print $2}')
        echo "已切换到 Java 版本: $current_java_version"
    else
        echo "无效的选择。"
    fi
    read -n 1 -s -r -p "按任意键继续..."
}


# 添加自定义 Java 路径
add_custom_java_path() {
    clear_screen
    read -p "请输入自定义 Java 安装路径: " custom_path
    if [[ -d "$custom_path" && -x "$custom_path/bin/java" ]]; then
        echo "$custom_path" >> "$HOME/.java_paths"
        echo "已添加自定义 Java 路径: $custom_path"
    else
        echo "无效的 Java 路径。请确保路径存在且包含 bin/java 可执行文件。"
    fi
    read -n 1 -s -r -p "按任意键继续..."
}

# 定义菜单选项
options=(
    "切换 Java 版本"
    "显示当前 Java 版本"
    "添加自定义 Java 路径"
    "退出"
)

# 定义选择的索引
selected=0

# 检测 Java 版本
detect_java_versions
current_java_version=$(java -version 2>&1 | awk -F '"' '/version/ {print $2}')

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
                    show_java_menu
                    ;;
                1)
                    echo "当前 Java 版本: $current_java_version"
                    echo "JAVA_HOME: $JAVA_HOME"
                    read -n 1 -s -r -p "按任意键继续..."
                    ;;
                2)
                    add_custom_java_path
                    detect_java_versions  # 重新检测 Java 版本
                    ;;
                3)
                    echo "退出脚本。"
                    exit 0
                    ;;
            esac
            ;;
    esac
done

# 主函数
java_switch_main() {
    # 检测 Java 版本
    detect_java_versions
    local current_java_version=$(java -version 2>&1 | awk -F '"' '/version/ {print $2}')

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
                        show_java_menu
                        ;;
                    1)
                        echo "当前 Java 版本: $current_java_version"
                        echo "JAVA_HOME: $JAVA_HOME"
                        read -n 1 -s -r -p "按任意键继续..."
                        ;;
                    2)
                        echo "返回主菜单。"
                        return 0
                        ;;
                esac
                ;;
        esac
    done
}

# 如果直接执行此脚本，则运行主函数
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    java_switch_main
fi

