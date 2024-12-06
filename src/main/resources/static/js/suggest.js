const items = [
    { key: 'A', name: 'おたふく　Ａ耐熱アルミ手袋　２本指２９ｃｍ　' },
    { key: 'A', name: 'ヒシ　カードホルダー　３６×２２９　ナチュラル　ナチュラル' },
    { key: 'B', name: '商品B描述' },
    { key: 'C', name: '商品C描述' },
    // 可以继续添加更多商品
];

function setupSuggestion(inputId) {
    const input = document.getElementById(inputId); // 使用传递的 inputId
    const suggestionsBox = document.getElementById('suggestions');

    // 在文件中解析查询参数并传递给 setupSuggestion
    const queryParams = getQueryParams();

    // 继续保持原有的事件监听代码
    input.addEventListener('input', function () {
        console.log('Input event triggered');
        const query = input.value.toLowerCase();
        suggestionsBox.innerHTML = '';  // 清空建议框
        suggestionsBox.style.display = 'none';  // 隐藏建议框

        if (query) {
            // 过滤 items
            const filteredItems = items.filter(item =>
                item.key.toLowerCase() === query || item.name.toLowerCase().includes(query)
            );

            // 添加匹配的建议项
            filteredItems.forEach(item => {
                const suggestionItem = document.createElement('div');
                suggestionItem.className = 'suggest-item';
                suggestionItem.textContent = item.name;
                suggestionItem.addEventListener('click', function () {
                    input.value = item.name;  // 设置输入框的值为点击的建议项
                    suggestionsBox.innerHTML = '';
                    suggestionsBox.style.display = 'none';  // 隐藏建议框
                });

                suggestionsBox.appendChild(suggestionItem);
            });

            // 如果有匹配的建议显示建议框
            if (filteredItems.length > 0) {
                suggestionsBox.style.display = 'block';
            }
        }
    });

    // 处理 onblur 事件
    input.addEventListener('blur', function () {
        setTimeout(() => {
            suggestionsBox.innerHTML = '';
            suggestionsBox.style.display = 'none';
        }, 100);
    });

    document.addEventListener('click', function (e) {
        if (!input.contains(e.target) && !suggestionsBox.contains(e.target)) {
            suggestionsBox.innerHTML = '';
            suggestionsBox.style.display = 'none';
        }
    });
}

function getQueryParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const pairs = queryString.split('&');
    pairs.forEach(pair => {
        const [key, value] = pair.split('=');
        params[decodeURIComponent(key)] = decodeURIComponent(value || '');
    });
    return params;
}

// 在文件中解析查询参数并传递给 setupSuggestion
const queryParams = getQueryParams();
const inputId = queryParams.inputId || 'inputCode'; // 默认为 'inputCode'

// 调用 setupSuggestion 函数
setupSuggestion(inputId);


// 调用函数并传递 input 的 ID
//setupSuggestion('inputCode');