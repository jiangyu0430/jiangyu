# Jiang Yu 个人网站

这是我的个人网站项目，基于 [React](https://reactjs.org/) + [Vite](https://vitejs.dev/) 搭建，支持多环境部署，采用 Tailwind CSS 构建响应式样式，适配国内访问加速。

## 📦 技术栈

- React 18
- Vite 4+
- React Router 6
- Tailwind CSS
- GitHub Actions / 腾讯云 EdgeOne 自动部署

## 🖥️ 项目启动

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run dev
```

### 构建发布版本

```bash
npm run build
```

构建结果输出至 `dist/` 目录。

## 🚀 部署说明

### GitHub Pages

```bash
npm run deploy
```

- 发布至 `gh-pages` 分支
- 使用 HashRouter
- 已在 `vite.config.js` 中配置环境识别

### 腾讯云 EdgeOne

- 自动拉取 GitHub 主分支（main）
- 构建命令：`npm run build`
- 输出目录：`dist`
- 使用 BrowserRouter 干净路由

## 📁 目录结构简介

```
├─ src/
│  ├─ pages/              页面组件
│  ├─ components/         通用组件
│  ├─ assets/             图片等静态资源
│  ├─ App.jsx             路由主入口
│  └─ main.jsx            React 渲染入口
├─ public/                公共资源目录（含字体）
├─ index.html             HTML 模板
├─ vite.config.js          Vite 配置
```

## ✅ TODO / 特性计划

- [x] 响应式页面适配
- [x] 动态项目弹窗
- [x] 图片 lazyload 和字体 preload
- [ ] 博客系统接入
- [ ] SSR 支持与性能增强

## 👤 作者

Jiang Yu – [jiangyua.cn](https://jiangyua.cn)

---

## 📄 License / 版权说明

本项目为 Jiang Yu 个人网站专属项目，未经许可禁止复制、使用或商用。仅用于展示和参考目的。

© Jiang Yu. All rights reserved.
