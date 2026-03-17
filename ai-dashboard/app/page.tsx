'use client';

import { useState, useEffect } from 'react';
import { Task } from '@/types';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('./app/data/tasks.json')
      .then(res => res.json())
      .then(data => {
        const fetchInitialTasks = async () => {
          const response = await fetch('./app/data/initial-tasks.json');
          if (response.ok) {
            const initial = await response.json();
            setTasks([...initial, ...data]);
          } else {
            setTasks(data);
          }
          setLoading(false);
        };
        fetchInitialTasks();
      })
      .catch(err => {
        console.error('Failed to load tasks:', err);
        setLoading(false);
      });
  }, []);

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
        目标：打造AI领域自媒体矩阵到10万粉丝，遵循HKR内容方法论 | 更新时间：{new Date().toISOString().split('T')[0]}
      </div>
    </div>
  );
}
