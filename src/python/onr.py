 # 导入整个模块
import utils
import current_weater

if __name__ == "__main__":

 review = '这款音效特别好 给你意想不到的音质。'
 messages=[
    {"role": "system", "content": "你是一名舆情分析师，帮我判断产品口碑的正负向，回复请用一个词语：正向 或者 负向"},
    {"role": "user", "content": review}
  ]

 response = utils.get_response(messages)

 result=response.output.choices[0].message.content

 print(result)

weater = current_weater.run_conversation()

if weater:
    print("最终结果:", weater)
else:
    print("对话执行失败")

table_content=[
    {'image': 'https://aiwucai.oss-cn-huhehaote.aliyuncs.com/pdf_table.jpg'}, # Either a local path or an url
    {'text': '这是一个表格图片，帮我提取里面的内容，输出JSON格式'}
  ]
table_messages=[{"role": "user", "content": table_content}]

table_response = utils.get_table_response(table_messages)

print(table_response)

