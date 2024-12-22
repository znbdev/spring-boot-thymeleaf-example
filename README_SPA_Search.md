# SPA Search

要实现一个可嵌入到不同页面（如 HTML、JSP 等）的单页应用程序（SPA）检索功能，以下是一个完整的示例，包括 SPA 组件和宿主页面的代码。

**1. 构建 SPA 检索组件**

我们将使用原生 JavaScript 创建一个简单的检索组件，并将其打包为独立的 JavaScript 和 CSS 文件，便于在不同的宿主页面中引入。

*search-component.js*：

```javascript
(function (global) {
  function SearchComponent(config) {
    this.elementId = config.elementId;
    this.data = config.data || [];
    this.init();
  }

  SearchComponent.prototype.init = function () {
    var container = document.getElementById(this.elementId);
    if (!container) {
      console.error('Container element not found');
      return;
    }

    // 创建搜索框
    var input = document.createElement('input');
    input.type = 'text';
    input.placeholder = '请输入搜索关键词';
    input.className = 'search-input';
    container.appendChild(input);

    // 创建结果列表
    var resultList = document.createElement('ul');
    resultList.className = 'search-results';
    container.appendChild(resultList);

    // 绑定输入事件
    input.addEventListener('input', this.onSearch.bind(this, resultList));
  };

  SearchComponent.prototype.onSearch = function (resultList, event) {
    var query = event.target.value.toLowerCase();
    resultList.innerHTML = '';

    if (query) {
      var results = this.data.filter(function (item) {
        return item.toLowerCase().includes(query);
      });

      results.forEach(function (result) {
        var listItem = document.createElement('li');
        listItem.textContent = result;
        resultList.appendChild(listItem);
      });
    }
  };

  // 暴露全局变量
  global.SearchComponent = SearchComponent;
})(window);
```

*search-component.css*：

```css
.search-input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
}

.search-results {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.search-results li {
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

.search-results li:hover {
  background-color: #f0f0f0;
}
```

**2. 在宿主页面中引入并使用检索组件**

以下是一个 HTML 页面示例，展示如何引入上述的检索组件并进行初始化。

*index.html*：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>嵌入式检索功能示例</title>
  <link rel="stylesheet" href="search-component.css">
</head>
<body>
  <h1>嵌入式检索功能示例</h1>
  <div id="search-component"></div>

  <script src="search-component.js"></script>
  <script>
    // 示例数据
    var sampleData = [
      '苹果',
      '香蕉',
      '橙子',
      '葡萄',
      '西瓜',
      '菠萝',
      '草莓',
      '蓝莓',
      '芒果',
      '柠檬'
    ];

    // 初始化检索组件
    new SearchComponent({
      elementId: 'search-component',
      data: sampleData
    });
  </script>
</body>
</html>
```

**3. 说明**

- **独立性**：`search-component.js` 和 `search-component.css` 文件中的代码确保了组件的独立性，避免与宿主页面的其他代码产生冲突。

- **可配置性**：在初始化 `SearchComponent` 时，可以传入不同的 `elementId` 和 `data`，以适应不同的使用场景。

- **引入方式**：通过在宿主页面中使用 `<script>` 和 `<link>` 标签引入组件的 JavaScript 和 CSS 文件，然后在页面中添加一个具有特定 `id` 的容器元素，最后通过 JavaScript 初始化组件。

通过上述步骤，您可以在不同的页面中嵌入并使用这个 SPA 检索功能组件。 