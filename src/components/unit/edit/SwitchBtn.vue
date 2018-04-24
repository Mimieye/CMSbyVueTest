<template>
	<div class="switchBtn" @click="switchStatus = !switchStatus" :class="{'open': switchStatus}">
		<div class="bar"></div>
	</div>
</template>

<script>

	export default {
		name: 'switchBtn',
		props: ["value"],
		data () {
			return {
				switchStatus: false
			}
		},
		watch: {
			switchStatus: function (data) {
				if (data) {
					this.$emit('input', 1)
				} else {
					this.$emit('input', 0)
				}
			}
		},
		mounted () {
			if (this.value === 1) {
				this.switchStatus = true;
			} else {
				this.switchStatus = false;
			}
		}
	}
</script>

<style lang="sass" scoped>
	.switchBtn
		position: relative
		width: 80px
		height: 35px
		background-color: #E4E4E4
		border-radius: 3px
		border: 1px solid #CCC
		-webkit-transition: background-color 0.3s
		-moz-transition: background-color 0.3s
		-ms-transition: background-color 0.3s
		-o-transition: background-color 0.3s
		transition: background-color 0.3s
		cursor: pointer
		&::before, &::after
			position: absolute
			top: 0
			right: 0
			padding: 0 12px
			font-size: 13px
			text-align: center
			color: #818181
			line-height: 35px
			-webkit-transition: all 0.3s
			-moz-transition: all 0.3s
			-ms-transition: all 0.3s
			-o-transition: all 0.3s
			transition: all 0.3s
		&::before
			opacity: 0
			right: auto
			color: #FFF
			content: "開啟"
		&::after
			content: "關閉"
		&.open
			color: #FFF
			background-color: #519ECC
			.bar
				-webkit-transform: translateX(50px)
				-moz-transform: translateX(50px)
				-ms-transform: translateX(50px)
				-o-transform: translateX(50px)
				transform: translateX(50px)
			&::before
				opacity: 1
			&::after
				opacity: 0
		.bar
			position: relative
			top: -1px
			left: -1px
			width: 30px
			height: 35px
			border-radius: 3px
			border: 1px solid #CCC
			background: -webkit-linear-gradient(#FAFBFB, #F4F4F4)
			background: linear-gradient(#FAFBFB, #F4F4F4)
			-webkit-transform: translate(0)
			-moz-transform: translate(0)
			-ms-transform: translate(0)
			-o-transform: translate(0)
			transform: translate(0)
			-webkit-transition: transform 0.3s
			-moz-transition: transform 0.3s
			-ms-transition: transform 0.3s
			-o-transition: transform 0.3s
			transition: transform 0.3s
</style>