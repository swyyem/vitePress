import OpenAI from 'openai';

const openai = new OpenAI({
  // 若没有配置环境变量，请用百炼API Key将下行替换为：apiKey: "sk-xxx",
  apiKey: 'sk-0e5d43645e0b47f3b1c81cb3b121f4d9',
  baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
});

async function main() {
  const completion = await openai.chat.completions.create({
    model: 'qwen-plus', //此处以qwen-plus为例，可按需更换模型名称。模型列表：https://help.aliyun.com/zh/model-studio/getting-started/models
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: '你是谁？' },
    ],
  });
  console.log(JSON.stringify(completion));
}

main();
