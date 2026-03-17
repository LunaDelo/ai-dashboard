# GitHub Pages 部署 Next.js 看板 经验总结

## 问题排查记录

### 问题现象
- 刷新看板页面，控制台报错 `GET ...tasks.json 404 Not Found`
- 网页无法显示任务列表

### 根因分析
1. **路径错误** ➡️ 已修复
   - Next.js 部署在 GitHub Pages 子路径 `username.github.io/repo-name/`，需要配置 `basePath: '/repo-name'`
   - fetch 路径必须匹配 basePath

2. **静态文件部署问题** ➡️ **关键错误**
   - ❌ 错误做法：将 JSON 数据文件放在 `app/data/` 目录
   - ✅ 正确做法：**所有静态数据文件必须放在 `public/` 目录**
   - Next.js 静态导出 (`next export`) **只会**将 `public/` 目录下的文件复制到输出目录 `out/`，`app/` 下的非代码文件不会被部署

3. **缺失部署配置** ➡️ 已修复
   - 需要创建 `.github/workflows/deploy.yml` 配置 GitHub Actions 自动部署

### 正确配置步骤

#### 1. 项目配置 (`next.config.ts`)
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/repo-name',          // GitHub repo name
  assetPrefix: '/repo-name/',     // 确保资源路径正确
};

export default nextConfig;
```

#### 2. 静态文件存放
- **所有 JSON 数据/图片/其他静态资源** → `public/data/` 目录
- 访问路径：`/repo-name/data/filename.json`

#### 3. GitHub Actions 部署配置 `.github/workflows/deploy.yml`
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ["master"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Upload build artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

#### 4. fetch 路径示例
```typescript
// 正确：匹配 basePath + public 目录位置
fetch('/repo-name/data/tasks.json')

// 错误：
// fetch('./app/data/tasks.json') → 路径错
// fetch('/app/data/tasks.json') → 文件不在此目录
```

### 本次修复关键点
| 步骤 | 错误 | 正确 |
|------|------|------|
| 文件位置 | `app/data/` | `public/data/` |
| fetch 路径 | `./app/data/` | `/repo-name/data/` |
| 部署配置 | 缺失 | 完善 `.github/workflows/deploy.yml` |

### 验证部署成功
- 验证 JSON 文件可访问：`https://username.github.io/repo-name/data/tasks.json` → 返回 200 和 JSON 内容
- 打开看板页面：`https://username.github.io/repo-name/` → 正常加载任务列表，无控制台报错

## 本次任务完成结果
✅ **已成功修复**
- 所有历史已完成任务显示在「已完成」列
- 今日（2026-03-17）生成的 5 个任务显示在「待办」列
- 支持按日期筛选
- GitHub Actions 自动部署生效

---
*更新时间：2026-03-17*
