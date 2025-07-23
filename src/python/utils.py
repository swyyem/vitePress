#!/usr/bin/env python
# coding: utf-8

# In[1]:


import json
import os
import dashscope
import random
from dashscope.api_entities.dashscope_response import Role

dashscope.api_key = 'sk-0e5d43645e0b47f3b1c81cb3b121f4d9'

# 封装模型响应函数
def get_response(messages):
    response = dashscope.Generation.call(
        model='deepseek-v3',
        messages=messages,
        result_format='message'  # 将输出设置为message形式
    )
    return response

def get_table_response(messages):
    response = dashscope.MultiModalConversation.call(
        model='qwen-vl-plus',
        messages=messages
    )
    return response

# 通过第三方接口获取数据库服务器状态
def get_current_status():
    # 生成连接数数据
    connections = random.randint(10, 100)
    # 生成CPU使用率数据
    cpu_usage = round(random.uniform(1, 100), 1)
    # 生成内存使用率数据
    memory_usage = round(random.uniform(10, 100), 1)
    status_info = {
        "连接数": connections,
        "CPU使用率": f"{cpu_usage}%",
        "内存使用率": f"{memory_usage}%"
    }
    return json.dumps(status_info, ensure_ascii=False)

# 封装模型响应函数
def get_status_response(messages):
    response = dashscope.Generation.call(
        model='qwen-turbo',
        messages=messages,
        tools=tools,
        result_format='message'  # 将输出设置为message形式
    )
    return response