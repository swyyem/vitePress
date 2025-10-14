# AI大模型技术术语

## 模型架构相关

- **Transformer**：基于自注意力机制（Self-Attention）的神经网络架构，是大模型（如GPT、BERT）的核心。

- **Self-Attention（自注意力）**：通过计算输入序列中所有位置的关联权重，动态捕捉上下文依赖。

- **Multi-Head Attention（多头注意力）**：将自注意力机制拆分为多个“头”，并行学习不同子空间的注意力模式。

- **FFN（Feed-Forward Network）**：Transformer中的全连接前馈网络，对每个位置独立进行非线性变换。

- **Layer Normalization（层归一化）**：对每一层的输出进行归一化，稳定训练过程。

- **Positional Encoding（位置编码）**：为输入序列添加位置信息，弥补Transformer缺乏时序感知的缺陷。

## 训练相关

- **Pre-training（预训练）**：在大规模无标注数据上训练模型，学习通用表示（如语言模型任务）。

- **Fine-tuning（微调）**：在预训练模型基础上，用特定任务的小规模标注数据进一步训练。

- **Self-Supervised Learning（自监督学习）**：通过设计辅助任务（如掩码语言模型）从无标注数据中自动生成监督信号。

- **Loss Function（损失函数）**：
  - **Cross-Entropy Loss（交叉熵损失）**：分类任务常用，衡量预测分布与真实分布的差异。
  - **Perplexity（困惑度）**：语言模型的评估指标，越低表示模型预测越准确。

- **Optimizer（优化器）**：
  - **Adam/AdamW**：自适应学习率优化算法，广泛用于大模型训练。

- **Learning Rate Scheduling（学习率调度）**：动态调整学习率（如余弦退火、线性预热）。

## 参数与计算

- **Parameters（参数量）**：模型可学习的权重数量（如GPT-3有1750亿参数）。

- **FLOPs（浮点运算次数）**：衡量模型计算复杂度。

- **GPU Memory（显存占用）**：训练/推理时模型占用的GPU内存，与参数量和批次大小相关。

- **Distributed Training（分布式训练）**：
  - **Data Parallelism（数据并行）**：将数据分片到多个设备，同步更新模型。
  - **Model Parallelism（模型并行）**：将模型分片到多个设备（如Tensor Parallelism、Pipeline Parallelism）。
  - **ZeRO（Zero Redundancy Optimizer）**：减少显存占用的分布式训练技术（DeepSpeed库实现）。

## 关键技术与方法

- Prompt Engineering（提示工程）：设计输入提示（Prompt）以引导模型生成期望输出。

- **Few-Shot Learning（少样本学习）**：通过少量示例让模型理解任务，无需微调。

- **RLHF（Reinforcement Learning from Human Feedback）**：基于人类反馈的强化学习（如ChatGPT的训练流程）。

- **LoRA（Low-Rank Adaptation）**：通过低秩矩阵微调大模型，减少计算成本。
- **KV Cache（Key-Value缓存）**：推理时缓存注意力层的Key/Value，加速生成过程。

- **KV Cache（Key-Value缓存）**：推理时缓存注意力层的Key/Value，加速生成过程。

## 评估指标

- **BLEU（Bilingual Evaluation Understudy）**：机器翻译或文本生成任务的评估指标，基于n-gram匹配。

- **ROUGE（Recall-Oriented Understudy for Gisting Evaluation）**：文本摘要任务的评估指标，衡量重叠单元（如词、n-gram）。

- **Accuracy/F1-Score**：分类任务的常用指标。

- **MMLU（Massive Multitask Language Understanding）**：评估模型多任务知识理解的基准。

## 常见模型家族

- **GPT（Generative Pre-trained Transformer）**：自回归模型，擅长生成任务（如GPT-3、ChatGPT）。

- **BERT（Bidirectional Encoder Representations）**：双向编码器模型，擅长理解任务。

- **T5（Text-to-Text Transfer Transformer）**：将所有任务统一为文本到文本的格式。

- **LLaMA（Meta开源模型）**：基于Transformer的高效大模型系列。

- **Mixture of Experts（MoE）**：稀疏激活模型，如Google的Switch Transformer。

## 其他重要概念

- **Tokenization（分词）**：将文本转换为模型可处理的token（如Byte-Pair Encoding）。

- **Temperature（温度参数）**：控制生成多样性的超参数（低温度=确定性高，高温度=随机性高）。

- **Top-k/Top-p采样**：生成文本时筛选候选token的策略（如Top-p=核采样）。

- **Hallucination（幻觉）**：模型生成与事实不符的内容。
