# FrabriDraw
A draw tool driven by Fabric.js
![](https://miro.medium.com/max/1400/1*rN56ulxIyqG72mX5xt_oqQ.png)

> 在我还年轻的时候，我对图形软件非常感兴趣，因为它们解放了创作者的想象力和创造力，从画图到Photoshop，Sketch，FIgma，新的工具也层出不穷，适应不同阶段和人群的创作需求；所以我也想要更多的了解这些功能背后的实现方法，于是我开始学习了Fabric.js，并且开发了一些基本的功能。

### 1.尝试运行

1.Clone本项目至本地。

2.NPM项目安装lite-server：

```
npm install lite-server --save-dev
yarn add lite-server --dev # or yarn 
```

3.在`package.json`文件中“script”中添加：

```
# Inside package.json...
  "scripts": {
    "dev": "lite-server"
  },
```

4.在VScode中运行lite-server，http://127.0.0.1:5500/index.html 查看项目。



---

### 2.功能描述

Fabric.js是一个非常好的js库，让使用者可以通过canvas来实现很多的功能和效果。

![](https://miro.medium.com/max/1200/1*0H375Y6JW6j7tr8WDSTK6w.png)

已经实现的基础功能包括：

* 钢笔工具
* 选择工具
* 创建文本
* 创建图形（圆形/矩形）
* 缩放画布/还原画布
* 删除对象
* 编组/解组
* 复制/粘贴
* undo/redo
* 创建网格
* 上传图片
* 导出画布
* toast提示
* 快捷键

当然，还有一些未完成的功能：

* 智能对齐（虽然说是智能，但是判断过程感觉很死板）
* 自定义控制器
* 管理列表
* 颜色选择器
* 路径样式选择器
* 参数面板
* 布尔运算
* 效果面板
* 混合模式
* 多格式导出
* ...

### 3.快捷键对照表

使用hotkey.js创建了对应工具的热键操作，可以直接快捷键唤起对应功能：

| 热键           | 对应操作          |
| -------------- | ----------------- |
| P              | 切换至铅笔工具    |
| A              | 切换至选择工具    |
| T              | 创建文本层        |
| O              | 创建形状图层-圆形 |
| R              | 创建形状图层-矩形 |
| G              | 创建网格          |
| -              | 缩小画布          |
| =              | 放大画布          |
| Command+0      | 重置画布          |
| Backspace      | 删除对象          |
| Command+G      | 对选择对象编组    |
| Ctrl+Command+G | 对选择对象解组    |
| Command+C      | 添加对象至剪切板  |
| Command+V      | 粘贴剪切板对象    |
| Command+Z      | undo              |
| Ctrl+Command+Z | redo              |

### 4.简单演示

一些演示，对创建的多个图形进行编组：

![](https://cdn-images-1.medium.com/max/600/1*fE3JgIOhkEEcxKVUXq7o3g.gif)

开关网格（无网格吸附和卡尺）：

![](https://cdn-images-1.medium.com/max/600/1*8p0Fmbxlm2mCjUupHs99lA.gif)

复制选中对象：

![](https://cdn-images-1.medium.com/max/600/1*_jgliSZp4yHIpoG5iJxiXA.gif)

删除选中对象：

![](https://cdn-images-1.medium.com/max/600/1*SKTzlf7Xkf8eQ0puui18Qg.gif)

一键导出PNG预览：

![](https://cdn-images-1.medium.com/max/1000/1*su7EWsD9tZ4GkmsTAKiHpw.png)

