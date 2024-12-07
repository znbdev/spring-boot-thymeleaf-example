document.addEventListener('DOMContentLoaded', function() {
    const suggestScript = document.querySelector('.suggestScript');
    const productDescription = document.getElementById('productDescription');
    console.log('productDescription= ' + productDescription);


    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-article-name') {
                const articleName = suggestScript.getAttribute('data-article-name');
                fetchProductDetails(articleName);
            }
        });
    });

    observer.observe(suggestScript, { attributes: true });

    function fetchProductDetails(articleName) {
        console.log('articleName= ' + articleName);
        // 将 item.name 设定在 <div> 中
        const productDescription = document.getElementById('productDescription');
        if (productDescription) {
            var str = "ProductDescription = ";
            productDescription.textContent = str + articleName;
        }
//        fetch(`/api/getProductDetails?name=${encodeURIComponent(articleName)}`)
//            .then(response => response.json())
//            .then(data => {
//                // 假设返回的数据中包含商品的详细信息
//                productDescription.innerHTML = `
//                    <h2>${data.name}</h2>
//                    <p>${data.description}</p>
//                    <p>价格: ${data.price}</p>
//                `;
//            })
//            .catch(error => console.error('Error fetching product details:', error));
    }
});
