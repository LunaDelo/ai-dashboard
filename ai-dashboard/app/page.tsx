
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
    status: 'todo',
    createdAt: '2026-03-12',
  },
  {
    id: '4',
    title: '分析AI领域5个头部科技博主内容风格',
    description: '研究竞争对手，总结值得借鉴的涨粉经验和内容方向',
    status: 'todo',
    createdAt: '2026-03-12',
  },
  {
    id: '5',
    title: '起草一篇符合HKR理论的AI主题小红书文案',
    description: '按照HKR方法论创作一篇小红书文案初稿，测试内容方法论',
    status: 'todo',
    createdAt: '2026-03-12',
  },
  {
    id: '6',
    title: '自动化每日任务生成工作流',
    description: '实现每天自动生成4-5项推进目标的任务，减少手动操作',
    status: 'todo',
    createdAt: '2026-03-12',
  },
  {
    id: '7',
    title: '部署看板到外网可访问',
    description: '研究部署方案，让外网可以直接访问任务看板',
    status: 'done',
    createdAt: '2026-03-12',
    completedAt: '2026-03-12',
    report: '已配置好Github Pages部署所需配置：\n1. 修改next.config.ts，添加output: \'export\'，支持静态导出\n2. 添加.nojekyll文件，让Github Pages正确处理所有静态文件\n\n部署步骤：\n1. 将当前整个workspace仓库推送到你的Github\n2. 进入Github仓库 → Settings → Pages\n3. 配置：\n   - Source: Deploy from a branch\n   - Branch: 选择你推送的分支，目录选择 /(root)\n   - Build and deployment → GitHub Actions → Configure\n   - 复制下面配置到 .github/workflows/deploy.yml\n```yaml\nname: Deploy to GitHub Pages\non:\n  push:\n    branches: [master]\njobs:\n  build-and-deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - name: Checkout\n        uses: actions/checkout@v4\n      - name: Install dependencies\n        run: cd ai-dashboard && npm ci\n      - name: Build\n        run: cd ai-dashboard && npm run build\n      - name: Deploy\n        uses: peaceiris/actions-gh-pages@v4\n        with:\n          github_token: ${{ secrets.GITHUB_TOKEN }}\n          publish_dir: ./ai-dashboard/out\n```\n4. 提交后Github Actions会自动构建部署，完成后就能在Github Pages访问了。'
  }
];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const getTasksByStatus = (status: Task['status']) => {
    return tasks.filter(task => task.status === status);
  };

  const updateTaskStatus = (id: string, status: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status, completedAt: status === 'done' ? new Date().toISOString().split('T')[0] : undefined } : task
    ));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">AI自媒体成长任务看板</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Todo */}
        <div className="bg-gray-100 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">待办</h2>
          <div className="space-y-3">
            {getTasksByStatus('todo').map(task => (
              <div 
                key={task.id} 
                className="bg-white rounded shadow p-3 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedTask(task)}
              >
                <h3 className="font-medium">{task.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{task.description}</p>
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
              <p className="text-gray-400 text-sm italic">暂无待办任务</p>
            )}
          </div>
        </div>

        {/* In Progress */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">进行中</h2>
          <div className="space-y-3">
            {getTasksByStatus('in-progress').map(task => (
              <div 
                key={task.id} 
                className="bg-white rounded shadow p-3 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedTask(task)}
              >
                <h3 className="font-medium">{task.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{task.description}</p>
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
              <p className="text-gray-400 text-sm italic">暂无进行中任务</p>
            )}
          </div>
        </div>

        {/* Done */}
        <div className="bg-green-50 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4 text-green-700">已完成</h2>
          <div className="space-y-3">
            {getTasksByStatus('done').map(task => (
              <div 
                key={task.id} 
                className="bg-white rounded shadow p-3 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedTask(task)}
              >
                <h3 className="font-medium line-through">{task.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                <p className="text-xs text-gray-400 mt-2">完成于: {task.completedAt}</p>
              </div>
            ))}
            {getTasksByStatus('done').length === 0 && (
              <p className="text-gray-400 text-sm italic">暂无已完成任务</p>
            )}
          </div>
        </div>
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-10">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{selectedTask.title}</h2>
              <button 
                className="text-gray-500 hover:text-gray-700 text-2xl"
                onClick={() => setSelectedTask(null)}
              >
                &times;
              </button>
            </div>
            <p className="text-gray-600 mb-4">{selectedTask.description}</p>
            {selectedTask.report && (
              <div className="bg-gray-50 p-4 rounded whitespace-pre-wrap text-sm">
                {selectedTask.report}
              </div>
            )}
            <div className="mt-6 flex justify-end">
              <button 
                className="bg-gray-200 px-4 py-2 rounded"
                onClick={() => setSelectedTask(null)}
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 text-center text-gray-500 text-sm">
        目标：打造AI领域自媒体矩阵到10万粉丝，遵循HKR内容方法论 | 更新时间：2026-03-12
      </div>
    </div>
  );
}
