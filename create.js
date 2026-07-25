const fs = require("fs")
const path = require("path")

// 定义所有要生成的文件路径和内容（以项目根目录为基准）
const files = {
	// ===== 根目录配置 =====
	"package.json": JSON.stringify(
		{
			name: "ecommerce-platform",
			private: true,
			scripts: {
				dev: "pnpm run -r --parallel dev",
				build: "pnpm run -r build",
			},
			devDependencies: {
				eslint: "^8.57.0",
				prettier: "^3.3.0",
			},
		},
		null,
		2,
	),

	"pnpm-workspace.yaml": `packages:
  - "apps/*"
  - "packages/*"
`,

	".gitignore": `node_modules
dist
.DS_Store
*.log
`,

	// ===== packages/ui =====
	"packages/ui/package.json": JSON.stringify(
		{
			name: "@ecom/ui",
			version: "1.0.0",
			main: "src/index.js",
			peerDependencies: { vue: "^3.4.0" },
		},
		null,
		2,
	),

	"packages/ui/src/Button.vue": `<template>
  <button class="btn" @click="$emit('click')">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  background: #42b883;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}
.btn:hover {
  background: #33a06f;
}
</style>
`,

	"packages/ui/src/index.js": `export { default as Button } from './Button.vue'
`,

	// ===== packages/utils =====
	"packages/utils/package.json": JSON.stringify(
		{
			name: "@ecom/utils",
			version: "1.0.0",
			main: "src/index.js",
		},
		null,
		2,
	),

	"packages/utils/src/index.js": `export const formatPrice = (price) => {
  return '¥' + price.toFixed(2)
}

export const getStatusText = (status) => {
  const map = { 1: '待付款', 2: '已发货', 3: '已完成' }
  return map[status] || '未知'
}
`,

	// ===== apps/admin =====
	"apps/admin/package.json": JSON.stringify(
		{
			name: "@ecom/admin",
			version: "1.0.0",
			dependencies: {
				vue: "^3.4.0",
				"@ecom/ui": "workspace:*",
				"@ecom/utils": "workspace:*",
			},
			devDependencies: {
				"@vitejs/plugin-vue": "^5.0.0",
				vite: "^5.0.0",
			},
			scripts: {
				dev: "vite",
				build: "vite build",
			},
		},
		null,
		2,
	),

	"apps/admin/vite.config.js": `import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  server: { port: 5173 }
})
`,

	"apps/admin/index.html": `<!DOCTYPE html>
<html>
<head><title>Admin 后台</title></head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>
`,

	"apps/admin/src/main.js": `import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
`,

	"apps/admin/src/App.vue": `<template>
  <div class="container">
    <h1>🛒 运营后台</h1>
    <p>商品售价：{{ formatPrice(199.99) }}</p>
    <Button @click="handleClick">上架商品</Button>
  </div>
</template>

<script setup>
import { Button } from '@ecom/ui'
import { formatPrice } from '@ecom/utils'

const handleClick = () => {
  alert('商品已上架！')
}
</script>

<style>
body { font-family: sans-serif; background: #f5f5f5; }
.container { padding: 40px; }
</style>
`,

	// ===== apps/seller =====
	"apps/seller/package.json": JSON.stringify(
		{
			name: "@ecom/seller",
			version: "1.0.0",
			dependencies: {
				vue: "^3.4.0",
				"@ecom/ui": "workspace:*",
				"@ecom/utils": "workspace:*",
			},
			devDependencies: {
				"@vitejs/plugin-vue": "^5.0.0",
				vite: "^5.0.0",
			},
			scripts: {
				dev: "vite",
				build: "vite build",
			},
		},
		null,
		2,
	),

	"apps/seller/vite.config.js": `import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  server: { port: 5174 }
})
`,

	"apps/seller/index.html": `<!DOCTYPE html>
<html>
<head><title>Seller 商家后台</title></head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>
`,

	"apps/seller/src/main.js": `import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
`,

	"apps/seller/src/App.vue": `<template>
  <div class="container">
    <h1>🏪 商家后台</h1>
    <p>订单状态：{{ getStatusText(2) }}</p>
    <Button @click="handleClick">发货</Button>
  </div>
</template>

<script setup>
import { Button } from '@ecom/ui'
import { getStatusText } from '@ecom/utils'

const handleClick = () => {
  alert('订单已发货！')
}
</script>

<style>
body { font-family: sans-serif; background: #fff8f0; }
.container { padding: 40px; }
</style>
`,
}

// ===== 写入逻辑 =====
Object.entries(files).forEach(([filePath, content]) => {
	const fullPath = path.join(__dirname, filePath)
	const dir = path.dirname(fullPath)

	// 递归创建目录
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true })
	}

	// 写入文件
	fs.writeFileSync(fullPath, content, "utf8")
	console.log(`✅ 已生成: ${filePath}`)
})

console.log("\n🎉 所有源码文件生成完毕！")
console.log("📦 接下来执行: pnpm install")
console.log("🚀 然后运行: pnpm run dev")
