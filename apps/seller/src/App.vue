<template>
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
