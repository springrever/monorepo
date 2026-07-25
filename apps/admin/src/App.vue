<template>
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
