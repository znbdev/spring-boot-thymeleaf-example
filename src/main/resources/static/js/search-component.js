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