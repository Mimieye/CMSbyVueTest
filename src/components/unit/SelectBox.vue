<template>
	<div class="select" :class="[{ 'open': openStatus }, className]" v-clickOutside="closeIt">
		<span class="display" @click="openSelect">
			{{ selectVal }}
			<svg v-if="className === 'time'" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="17px" height="17px" viewBox="0 0 36 36" enable-background="new 0 0 36 36" xml:space="preserve">
				<path fill="#b9b9b9" d="M18,0C8.075,0,0,8.075,0,18s8.075,18,18,18s18-8.075,18-18S27.925,0,18,0z M18,33C9.717,33,3,26.283,3,18 S9.717,3,18,3c8.284,0,15,6.717,15,15S26.284,33,18,33z"/>
				<path fill="#b9b9b9" d="M29,16h-9V7c0-1.104-0.896-2-2-2s-2,0.896-2,2v11c0,1.104,0.896,2,2,2h11c1.104,0,2-0.896,2-2S30.104,16,29,16z"/>
			</svg>
		</span>
		<ul class="optionList">
			<li class="option" @click="selectOption(thisData)" v-for="(thisData, index) in selectBoxData">{{ thisData.text }}</li>
		</ul>
	</div>
</template>

<script>
	import clickOutside from '@/directive/clickOutside'

	export default {
		name: 'selectBox',
		props: ['value', 'selectBoxData', 'className', 'statusIndex'],
		data () {
			return {
				selectVal: '',
				openStatus: false
			}
		},
		methods: {
			selectOption: function (thisData) {
				this.selectVal = thisData.text;
				this.openStatus = false;

				if (!this.className) {
					this.$emit("statusChange", [thisData.val, this.statusIndex]);
				}
				this.$emit('input', thisData.val);
			},
			openSelect: function () {
				this.openStatus = !this.openStatus;
			},
			closeIt: function () {
				this.openStatus = false;
			}
		},
		directives: {
			clickOutside
		},
		watch: {
			value: function (data) {
				if (data === '') {
					this.selectOption(this.selectBoxData[0]);
				}
			}
		},
		mounted () {
			let match = this.selectBoxData.filter(i => i.val === this.value);
			if (match.length > 0 && match[0].text) {
				this.selectVal = match[0].text;
			} else {
				this.selectOption(this.selectBoxData[0]);
			}
		}
	}
</script>

<style lang="sass" scoped>
	.select
		position: relative
		vertical-align: middle
		display: inline-block
		&.allGray
			.display
				padding: 0 30px 0 10px
				border: 1px solid #D9D9D9
				background: linear-gradient(#FAFBFB, #F4F4F4)
				color: #2A8DC8
				&::after
					position: absolute
					content: ''
					top: 50%
					margin-top: -3px
					right: 10px
					border-style: solid
					border-width: 5px 5px 0 5px
					border-color: #2a8dc8 transparent transparent transparent
		&.displayGray
			@extend .allGray
			.optionList
				background-color: #FFF
		&.time
			.display
				min-width: 64px
				padding: 0 30px 0 10px
				border: 1px solid #D9D9D9
				background: #FFF
				color: #666
			.optionList
				background-color: #FFF
			svg
				position: absolute
				display: block
				width: 17px
				height: 17px
				top: 50%
				right: 10px
				margin-top: -9px
		&.open
			.display
				border: 1px solid #2A8DC8
				background-color: #FFF
				&::after
					border-style: solid
					border-width: 0 5px 5px 5px
					border-color: transparent transparent #2a8dc8 transparent
			.bgGray
				.display
					background-color: transparent
			.optionList
				display: block

		.display
			position: relative
			display: block
			line-height: 33px
			border-radius: 3px
			cursor: pointer
			border: 1px solid transparent
			padding: 0 15px
		.optionList
			position: absolute
			display: none
			left: 0px
			right: 0px
			border: 1px solid #D9D9D9
			overflow: auto
			color: #666
			margin: 0
			padding: 0
			list-style: none
			background-color: #F7F7F7
			z-index: 1
		.option
			cursor: pointer
			padding: 5px 10px
			white-space: nowrap
			&:hover
				color: #FFF
				background-color: #519FCC
</style>