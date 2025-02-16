// hello.js
const { useState } = React; // 从 React 中解构 useState

function Hello() {
    const [name, setName] = useState('World'); // 默认名称为 World

    const handleChangeName = () => {
        const newName = prompt("Please enter a new name:"); // 通过提示框获取新名字
        if (newName) {
            setName(newName); // 更新名称
        }
    };

    return (
        <div>
            <h1>Hello, {name}</h1>
            <button onClick={handleChangeName}>Change of name</button>
        </div>
    );
}

// 渲染 Hello 组件的函数
function renderHello(container) {
    ReactDOM.render(<Hello />, container);
}