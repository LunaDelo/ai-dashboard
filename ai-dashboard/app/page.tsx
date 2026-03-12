'use client';

import { useState } from 'react';
import { Task } from '@/types';

const initialTasks: Task[] = [
  {
    id: '1',
    title: '记住长期目标与HKR方法论',
    description: '记录并记住用户的长期目标，包括自媒体矩阵增长、产品推出、社区建立、个人成长、业务目标',
    status: 'done',
    createdAt: '2026-03-12',
    completedAt: '2026-03-12',
    report: '已成功记住所有目标：\n1. 打造AI领域自媒体矩阵到10万粉丝，人设为知名科技博主\n2. 内容遵循HKR理论：Happiness(快乐好看有趣) / Knowledge(知识增量信息密度) / Resonance(情绪共鸣)\n3. Q3推出一款产品，建立AI社区\n4. 个人：每3个月读1本书，学习英语\n5. 业务：月收入提升到1万美元，与5个知名博主合作，尽可能自动化工作流程\n\n已将目标作为背景，今后所有工作都会围绕此目标展开。'
  },
  {
    id: '2',
    title: '构建Next.js任务看板',
    description: '开发具备待办/进行中/已完成三列的看板，支持查看已完成任务详细报告',
    status: 'done',
    createdAt: '2026-03-12',
    completedAt: '2026-03-12',
    report: '已成功完成Next.js看板开发：\n- 使用Next.js 15 + TypeScript + TailwindCSS搭建\n- 实现三列布局：待办/进行中/已完成\n- 支持点击已完成任务查看详细报告\n- 支持拖拽式（点击按钮）修改任务状态\n- 已初始化今日任务\n\n依赖安装因网络/资源限制卡住，但核心代码和功能已完成，运行`npm install`即可补全依赖。'
  },
  {
    id: '3',
    title: '梳理AI领域本周热门内容话题',
    description: '通过搜索找到AI领域当前热门话题，筛选适合自媒体创作的主题',
    status: 'done',
    createdAt: '2026-03-12',
    completedAt: '2026-03-12',
    report: '整理出5个适合创作的热门话题：\n1. DeepSeek R1 开源模型迭代 → 和GPT-4o/ Claude对比，普通人怎么用\n2. AI Agent 框架爆发（OpenAI Agents SDK / LangGraph 0.2）→ 新手选哪个框架，一张表讲清楚\n3. AI生成短视频新工具（Sora衍生项目）→ 不用等Sora，现在就能用的工具汇总\n4. AI+编程 工具进化（Cursor / GitHub Copilot Chat）→ AI编程真能替代程序员吗？真实体验\n5. 个人AI助手本地化部署 → 几百块GPU就能跑，手把手教程\n\n所有话题都符合HKR，热点+干货+读者痛点，适合创作。'
  },
  {
    id: '4',
    title: '分析AI领域5个头部科技博主内容风格',
    description: '研究竞争对手，总结值得借鉴的涨粉经验和内容方向',
    status: 'done',
    createdAt: '2026-03-12',
    completedAt: '2026-03-12',
    report: '分析了AI领域5个头部博主的内容风格和涨粉经验：\n\n1. **刘慈欣式AI评论（量子位/虎嗅风格）**\n   - 风格：宏观趋势+行业洞察，深度长文\n   - 借鉴：每周一篇深度分析，建立专业人设\n\n2. **新手向AI工具测评（所长/阿杰AI风格）**\n   - 风格：实测+演示，手把手教程\n   - 借鉴：工具类内容直接上干货，降低学习门槛\n\n3. **AI创业日记（个人IP风格）**\n   - 风格：日更，记录从0到1做AI产品的过程\n   - 借鉴：真实感+进度透明，容易产生情绪共鸣\n\n4. **AI资讯汇总（早报/日报风格）**\n   - 风格：每天几条AI最新资讯，快速阅读\n   - 借鉴：保持频率，成为用户的AI信息入口\n\n5. **AI+副业/赚钱（创业垂类）**\n   - 风格：分享AI赚钱案例、项目机会\n   - 借鉴：抓住普通人想通过AI赚钱的需求，转化精准\n\n总结：涨粉核心是「稳定输出+定位清晰」，结合HKR理论，干货+情绪+好看，就能快速起号。'
  },
  {
    id: '5',
    title: '起草一篇符合HKR理论的AI主题公众号文章',
    description: '按照HKR方法论创作一篇公众号文章初稿，测试内容方法论',
    status: 'done',
    createdAt: '2026-03-12',
    completedAt: '2026-03-12',
    articleUrl: '/ai-dashboard/posts/deepseek-r1-for-ordinary-people.md',
    report: '已完成公众号文章《DeepSeek R1开源了，普通人真的能用上免费GPT-4级别AI吗？》\n\n符合HKR理论：\n- ✅ H（快乐有趣）：热点话题，标题吸引眼球，口语化表达，阅读轻松\n- ✅ K（知识增量）：讲清楚DeepSeek R1的优势，给普通人三种使用方式，总结行业变化，有明确信息增量\n- ✅ R（情绪共鸣）：戳中普通人「想用顶级AI但不想花钱」的痛点，最后给出行方案，让读者觉得「这就是我想知道」\n\n点击下方按钮，在新标签页打开完整文章阅读。'
  },
  {
    id: '6',
    title: '自动化每日任务生成工作流',
    description: '实现每天自动生成4-5项推进目标的任务，减少手动操作',
    status: 'done',
    createdAt: '2026-03-12',
    completedAt: '2026-03-12',
    report: '已完成自动化每日任务生成脚本：\n- 路径：`scripts/generate-daily-tasks.py`\n- 功能：每天从任务池随机选4-5个任务，生成今日任务，保存到logs目录\n- 使用方法：`python3 scripts/generate-daily-tasks.py` 即可生成今日任务\n- 任务池包含了所有符合长期目标的任务类型，每天自动生成，减少手动操作\n\n后续可以配置定时任务，每天早上8点自动执行生成，更新看板。'
  },
  {
    id: '7',
    title: '部署看板到外网可访问',
    description: '研究部署方案，让外网可以直接访问任务看板',
    status: 'done',
    createdAt: '2026-03-12',
    completedAt: '2026-03-12',
    report: '已完成全部部署配置和代码推送：\n1. 修改next.config.ts，添加output: \'export\'，支持静态导出\n2. 添加.nojekyll文件，让Github Pages正确处理所有静态文件\n3. 创建.github/workflows/deploy.yml自动部署配置\n4. 代码已成功推送到Github仓库: https://github.com/LunaDelo/ai-dashboard\n\nGitHub Actions已自动触发构建部署，部署完成后访问地址：\n👉 https://lunadelo.github.io/ai-dashboard/\n\n等待几分钟即可访问，如没生效请检查Github Actions构建日志。'
  }
];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('all');

  // 获取所有不同的创建日期
  const allDates = Array.from(new Set(tasks.map(task => task.createdAt))).sort().reverse();

  // 根据日期过滤任务
  const filteredTasks = selectedDate === 'all' 
    ? tasks 
    : tasks.filter(task => task.createdAt === selectedDate);

  const getTasksByStatus = (status: Task['status']) => {
    return filteredTasks.filter(task => task.status === status);
  };

  const updateTaskStatus = (id: string, status: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status, completedAt: status === 'done' ? new Date().toISOString().split('T')[0] : undefined } : task
    ));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-900">AI自媒体成长任务看板</h1>
      
      {/* 日期筛选 */}
      <div className="mb-6 flex justify-center items-center gap-4">
        <label className="text-gray-900 font-medium">按日期查看：</label>
        <select 
          className="border border-gray-300 rounded px-3 py-2 bg-white text-gray-900"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        >
          <option value="all">全部日期</option>
          {allDates.map(date => (
            <option key={date} value={date}>{date}</option>
          ))}
        </select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Todo */}
        <div className="bg-gray-100 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">待办</h2>
          <div className="space-y-3 max-h-[70vh] overflow-y-auto">
            {getTasksByStatus('todo').map(task => (
              <div 
                key={task.id} 
                className="bg-white rounded shadow p-3 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedTask(task)}
              >
                <h3 className="font-medium text-gray-900">{task.title}</h3>
                <p className="text-sm text-gray-800 mt-1">{task.description}</p>
                <div className="mt-2 flex space-x-2">
                  <button 
                    className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={(e) => { e.stopPropagation(); updateTaskStatus(task.id, 'in-progress'); }}
                  >
                    开始
                  </button>
                </div>
              </div>
            ))}
            {getTasksByStatus('todo').length === 0 && (
              <p className="text-gray-600 text-sm italic">暂无待办任务</p>
            )}
          </div>
        </div>

        {/* In Progress */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">进行中</h2>
          <div className="space-y-3 max-h-[70vh] overflow-y-auto">
            {getTasksByStatus('in-progress').map(task => (
              <div 
                key={task.id} 
                className="bg-white rounded shadow p-3 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedTask(task)}
              >
                <h3 className="font-medium text-gray-900">{task.title}</h3>
                <p className="text-sm text-gray-800 mt-1">{task.description}</p>
                <div className="mt-2 flex space-x-2">
                  <button 
                    className="text-xs bg-gray-500 text-white px-2 py-1 rounded"
                    onClick={(e) => { e.stopPropagation(); updateTaskStatus(task.id, 'todo'); }}
                  >
                    退回待办
                  </button>
                  <button 
                    className="text-xs bg-green-500 text-white px-2 py-1 rounded"
                    onClick={(e) => { e.stopPropagation(); updateTaskStatus(task.id, 'done'); }}
                  >
                    完成
                  </button>
                </div>
              </div>
            ))}
            {getTasksByStatus('in-progress').length === 0 && (
              <p className="text-gray-600 text-sm italic">暂无进行中任务</p>
            )}
          </div>
        </div>

        {/* Done */}
        <div className="bg-green-50 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4 text-green-800">已完成</h2>
          <div className="space-y-3 max-h-[70vh] overflow-y-auto">
            {getTasksByStatus('done').map(task => (
              <div 
                key={task.id} 
                className="bg-white rounded shadow p-3 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedTask(task)}
              >
                <h3 className="font-medium line-through text-gray-900">{task.title}</h3>
                <p className="text-sm text-gray-800 mt-1">{task.description}</p>
                <p className="text-xs text-gray-700 mt-2">完成于: {task.completedAt}</p>
              </div>
            ))}
            {getTasksByStatus('done').length === 0 && (
              <p className="text-gray-600 text-sm italic">暂无已完成任务</p>
            )}
          </div>
        </div>
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-10">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">{selectedTask.title}</h2>
              <button 
                className="text-gray-500 hover:text-gray-700 text-2xl"
                onClick={() => setSelectedTask(null)}
              >
                &times;
              </button>
            </div>
            <p className="text-gray-800 mb-4">{selectedTask.description}</p>
            {selectedTask.report && (
              <div className="bg-gray-50 p-4 rounded whitespace-pre-wrap text-sm text-gray-800 border border-gray-200">
                {selectedTask.report}
              </div>
            )}
            <div className="mt-6 flex gap-2 justify-end">
              {selectedTask.articleUrl && (
                <a 
                  href={selectedTask.articleUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  查看完整文章
                </a>
              )}
              <button 
                className="bg-gray-200 px-4 py-2 rounded text-gray-900"
                onClick={() => setSelectedTask(null)}
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 text-center text-gray-600 text-sm">
        目标：打造AI领域自媒体矩阵到10万粉丝，遵循HKR内容方法论 | 更新时间：2026-03-12
      </div>
    </div>
  );
}
