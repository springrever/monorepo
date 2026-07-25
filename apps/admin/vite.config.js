import vue from "@vitejs/plugin-vue"
import { defineConfig } from "vite"
import path from "path"
const root = path.resolve(__dirname, "../..")
export default defineConfig({
	plugins: [vue()],
	server: { port: 5173 },
	resolve: {
		alias: {
			"@ecom/ui": path.resolve(root, "packages/ui"),
			"@ecom/utils": path.resolve(root, "packages/utils"),
		},
	},
})
