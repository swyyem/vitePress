# 学习路径建议

## 初学者阶段

1. 基础语法（变量、循环、函数）
2. 常用数据结构（列表、字典、集合）
3. 文件操作
4. 错误处理

## 中级阶段

1. 面向对象编程
2. 模块和包管理
3. 常用标准库（os, sys, datetime, json等）
4. 虚拟环境和包管理（pip, conda）

## 进阶阶段

1. 装饰器和生成器
2. 并发编程（多线程、多进程）
3. 异步编程（asyncio）
4. 元编程

# 实用技巧

## 1. 虚拟环境管理

```bash
# 创建虚拟环境
python -m venv myenv

# 激活（Windows）
myenv\Scripts\activate

# 激活（Mac/Linux）
source myenv/bin/activate
```

## 2. 包管理

```bash
# 安装包
pip install package_name

# 导出环境
pip freeze > requirements.txt

# 从文件安装
pip install -r requirements.txt
```

## 3. Jupyter Notebook

```bash
# 数据科学首选
# 安装：pip install jupyter
# 启动：jupyter notebook
```

## 4. 代码格式化工具

```bash
# 自动格式化代码
pip install black
black your_script.py

# 导入排序
pip install isort
isort your_script.py
```

# 资源推荐

## 官方资源

[Python 官方文档](https://docs.python.org/3/)
[PyPI（Python包索引）](https://pypi.org/)

## 学习平台

[Real Python](https://realpython.com/)
[Python Weekly](https://www.pythonweekly.com/)

## 社区

[Stack Overflow](https://stackoverflow.com/questions/tagged/python)
[Python 中文社区](https://www.python88.com/)
