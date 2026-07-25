import vue from "@vitejs/plugin-vue"
import { defineConfig } from "vite"

export default defineConfig({
	plugins: [vue()],
	base: "/monorepo/seller/",
	server: { port: 5174 },
})
