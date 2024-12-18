const currentScriptSrc = document.currentScript.src;
// 使用 URL 对象解析查询字符串
const url = new URL(currentScriptSrc);
const params = new URLSearchParams(url.search);

// 从 URL 中获取参数
const paramInputId = params.get('inputId');
console.log('inputId= ' + paramInputId);
const paramSiteId = params.get('siteId');
console.log('siteId= ' + paramSiteId);

let previousQuery = ''; // 用于保存上一次的检索内容

// 共通方法：检查输入框是否为空
function checkInputEmpty(input, suggestionsBox) {
    const query = input.value.toLowerCase(); // 从输入框获取值
    // 检查输入框是否为空
    if (query === '') {
        document.getElementById('productDescription').innerHTML = ''; // 清空 productDescription
        suggestionsBox.style.display = 'none'; // 隐藏建议框
        return true; // 返回 true 表示输入框为空
    }
    return false; // 返回 false 表示输入框不为空
}

// 共通方法：过滤匹配的商品
function filterItems(query, items, suggestionsBox, input) {
    // 过滤匹配的商品
    const filteredItems = items.filter(item => item.name.toLowerCase().includes(query));

    console.log('当前输入:', query); // 打印当前输入
    console.log('匹配商品:', filteredItems); // 打印过滤后的商品

    // 如果有匹配项，显示建议框
    if (filteredItems.length > 0) {
        suggestionsBox.style.display = 'block';
        suggestionsBox.innerHTML = '';  // 清空之前的建议项
        filteredItems.forEach(item => {
            const suggestionItem = document.createElement('div');
            suggestionItem.className = 'suggest-item';
            suggestionItem.textContent = item.name;
            suggestionsBox.appendChild(suggestionItem);

            // 添加点击事件监听器
            suggestionItem.addEventListener('click', function() {
                console.log('点击建议项');
                input.value = item.key; // 填充输入框
                suggestionsBox.innerHTML = ''; // 清空建议框
                suggestionsBox.style.display = 'none'; // 隐藏建议框

                // 直接找到 HTML 中的 <span class="suggestScript">并设置属性
                const suggestScriptSpan = document.querySelector('.suggestScript');
                if (suggestScriptSpan) {
                    suggestScriptSpan.setAttribute('data-article-name', item.name); // 设置数据属性
                    // suggestScriptSpan.textContent = item.name; // 可以将 item.name 添加到 <span> 的文本中， Uncomment if needed
                }
            });
        });
    } else {
        document.getElementById('productDescription').innerHTML = ''; // 清空 productDescription
        suggestionsBox.style.display = 'none'; // 隐藏建议框
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded');
    const items = [
        { key: 'A1', name: '商品A1描述' },
        { key: 'A2', name: '商品A2描述' },
        { key: 'A3', name: '商品A3描述' },
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

        // input 事件监听器
        input.addEventListener('input', function () {
            console.log('input 事件监听器');
            const query = input.value.toLowerCase(); // 从输入框获取值
            suggestionsBox.innerHTML = '';  // 清空建议框
            console.log('query= ' + query);
            console.log('previousQuery= ' + previousQuery);

            // 在检索内容发生变化时保存上一次的检索内容
            if (query !== previousQuery) {
                previousQuery = query; // 更新上一次的检索内容
                console.log('Updated previousQuery= ' + previousQuery);
            }

            filterItems(query, items, suggestionsBox, input);

        });

        // focus 事件监听器
        input.addEventListener('focus', function () {
            console.log('focus 事件监听器');
//            const query = input.value.toLowerCase(); // 从输入框获取值
//            suggestionsBox.innerHTML = '';  // 清空建议框
//            console.log('query= ' + query);
//
//            // 检查输入框是否为空
//            if (checkInputEmpty(input, suggestionsBox)) {
//                    return; // 如果输入框为空，提前返回, 避免执行后续的匹配逻辑
//            }
//
//            filterItems(query, items, suggestionsBox, input);
        });

        // 点击输入框外部时，隐藏建议框
        document.addEventListener('click', function (event) {
            console.log('点击输入框外部时，隐藏建议框');
//            if (!input.contains(event.target) && !suggestionsBox.contains(event.target)) {
////                suggestionsBox.innerHTML = '';
////                suggestionsBox.style.display = 'none';
//                const query = input.value.toLowerCase(); // 从输入框获取值
//                suggestionsBox.innerHTML = '';  // 清空建议框
//                console.log('query= ' + query);
//                console.log('previousQuery= ' + previousQuery);
//                filterItems(query, items, suggestionsBox, input);
//            }
        });

        // blur 事件监听器
        input.addEventListener('blur', function () {
            console.log('blur 事件监听器');
            // 失去焦点时进行检查
            // 检查输入框是否为空
//            if (checkInputEmpty(input, suggestionsBox)) {
//                return; // 如果输入框为空，提前返回, 避免执行后续的匹配逻辑
//            } else {
//                const query = input.value.toLowerCase(); // 从输入框获取值
//                suggestionsBox.innerHTML = '';  // 清空建议框
//                console.log('query= ' + query);
//                console.log('previousQuery= ' + previousQuery);
//                filterItems(query, items, suggestionsBox, input);
//            }
        });
    }

    // 调用 setupSuggestion 函数
    setupSuggestion();
});