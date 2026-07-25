# 电商平台 Monorepo

一个基于 Vue 3 的电商平台 Monorepo 项目，包含运营后台和商家后台两个应用，以及共享的 UI 组件库和工具函数库。

## 技术栈

- **框架**: Vue 3.4+
- **构建工具**: Vite 5.0+
- **包管理器**: pnpm
- **代码规范**: ESLint + Prettier

## 项目结构

```
monorepo2/
├── apps/                    # 应用目录
│   ├── admin/               # 运营后台 (端口 5173)
│   │   ├── src/
│   │   │   ├── App.vue
│   │   │   └── main.js
│   │   ├── index.html
│   │   ├── package.json
│   │   └── vite.config.js
│   └── seller/              # 商家后台 (端口 5174)
│       ├── src/
│       │   ├── App.vue
│       │   └── main.js
│       ├── index.html
│       ├── package.json
│       └── vite.config.js
├── packages/                # 共享包目录
│   ├── ui/                  # UI 组件库
│   │   ├── src/
│   │   │   ├── Button.vue
│   │   │   └── index.js
│   │   └── package.json
│   └── utils/               # 工具函数库
│       ├── src/
│       │   └── index.js
│       └── package.json
├── .gitignore
├── create.js                # 项目生成脚本
├── package.json
├── pnpm-lock.yaml
└── pnpm-workspace.yaml
```

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

同时启动所有应用：

```bash
pnpm run dev
```

或单独启动某个应用：

```bash
# 运营后台 (http://localhost:5173)
pnpm --filter @ecom/admin dev

# 商家后台 (http://localhost:5174)
pnpm --filter @ecom/seller dev
```

### 构建生产版本

```bash
pnpm run build
```

或单独构建某个应用：

```bash
pnpm --filter @ecom/admin build
pnpm --filter @ecom/seller build
```

## 可用脚本

| 脚本 | 说明 |
|------|------|
| `pnpm run dev` | 并行启动所有应用的开发服务器 |
| `pnpm run build` | 构建所有应用 |

### 包级别脚本

| 包 | 脚本 | 说明 |
|----|------|------|
| `@ecom/admin` | `dev` | 启动运营后台开发服务器 |
| `@ecom/admin` | `build` | 构建运营后台生产版本 |
| `@ecom/seller` | `dev` | 启动商家后台开发服务器 |
| `@ecom/seller` | `build` | 构建商家后台生产版本 |

## 包说明

### @ecom/ui

共享 UI 组件库，基于 Vue 3 开发。

**导出组件**:

- `Button` - 基础按钮组件

### @ecom/utils

共享工具函数库。

**导出函数**:

- `formatPrice(price)` - 格式化价格，返回带人民币符号的字符串
- `getStatusText(status)` - 获取订单状态文本（1=待付款，2=已发货，3=已完成）

## 工作空间依赖关系

```
@ecom/admin
├── @ecom/ui (workspace:*)
└── @ecom/utils (workspace:*)

@ecom/seller
├── @ecom/ui (workspace:*)
└── @ecom/utils (workspace:*)
```

## 代码规范

项目使用 ESLint 和 Prettier 进行代码规范检查。

## 许可证

MIT