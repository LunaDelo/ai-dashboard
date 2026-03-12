#!/usr/bin/env python3
"""
自动化每日任务生成脚本
根据长期目标，每天生成4-5项推进目标的任务，更新看板
"""

import datetime
import json
from pathlib import Path

# 长期目标背景
GOALS = """
整体目标：
1. 打造AI领域自媒体矩阵（公众号/小红书/抖音/推特），发展到总计10万粉丝，建立知名科技博主人设
2. 内容遵循HKR理论：Happiness（快乐好看有趣）/ Knowledge（知识增量信息密度）/ Resonance（情绪共鸣）
3. Q3推出一款AI产品，建立AI领域社区
4. 个人目标：每3个月读1本书，学习英语
5. 业务目标：月收入提升到1万美元，与5个AI领域知名博主建立合作，尽可能实现工作流程自动化
"""

# 任务分类池，每天随机选4-5项
TASK_POOL = [
    {
        "title": "梳理AI领域本周热门内容话题",
        "description": "通过搜索找到AI领域当前热门话题，筛选适合自媒体创作的主题",
    },
    {
        "title": "分析AI领域X个头部科技博主内容风格",
        "description": "研究竞争对手，总结值得借鉴的涨粉经验和内容方向",
    },
    {
        "title": "起草一篇符合HKR理论的AI主题公众号/小红书文案",
        "description": "按照HKR方法论创作一篇文案初稿，测试内容方法论",
    },
    {
        "title": "完善自己的写作风格和写作规范",
        "description": "总结最近写作经验，优化表达风格，更符合HKR理论",
    },
    {
        "title": "研究潜在的商业合作伙伴",
        "description": "找到AI领域5个可以合作的博主，整理联系方式和合作切入点",
    },
    {
        "title": "分析前一天发表的文章数据和总结",
        "description": "看阅读、点赞、涨粉数据，总结经验教训，优化下一篇内容",
    },
    {
        "title": "根据热门话题起草视频脚本",
        "description": "选一个热门话题，写出适合抖音/小红书的视频脚本",
    },
    {
        "title": "完善工作流程自动化脚本",
        "description": "优化现有自动化工具，减少手动操作，提高效率",
    },
    {
        "title": "读AI领域书籍，整理读书笔记",
        "description": "完成每月读书计划，整理有用知识点沉淀到知识库",
    },
    {
        "title": "学习英语，练习AI专业词汇",
        "description": "保持每日英语练习，积累AI领域专业英文词汇",
    },
    {
        "title": "构思AI产品新功能",
        "description": "根据用户反馈，构思产品新功能，完善产品 roadmap",
    },
    {
        "title": "回复粉丝评论和私信",
        "description": "回复粉丝问题，建立连接，收集用户需求",
    },
]

# 看板文件路径
PAGE_PATH = Path(__file__).parent.parent / "ai-dashboard" / "app" / "page.tsx"

def generate_daily_tasks():
    """生成今日任务，返回任务列表"""
    import random
    # 随机选4-5个任务
    num_tasks = random.randint(4, 5)
    selected = random.sample(TASK_POOL, num_tasks)
    today = datetime.datetime.now().strftime("%Y-%m-%d")
    
    tasks = []
    for i, task in enumerate(selected):
        task_id = f"daily-{today}-{i}"
        tasks.append({
            "id": task_id,
            "title": task["title"],
            "description": task["description"],
            "status": "todo",
            "createdAt": today,
        })
    
    return tasks

def update_kanban():
    """更新看板文件，添加今日任务"""
    # 这里只需要生成任务，手动或者后续自动化更新，现在先输出今日任务
    today = datetime.datetime.now().strftime("%Y-%m-%d")
    tasks = generate_daily_tasks()
    
    print(f"📅 {today} 每日任务生成完成：")
    for task in tasks:
        print(f"  • {task['title']}")
        print(f"    {task['description']}")
        print()
    
    # 保存今日任务到日志
    log_path = Path(__file__).parent.parent / "logs" / f"daily-tasks-{today}.json"
    with open(log_path, "w") as f:
        json.dump(tasks, f, indent=2)
    
    print(f"✅ 任务已保存到: {log_path}")
    return tasks

if __name__ == "__main__":
    update_kanban()
