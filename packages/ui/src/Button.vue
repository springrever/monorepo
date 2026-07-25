<template>
	<button class="btn" @click="$emit('click')">
		<slot />
	</button>
</template>

<style scoped>
	.btn {
		background: #42b883;
		color: white;
		padding: 8px 16px;
		border-radius: 6px;
		cursor: pointer;
		font-size: 14px;
		border: 4px solid red;
	}
	.btn:hover {
		background: #33a06f;
	}
</style>
