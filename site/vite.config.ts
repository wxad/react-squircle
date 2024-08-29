import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig(({ mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    // 定义全局变量，类型在 typings/custom.d.ts 中
    define: {
      'import.meta.env.VERSION': JSON.stringify(env.npm_package_version),

      /**
       * 以下内容需人工配置
       */

      // 最终上线链接
      'import.meta.env.URL': JSON.stringify(
        'https://wxad.design/react-squircle'
      ),
      // 页面标题
      'import.meta.env.TITLE': JSON.stringify('React 曲率连续圆角组件'),
      // 朋友圈 & 会话分享标题
      'import.meta.env.SHARE_TITLE': JSON.stringify('React 曲率连续圆角组件'),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});
