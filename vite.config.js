import { defineConfig, loadEnv } from 'vite'
import viteBaseConfig from './config/vite.base.config'
import viteDevConfig from './config/vite.dev.config'
import viteProdConfig from './config/vite.prod.config'

// 策略模式
const envResolver = {
  'build' : () => {
    console.log('生产环境开始打包...');
    return {
      ...viteBaseConfig,
      ...viteDevConfig
    }
  },
  'serve': () => {
    console.log('开发环境开始打包...');
    return {
      ...viteBaseConfig,
      ...viteProdConfig
    }
  },
  'test': () => {
    console.log('测试环境开始打包...');
    return {
      ...viteBaseConfig,
      ...viteProdConfig
    }
  },
}

export default defineConfig(({ command, mode }) => {
  // console.log('command', command)

  // console.log('process', process.env)

  const env = loadEnv(mode, process.cwd(), "")

  // console.log('env/////', env, mode)

  // loadEnv(mode, process.cwd(), "")

  // console.log('mode111', mode)

  return envResolver[command]()
})
