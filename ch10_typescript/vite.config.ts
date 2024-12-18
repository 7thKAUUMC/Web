import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.',  // 프로젝트 루트 디렉토리
  base: '/',  // 기본 경로
});
