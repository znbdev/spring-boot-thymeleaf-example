const currentScriptSrc = document.currentScript.src;
// 使用 URL 对象解析查询字符串
const url = new URL(currentScriptSrc);
const params = new URLSearchParams(url.search);

// 从 URL 中获取参数
const paramInputId = params.get('inputId');
console.log('inputId= ' + paramInputId);
const paramSiteId = params.get('siteId');
console.log('siteId= ' + paramSiteId);


document.addEventListener('DOMContentLoaded', function() {
    const items = [
        { key: 'A', name: '商品A1描述' },
        { key: 'A', name: '商品A2描述' },
        { key: 'A', name: '商品A3描述' },
        { key: 'B', name: '商品B描述' },
        { key: 'C', name: '商品C描述' },
        // 可以继续添加更多商品
    ];

    // 从 URL 中获取参数
//    const urlParams = new URLSearchParams(window.location.search);
//    const inputId = urlParams.get('inputId'); // 这是从 URL 取得的 inputId
//    const siteId = urlParams.get('siteId');   // 获取 siteId（如果需要）
//    console.log('传递进来的 inputId:', inputId); // 打印inputId
//    console.log('传递进来的 siteId:', siteId);   // 打印siteId（如果需要）

    function setupSuggestion() {

        const input = document.getElementById(paramInputId); // 根据 inputId 获取输入框
        const suggestionsBox = document.getElementById('suggestions');

        // 检查输入框是否存在
        if (!input) {
            console.error(`输入框ID为 ${inputId} 的元素不存在`);
            return; // 如果输入框不存在，则停止执行
        }

        input.addEventListener('input', function () {

            const query = input.value.toLowerCase(); // 从输入框获取值
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

    // 调用 setupSuggestion 函数
    setupSuggestion();
});
