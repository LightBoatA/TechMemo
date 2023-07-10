const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

// 使用 CORS 中间件
app.use(cors());

// 静态文件服务
app.use(express.static(path.join(__dirname, 'codeTest')));

// 定义 API 路由，返回页面内容
app.get('/api/pages/:pageName', (req, res) => {
    console.log('服务器收到了get请求');
    const { pageName } = req.params;

    // 根据页面名称返回不同的内容
    console.log(pageName);
    if (pageName === 'home' || '') {
        res.send('<h1>Hello, world! This is the home page.</h1>');
    } else if (pageName === 'about') {
        res.send('<h1>Hello, world! This is the about page.</h1>');
    } else {
        res.send('<h1>Page not found.</h1>');
    }
});

// 启动服务器
app.listen(port, () => {
    console.log(`SasaServer is running on port ${port}`);
});
