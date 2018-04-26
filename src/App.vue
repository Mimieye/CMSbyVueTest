<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	export default {
		name: 'App',
		methods: {
			...mapActions([
				'islogin',
			]),
		},
		beforeCreate () {
			let that = this;
			$.ajax({
				method: "POST",
				url: "http://192.168.0.236/FT2017CORE/auth",
				data: {},
			}).done(function (msg) {
				that.islogin(msg);
			});
		}
	}
</script>

<style lang="sass">
	@import "assets/_extend.sass"

	#app
		position: relative
		min-width: 1200px
		height: 100%

	.layout
		@extend %clearfix
		position: relative
		-webkit-box-sizing: border-box
		-moz-box-sizing: border-box
		box-sizing: border-box
		display: block
		min-height: 100%

	header
		@extend %clearfix
		position: fixed
		top: 0
		left: 0
		min-width: 1200px
		width: 100%
		background-color: #519ECC
		z-index: 3
		.hamburger
			-webkit-transition: width 0.3s
			-moz-transition: width 0.3s
			-ms-transition: width 0.3s
			-o-transition: width 0.3s
			transition: width 0.3s
			display: inline-block
			-webkit-box-sizing: border-box
			-moz-box-sizing: border-box
			box-sizing: border-box
			width: 80px
			height: 50px
			padding: 12px 15px 12px 25px
			overflow: hidden
			vertical-align: middle
			margin-right: 20px
			cursor: pointer
			&.open
				width: 165px
				.text
					opacity: 1
					-webkit-transition: opacity 0.3s
					-moz-transition: opacity 0.3s
					-ms-transition: opacity 0.3s
					-o-transition: opacity 0.3s
					transition: opacity 0.3s
					-webkit-transition-delay: 0.3s
					-moz-transition-delay: 0.3s
					-ms-transition-delay: 0.3s
					-o-transition-delay: 0.3s
					transition-delay: 0.3s
				.icon
					-webkit-transform: rotate(180deg)
					-moz-transform: rotate(180deg)
					-ms-transform: rotate(180deg)
					-o-transform: rotate(180deg)
					transform: rotate(180deg)
			.text
				opacity: 0
				vertical-align: middle
				margin: 0 0 0 10px
				color: #FFF
				white-space: nowrap
			.icon
				-webkit-transition: transform 0.3s
				-moz-transition: transform 0.3s
				-ms-transition: transform 0.3s
				-o-transition: transform 0.3s
				transition: transform 0.3s
				position: relative
				display: inline-block
				vertical-align: middle
				width: 30px
				height: 25px
				background-repeat: repeat
				background-image: linear-gradient(#FFF 50%, transparent 0%)
				-webkit-background-size: auto 42%
				-o-background-size: auto 42%
				background-size: auto 42%
		.btn
			position: relative
			display: inline-block
			svg
				display: inline-block
				vertical-align: middle
				margin-right: 5px
			a
				font-size: 15px
				color: #FFF
				text-decoration: none
		.home
			&:after
				content: '│'
				padding: 0 6px 0 15px
				cursor: default
				color: #FFF
		.accountWrap
			float: right
			text-align: right
			padding: 0 25px 0 0
			.mail
				letter-spacing: 1px
				margin: 5px 0
				font-size: 13px
				color: #FFF
			.userInfo
				.name, .editAccount, .logout
					position: relative
					margin: 0
					display: inline-block
					font-size: 13px
					color: #FFF
				.name, .logout
					&::after
						content: '│'
						padding: 0 5px 0 10px
						cursor: default
				.logout
					padding: 0
					border: 0
					background-color: transparent
				.editAccount
					text-decoration: none
					&:hover
						text-decoration: underline

	.menu
		position: absolute
		width: 165px
		height: 100%
		overflow: hidden
		background-color: #505A5F
		z-index: 2
		padding: 50px 0
		-webkit-box-sizing: border-box
		-moz-box-sizing: border-box
		box-sizing: border-box
		margin-left: -165px
		-webkit-transition: all 0.3s
		-moz-transition: all 0.3s
		-ms-transition: all 0.3s
		-o-transition: all 0.3s
		transition: all 0.3s
		&.show
			height: auto
			min-height: 100%
			margin-left: 0
		.lvOne
			position: relative
			list-style: none
			padding: 0
			margin: 0
			.lvOne-list
				cursor: pointer
				&:hover
					background-color: #507C96
			.listText, .listLink
				position: relative
				display: block
				font-size: 14px
				color: #D5DDE3
				margin: 0
				text-decoration: none
				padding: 15px 0 16px 20px
			.listText
				&:after
					position: absolute
					display: block
					content: ''
					top: 50%
					right: 20px
					margin-top: -4px
					width: 6px
					height: 6px
					border-bottom: #FFF 2px solid
					border-right: #FFF 2px solid
					float: right
					transform: rotate(-45deg)
		.lvTwo
			position: fixed
			list-style: none
			padding: 50px 0 0
			margin: 0
			top: 0
			left: 165px
			width: 225px
			height: 100%
			background-color: rgba(0, 0, 0, 0.85)
			h3
				font-size: 24px
				color: #519ECC
				text-align: center
				margin-bottom: 0
				padding-bottom: 60px
			li
				border-bottom: rgba(255, 255, 255, 0.15) 1px solid
			a
				padding: 14px 25px 15px
				font-size: 14px
				display: block
				text-decoration: none
				color: #D5DDE3
				&:hover
					color: #FFF
			.add
				width: 100px
				margin: 0 auto 20px
				padding: 0
				font-size: 14px
				text-align: center
				color: #519ECC
				&:hover
					color: #519ECC
			.plus
				position: relative
				display: block
				-webkit-box-sizing: border-box
				-moz-box-sizing: border-box
				box-sizing: border-box
				width: 50px
				height: 50px
				border-radius: 50%
				border: #519ECC 5px solid
				margin: 0 auto 15px
				&::before
					position: absolute
					top: 0
					left: 0
					bottom: 0
					right: 0
					margin: auto
					content: '+'
					line-height: 40px
					text-align: center
					color: #519ECC
					font-size: 55px

	nav
		position: absolute
		background-color: #505A5F
		min-height: 100%
		width: 80px
		padding-top: 50px
		-webkit-box-sizing: border-box
		-moz-box-sizing: border-box
		box-sizing: border-box
		z-index: 2
		ul
			list-style: none
			padding: 0
			margin: 0
		svg
			display: block
			margin: 8px auto
		a
			text-align: center
			display: block
			color: #FFF
			padding: 10px 0
			font-size: 12px
			color: #D5DDE3
			text-decoration: none
			&:hover
				background-color: rgba(158, 158, 158, 0.5)

	.searchBar
		@extend %clearfix
		position: absolute
		-webkit-box-sizing: border-box
		-moz-box-sizing: border-box
		box-sizing: border-box
		top: -100%
		background-color: #FFF
		-webkit-box-shadow: rgba(0, 0, 0, 0.2) 0 3px 3px
		box-shadow: rgba(0, 0, 0, 0.2) 0 3px 3px
		width: 100%
		z-index: 1
		padding: 20px 25px 20px 120px
		-webkit-transition: top 0.3s
		-moz-transition: top 0.3s
		-ms-transition: top 0.3s
		-o-transition: top 0.3s
		transition: top 0.3s
		&.open
			top: 50px
		.close
			position: absolute
			display: block
			top: 20px
			right: 25px
			width: 40px
			height: 40px
			cursor: pointer
			&::before
				position: absolute
				display: block
				content: ""
				top: 0
				left: 0
				right: 0
				bottom: 0
				margin:	auto
				width: 38px
				height: 4px
				background-color: #BCBCBC
				-webkit-transform: rotate(45deg)
				-moz-transform: rotate(45deg)
				-ms-transform: rotate(45deg)
				-o-transform: rotate(45deg)
				transform: rotate(45deg)
			&::after
				position: absolute
				display: block
				content: ""
				top: 0
				left: 0
				right: 0
				bottom: 0
				margin:	auto
				width: 38px
				height: 4px
				background-color: #BCBCBC
				-webkit-transform: rotate(-45deg)
				-moz-transform: rotate(-45deg)
				-ms-transform: rotate(-45deg)
				-o-transform: rotate(-45deg)
				transform: rotate(-45deg)
		.keyWords
			width: 94%
			display: block
			font-size: 30px
			height: 50px
			border: 0
			border-bottom: 1px solid #E3E3E3
			outline: none

	.contentBox
		-webkit-box-sizing: border-box
		-moz-box-sizing: border-box
		box-sizing: border-box
		padding: 70px 25px 50px 105px
		min-width: 1200px
		min-height: 100%
		.titleBar
			@extend %clearfix
			position: relative
		.pageTitle
			padding: 4px 0
			margin: 0
			font-size: 30px
			line-height: 30px
			color: #519ECC
		.searchBtn
			position: absolute
			right: 0
			top: 50%
			margin-top: -19px
			width: 38px
			height: 38px
			cursor: pointer

	/* 日曆 */
	.datePicker
		position: relative
		-webkit-box-sizing: border-box
		-moz-box-sizing: border-box
		box-sizing: border-box
		display: inline-block
		width: 140px
		border-radius: 3px
		border: 1px solid #D9D9D9
		background: #fff
		vertical-align: middle
		height: 35px
		input
			-webkit-box-sizing: border-box
			-moz-box-sizing: border-box
			box-sizing: border-box
			display: block
			padding: 0
			margin: 0
			width: 100%
			height: 33px
			font-size: 15px
			padding-left: 15px
			border: 0
			outline: 0
			color: #666666
			background: transparent
		svg
			position: absolute
			top: 50%
			right: 10px
			margin-top: -9px
			cursor: pointer
	.calendarSection
		position: relative
		z-index: 2
		width: 260px
		background-color: #FFF
		text-align: center
		border: 1px solid #C5C5C5
		.calendarHead
			background-color: #519ECC
		.selectSection
			padding: 5px 0
			select
				vertical-align: middle
				min-width: 60px
				border: none
				outline: none
				background: none
				color: #FFF
				font-weight: bold
				-moz-appearance: none
				cursor: pointer
				padding-bottom: 5px
				&:first-child
					margin-right: 10px
				&[name="year"]
					padding-top: 5px
			option
				color: #000
		.week
			width: 100%
			display: inline-flex
			justify-content: space-around
			padding: 5px 0 10px
			.text
				font-size: 15px
				color: #FFF
		.date
			display: inline-flex
			flex-wrap: wrap
			align-content: center
			justify-content: flex-start
			padding: 5px 0
			.text
				-webkit-box-sizing: border-box
				-moz-box-sizing: border-box
				box-sizing: border-box
				width: 100 / 7 + %
				color: #454545
				font-size: 15px
				width: 37px
				height: 37px
				line-height: 37px
				-webkit-border-radius: 50%
				border-radius: 50%
				&.hasVal
					cursor: pointer
				&.hasVal:hover, &.selected
					background-color: #519ECC
					color: #FFF


	/* 列表頁新增按鈕 */
	.addBtn
		margin: 25px 0 30px
		float: right
		color: #FFF
		background-color: #FF5253
		box-shadow: 0 3px 0 #DB0506
		font-size: 15px
		line-height: 15px
		padding: 10px 15px
		border: 0
		outline: none
		border-radius: 3px
		text-decoration: none
		&:active
			transform: translateY(3px)
			box-shadow: 0 0


	/* 列表頁共用 */
	.list
		clear: both
		.star
			&.selected
				path
					fill: #FF5253
		.order
			width: 60px
			height: 35px
			padding: 0 8px
			background: none
			border: none
			border-radius: 3px
			color: #2A8DC8
			outline: none
			text-align: center
			border: 1px solid transparent
			&:focus
				color: #666
				background: #FFF
				border: 1px solid #2A8DC8
		.hoverIcon
			cursor: pointer
			&:hover
				svg
					path
						fill: #519ECC
		.annotation
			position: absolute
			-webkit-transform: translateX(-50%)
			-moz-transform: translateX(-50%)
			-ms-transform: translateX(-50%)
			-o-transform: translateX(-50%)
			transform: translateX(-50%)
			left: 50%
			padding: 7px
			border-radius: 3px
			border: 1px solid #519ECC
			font-size: 13px
			text-align: left
			color: #519ECC
			background-color: #FFF
			z-index: 2
			bottom: 40px
			white-space: nowrap
		.confirmBox
			position: absolute
			z-index: 1
			right: 10px
			width: 390px
			bottom: 0
			padding: 20px
			border-radius: 3px
			background-color: #FFF
			border: 1px solid #FF988F
			box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15)
			svg
				vertical-align: middle
				display: inline-block
			.text
				vertical-align: middle
				display: inline-block
				line-height: 40px
				margin-right: 50px
				margin-left: 20px
				color: #666
			button
				-webkit-box-sizing: border-box
				-moz-box-sizing: border-box
				box-sizing: border-box
				font-size: 15px
				line-height: 15px
				padding: 10px 15px
				border: 0
				outline: none
				border-radius: 3px
				color: #FFF
			.redBtn
				background-color: #FF5253
				box-shadow: 0 3px 0 #DB0506
				&:hover
					background-color: #FF7071
					box-shadow: 0 3px 0 #F14243
				&:active
					transform: translateY(3px)
					box-shadow: 0 0
			.grayBtn
				color: #7D7D7D
				background-color: #EFEFEF
				border: 1px solid #DDD
				box-shadow: 0 3px 0 #DDD
				&:hover
					background-color: #D8D8D8
					box-shadow: 0 3px 0 #C8C8C8
				&:active
					transform: translateY(3px)
					box-shadow: 0 0
		.del
			cursor: pointer
			&:hover
				svg
					path
						fill: #8A8A8A
		.table
			position: relative
			display: flex
		table
			width: 100%
			border-collapse: collapse
			thead
				tr
					&:after
						position: absolute
						display: block
						content: ''
						left: 0
						width: 100%
						height: 70px
						box-shadow: 0 4px 7px -1px rgba(0, 0, 0, 0.1)
			a
				color: #519ECC
				font-weight: bold
				text-decoration: none
			tr
				&:nth-child(odd)
					background-color: #F4F8F9
				&:nth-child(even)
					background-color: #FFF
			th
				font-size: 16px
				height: 24px
				padding: 23px 0
				color: #505A5F
				background-color: #EBF0F1
			td
				position: relative
				font-size: 15px
				text-align: center
				padding: 18px 0 19px
				color: #666
				vertical-align: middle



	/* 編輯頁共用 */
	.editPage
		-webkit-box-sizing: border-box
		-moz-box-sizing: border-box
		box-sizing: border-box
		position: relative
		width: 100%
		margin-top: 25px
		min-height: 80vh
		border-top: 5px solid #BEBEBE
		padding: 40px 30px 50px 30px
		background-color: #FFF
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.15)
		&::before
			position: absolute
			top: -5px
			right: 0
			display: block
			content: ""
			width: 275px
			height: 5px
			background: linear-gradient(90deg, #1A9CCC, #1A9CCC 20%, #F4DA23 20%, #F4DA23 40%, #21933D 40%, #21933D 60%, #D60F68 60%, #D60F68 80%, #093E8E 80%)
		.row
			margin: 25px 0
			display: flex
			&:first-child
				margin-top: 0
			&.flex
				.rowContent
					flex: 1
			.rowTitle
				-webkit-box-sizing: border-box
				-moz-box-sizing: border-box
				box-sizing: border-box
				display: inline-flex
				height: 35px
				padding: 0 15px 0 0
				font-size: 15px
				color: #666
				align-items: center
				vertical-align: top
			.rowContent
				-webkit-box-sizing: border-box
				-moz-box-sizing: border-box
				box-sizing: border-box
				display: inline-flex
				align-items: center
				vertical-align: top
				> input[type=text]
					width: 100%
					height: 33px
					padding: 0 10px
					border: 1px solid #CCCCCC
					border-radius: 3px
				input[type=text].order
					width: 63px
				textarea
					width: 100%
					min-height: 50px
					padding: 10px
					border: 1px solid #CCCCCC
					border-radius: 3px
					resize: none
			.item
				margin-left: 35px
				&:first-child
					margin-left: 0
	.relatedUnit
		margin: 25px 0
		padding: 10px 25px
		border-radius: 3px
		border: 1px dashed #CCC
		.select
			vertical-align: top
			display: inline-block
			.display
				position: relative
				display: inline-block
				width: 150px
				height: 34px
				line-height: 34px
				padding-left: 15px
				border: 1px solid #CCC
				border-radius: 3px
				line-height: 35px
				color: #519ECC
				background: linear-gradient(#FAFBFB, #F4F4F4)
				cursor: pointer
			.optionList
				position: absolute
				width: 210px
				border: 1px solid #CCCCCC
				background-color: #F7F7F7
				z-index: 2
				padding: 10px 0
				.searchBox
					position: relative
					padding: 0 10px
					svg
						position: absolute
						display: block
						top: 50%
						margin-top: -9px
						left: 18px
				.searchList
					display: block
					width: 158px
					height: 31px
					padding-left: 30px
					font-size: 15px
					border: 1px solid #CECECE
					border-radius: 3px
				ul
					list-style: none
					padding: 0
					margin: 0
					.text
						display: block
						padding: 5px 10px
						cursor: pointer
					.item
						padding: 5px 10px
						display: block
						&:hover
							color: #FFF
							background-color: #519ECC
				> ul
					margin-top: 10px
					> li
						> .text
							color: #2A8DC8
		.unitSelectList
			vertical-align: top
			display: inline-block
			.unitItem
				display: inline-block
				margin-right: 25px
				.text
					display: inline-block
					padding: 7px 15px
					border-radius: 3px
					background-color: #3287A1
					border: solid 1px #2A7289
					font-size: 15px
					color: #FFF
					text-align: center
				.deleteBtn
					margin-left: 5px
					-webkit-border-radius: 50%
					border-radius: 50%
					display: inline-block
					width: 17px
					height: 17px
					text-align: center
					font-size: 13px
					color: #8D8D8D
					background-color: #E7E7E7
					cursor: pointer
	.ckeditor
		width: 100%
	.linkSetting
		.settingText
			display: inline-block
			line-height: 37px
			height: 35px
			vertical-align: middle
			font-size: 15px
			color: #519ECC
			cursor: pointer
		input[type="text"]
			width: 246px
			vertical-align: top
			display: inline-block
			height: 33px
			padding: 0 10px
			border: 1px solid #CCCCCC
			border-radius: 3px 0 0 3px
			margin-right: -6px
		.select
			.display
				border-radius: 0 3px 3px 0 !important
		.select
			width: 140px
			position: relative
			vertical-align: middle
			display: inline-block
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
				color: #2A8DC8
				line-height: 33px
				cursor: pointer
				border: 1px solid transparent
				padding: 0 15px
				border-radius: 0 3px 3px 0
				padding: 0 30px 0 10px
				border: 1px solid #D9D9D9
				background: linear-gradient(#FAFBFB, #F4F4F4)
				&::after
					position: absolute
					content: ''
					top: 50%
					margin-top: -3px
					right: 10px
					border-style: solid
					border-width: 5px 5px 0 5px
					border-color: #2a8dc8 transparent transparent transparent
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
				padding: 10px
				white-space: nowrap
				&:hover
					color: #FFF
					background-color: #519FCC
		.deleteBtn
			margin-left: 10px
			-webkit-border-radius: 50%
			border-radius: 50%
			display: inline-block
			width: 17px
			height: 17px
			text-align: center
			font-size: 13px
			color: #8D8D8D
			background-color: #E7E7E7
			cursor: pointer


	.SEOSetting
		width: 100%
	.SEODisplay
		position: relative
		display: block
		color: #2A8DC8
		width: 113px
		height: 33px
		line-height: 35px
		border-radius: 3px
		cursor: pointer
		border: 1px solid transparent
		padding-left: 15px
		border: 1px solid #D9D9D9
		background: linear-gradient(#FAFBFB, #F4F4F4)
		svg
			margin-top: -2px
			vertical-align: middle
			display: inline-block
			margin-left: 10px
		&:hover
			border: 1px solid #519ECC
			svg
				path
					fill: #519ECC
	.SEOTextList
		position: relative
		border: 1px solid #CCC
		-webkit-border-radius: 3px
		border-radius: 3px
		background-color: #FAFBFB
		padding: 0 20px
		color: #666
		font-size: 15px
		.editBtn
			position: absolute
			display: block
			top: 15px
			right: 15px
			cursor: pointer
		span
			display: inline-block
			vertical-align: middle
	.SEOOptionBox
		-webkit-box-sizing: border-box
		-moz-box-sizing: border-box
		box-sizing: border-box
		width: 100%
		padding: 20px 30px
		border: 1px solid #CCC
		background-color: #F1F1F1
		border-radius: 3px
		h4
			margin: 0
			font-size: 16px
			color: #505A5F
		p
			color: #666
		.row
			margin: 25px 0
			display: flex
			&:first-child
				margin-top: 0
			.rowTitle
				-webkit-box-sizing: border-box
				-moz-box-sizing: border-box
				box-sizing: border-box
				display: inline-flex
				height: 35px
				font-size: 15px
				color: #666
				align-items: center
				vertical-align: top
				width: 90px
			.rowContent
				width: calc(100% - 90px)
				-webkit-box-sizing: border-box
				-moz-box-sizing: border-box
				box-sizing: border-box
				display: inline-flex
				align-items: center
				vertical-align: top
				> input[type=text]
					width: 100%
					height: 33px
					padding: 0 10px
					border: 1px solid #CCCCCC
					border-radius: 3px
	.btnSection
		margin-top: 15px
		text-align: right
		button
			-webkit-box-sizing: border-box
			-moz-box-sizing: border-box
			box-sizing: border-box
			font-size: 15px
			line-height: 15px
			padding: 10px 15px
			border: 0
			outline: none
			border-radius: 3px
			color: #FFF
		.redBtn
			background-color: #FF5253
			box-shadow: 0 3px 0 #DB0506
			&:hover
				background-color: #FF7071
				box-shadow: 0 3px 0 #F14243
			&:active
				transform: translateY(3px)
				box-shadow: 0 0
		.grayBtn
			color: #7D7D7D
			background-color: #EFEFEF
			border: 1px solid #DDD
			box-shadow: 0 3px 0 #DDD
			margin-left: 15px
			&:hover
				background-color: #D8D8D8
				box-shadow: 0 3px 0 #C8C8C8
			&:active
				transform: translateY(3px)
				box-shadow: 0 0
</style>