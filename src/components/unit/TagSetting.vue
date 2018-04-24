<template>
	<div class="tagSetting">
		<div class="tagSelect">
			<div class="tagDisplay" v-show="!openTagStatus && selecteds.length === 0" @click="openTagStatus = true;">
				標籤設定
				<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="15px" height="15px" viewBox="0 0 15.51 15.16" style="enable-background:new 0 0 15.51 15.16;" xml:space="preserve">
					<path fill="#B9B9B9" d="M2.026,9.683l3.534,3.441l7.363-7.166L9.389,2.517L2.026,9.683z M15.247,2.432l-2.235-2.176c-0.346-0.337-0.904-0.342-1.246-0.01L9.776,2.184l3.49,3.398l1.991-1.937C15.598,3.312,15.594,2.769,15.247,2.432z M0.768,12.843l1.612,1.569l2.929-0.92l-3.595-3.5L0.768,12.843z M0,15.16l1.815-0.57l-1.229-1.196L0,15.16z"></path>
				</svg>
			</div>

			<div class="tagTextList" v-show="!openTagStatus && selecteds.length !== 0">
				標籤：{{ finalSetting }}
				<span class="editBtn" @click="openTagStatus = true;">
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="15px" height="15px" viewBox="0 0 15.51 15.16" style="enable-background:new 0 0 15.51 15.16;" xml:space="preserve">
						<path fill="#B9B9B9" d="M2.026,9.683l3.534,3.441l7.363-7.166L9.389,2.517L2.026,9.683z M15.247,2.432l-2.235-2.176c-0.346-0.337-0.904-0.342-1.246-0.01L9.776,2.184l3.49,3.398l1.991-1.937C15.598,3.312,15.594,2.769,15.247,2.432z M0.768,12.843l1.612,1.569l2.929-0.92l-3.595-3.5L0.768,12.843z M0,15.16l1.815-0.57l-1.229-1.196L0,15.16z"></path>
					</svg>
				</span>
			</div>

			<div class="tagOptionBox" v-show="openTagStatus">
				<h4>標籤設定</h4>
				<p>選擇你要的文章標籤或者搜尋相關字詞設定。</p>

				<div class="tagSelectBox">
					<div class="list">
						<div class="title">
							<div class="searchBox">
								<input type="text" class="searchList">
								<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 18 18" enable-background="new 0 0 18 18" xml:space="preserve">
									<path fill="#B9B9B9" d="M17.711,15.614l-4.194-4.195c-0.332-0.333-0.848-0.378-1.229-0.137l-0.988-0.987 c1.984-2.488,1.827-6.142-0.475-8.442c-2.47-2.471-6.5-2.471-8.971,0c-2.47,2.471-2.47,6.501,0,8.973 c2.301,2.301,5.954,2.458,8.44,0.474l0.988,0.988c-0.241,0.383-0.196,0.897,0.137,1.229l4.194,4.195 c0.386,0.385,1.015,0.385,1.399,0l0.698-0.699C18.096,16.628,18.096,15.999,17.711,15.614z M9.733,9.732 c-1.869,1.87-4.918,1.87-6.788,0c-1.87-1.869-1.87-4.918,0-6.788s4.918-1.87,6.788,0C11.603,4.814,11.603,7.863,9.733,9.732z"/>
								</svg>
							</div>
						</div>
						<div class="content">
							<div class="tag" :class="{'selected': tag.selected}" v-for="(tag, index) in tags" @click="selectIt(index)">{{ tag.text }}</div>
						</div>
					</div>
					<div class="selectedList">
						<div class="title">已選取：{{ selecteds.length }}</div>
						<div class="content">
							<div class="selectedItem" v-for="(selected, index) in selecteds">
								<span class="text">{{ selected.text }}</span>
								<span class="deleteBtn" @click="deleteIt(selected)">x</span>
							</div>
						</div>
					</div>
				</div>

				<div class="btnSection">
					<button class="redBtn" @click="sendSetting">確定</button>
					<button class="grayBtn" @click="cancel">取消</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'TagSettimg',
		props: ["tags"],
		data () {
			return {
				openTagStatus: false,
			}
		},
		methods: {
			selectIt: function (data) {
				this.tags[data].selected = true;
			},
			deleteIt: function (data) {
				let that = this;
				that.tags.forEach(function (item, index, array) {
					if (item === data) {
						that.tags[index].selected = false;
					}
				})
			},
			sendSetting: function () {
				this.openTagStatus = false;
			},
			cancel: function () {
				this.tags.map(function (x) {
					x.selected = false;
				});
				this.openTagStatus = false;
			}
		},
		computed: {
			selecteds: function () {
				return this.tags.filter(i => i.selected === true);
			},
			finalSetting: function () {
				return this.selecteds.map(i => i.text).join(', ');
			}
		}
	}
</script>
<style lang="sass" scoped>
	@import "../../assets/_extend.sass"

	.tagSetting
		width: 100%
	.tagDisplay
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

	.tagTextList
		position: relative
		border: 1px solid #CCC
		-webkit-border-radius: 3px
		border-radius: 3px
		background-color: #FAFBFB
		padding: 20px
		color: #666
		font-size: 15px
		.editBtn
			position: absolute
			display: block
			top: 15px
			right: 15px
			cursor: pointer


	.tagOptionBox
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

	.tagSelectBox
		@extend %clearfix
		.list, .selectedList
			-webkit-box-sizing: border-box
			-moz-box-sizing: border-box
			box-sizing: border-box
			float: left
			width: 50%
			border: 1px solid #CCC
		.title
			-webkit-box-sizing: border-box
			-moz-box-sizing: border-box
			box-sizing: border-box
			background-color: #F7F7F7
			border-bottom: 1px solid #CCC
		.content
			height: 200px
			overflow: auto
		.list
			.title
				padding: 20px
			.content
				background-color: #FFF
		.selectedList
			border-left: 0
			.title
				padding: 25px 20px 24px
			.content
				background-color: #BABABA
		.tag
			font-size: 15px
			color: #666
			cursor: pointer
			padding: 5px 20px
			&.selected
				color: #CCC
				cursor: default
				background-color: transparent
				&:hover
					color: #CCC
					background-color: transparent
			&:hover
				color: #FFF
				background-color: #519ECC
		.selectedItem
			position: relative
			padding: 15px 10px
			background-color: #FFF
			border-bottom: 1px solid #CCC
			font-size: 15px
			color: #666
			.deleteBtn
				position: absolute
				right: 10px
				margin-left: 5px
				-webkit-border-radius: 50%
				border-radius: 50%
				display: inline-block
				width: 17px
				height: 17px
				text-align: center
				font-size: 13px
				color: #666
				cursor: pointer
				background-color: #DDD
				&:hover
					background-color: #B0B0B0
					color: #FFF
		.searchBox
			position: relative
			svg
				position: absolute
				display: block
				top: 50%
				margin-top: -9px
				right: 10px
		.searchList
			-webkit-box-sizing: border-box
			-moz-box-sizing: border-box
			box-sizing: border-box
			padding: 0 10px
			display: block
			width: 100%
			height: 30px
			font-size: 15px
			border: 1px solid #CECECE
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