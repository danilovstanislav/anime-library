<template>
	<h2 class="section-title">
		<slot></slot>
	</h2>
</template>

<style lang="sass" scoped>
.section-title
	@include borderBottom
	margin: 0
	font-weight: 700
	font-size: 20px
</style>