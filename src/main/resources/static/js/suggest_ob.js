const items = [
    { key: 'A', name: '商品A1描述' },
    { key: 'A', name: '商品A2描述' },
    { key: 'B', name: '商品B描述' },
    { key: 'C', name: '商品C描述' },
    // 可以继续添加更多商品
];

function setupSuggestion(inputId) {
    const input = document.getElementById(inputId);
    const suggestionsBox = document.getElementById('suggestions');

    input.addEventListener('input', function () {
        const query = input.value.toLowerCase();
        suggestionsBox.innerHTML = '';  // 清空建议框

        // 过滤匹配的商品
        const filteredItems = items.filter(item => item.name.toLowerCase().includes(query));

        console.log('当前输入:', query); // 打印当前输入
        console.log('匹配商品:', filteredItems); // 打印过滤后的商品

        // 如果有匹配项，显示建议框
        if (filteredItems.length > 0) {
            suggestionsBox.style.display = 'block';
            filteredItems.forEach(item => {
                const suggestionItem = document.createElement('div');
                suggestionItem.className = 'suggest-item';
                suggestionItem.textContent = item.name;
                suggestionsBox.appendChild(suggestionItem);

                suggestionItem.addEventListener('click', function() {
                    input.value = item.name; // 填充输入框
                    suggestionsBox.innerHTML = ''; // 清空建议框
                    suggestionsBox.style.display = 'none'; // 隐藏建议框
                });
            });
        } else {
            suggestionsBox.style.display = 'none'; // 无匹配项则隐藏建议框
        }
    });

    // 点击输入框外部时，隐藏建议框
    document.addEventListener('click', function (event) {
        if (!input.contains(event.target) && !suggestionsBox.contains(event.target)) {
            suggestionsBox.innerHTML = '';
            suggestionsBox.style.display = 'none';
        }
    });
}

// 调用 setupSuggestion 函数并传递输入框的 ID
setupSuggestion('inputCode');
