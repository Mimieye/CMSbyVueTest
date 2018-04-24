<template>
	<layout-basic>
		<h1 class="pageTitle" slot="pageTitle">新增/編輯文章</h1>
		{{ $route.query.guid }}

		<p>{{ articleData }}</p>
		<div class="editPage">
			<div class="row flex">
				<div class="rowTitle">文章標題</div>
				<div class="rowContent">
					<input type="text" v-model="articleData.title">
				</div>
			</div>
			<RelatedSelect :unitDatas="unitData.list" :selectUnitDatas="unitData.selectcategorylist" @deleteSelect="deleteSelect"></RelatedSelect>
			<div class="row">
				<div class="item">
					<div class="rowTitle">連結位置</div>
					<div class="rowContent">
						<div class="linkSetting">
							<span class="settingText" v-show="linkSettingStatus" @click="linkSettingStatus = false">設定</span>
							<div class="inputSection" v-show="!linkSettingStatus">
								<input type="text" v-model="articleData.url">
								<SelectBox v-model="articleData.urlType" :className="'allGray'" :selectBoxData="optionList"></SelectBox>
								<span class="deleteBtn" @click="linkSettingStatus = true">x</span>
							</div>
						</div>
					</div>
				</div>
				<div class="item">
					<div class="rowTitle">上線時間</div>
					<div class="rowContent">
						<PostTime @getTimeData="settingTime" :startTime="articleData.startTime" :endTime="articleData.endTime"></PostTime>
					</div>
				</div>
			</div>
			<div class="row flex">
				<div class="rowTitle">文章摘要</div>
				<div class="rowContent">
					<textarea v-model='articleData.summary'></textarea>
				</div>
			</div>
			<div class="row flex">
				<div class="rowTitle">文章內容</div>
				<div class="rowContent">
					<!--CK editor-->
					<Ckeditor
						v-model="articleData.contents"
						:config="ckeditorConfig"
						@blur="onBlur($event)"
						@focus="onFocus($event)">
					</Ckeditor>
				</div>
			</div>
			<div class="row">
				<div class="item">
					<div class="rowTitle">狀態</div>
					<div class="rowContent">
						<SwitchBtn v-model="articleData.status"></SwitchBtn>
					</div>
				</div>

				<div class="item">
					<div class="rowTitle">熱門</div>
					<div class="rowContent">
						<SwitchBtn v-model="articleData.popular"></SwitchBtn>
					</div>
				</div>

				<div class="item">
					<div class="rowTitle">排序</div>
					<div class="rowContent">
						<input class="order" type="text" v-model="articleData.sortValue">
					</div>
				</div>

				<div class="item">
					<div class="rowTitle">文章日期</div>
					<DatePicker v-model="articleData.postTime"></DatePicker>
				</div>
			</div>
			<div class="row">
				<TagSetting :tags="tagList" ></TagSetting>
			</div>
			<div class="row">
				<div class="SEOSetting">
					<div class="SEOSelect">
						<div class="SEODisplay" v-show="!openSEOBoxStatus && !articleData.metaTitle && !articleData.metaDescription && !articleData.metaKeyword" @click="openSEOBoxStatus = true;">
							SEO設定
							<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="15px" height="15px" viewBox="0 0 15.51 15.16" style="enable-background:new 0 0 15.51 15.16;" xml:space="preserve">
								<path fill="#B9B9B9" d="M2.026,9.683l3.534,3.441l7.363-7.166L9.389,2.517L2.026,9.683z M15.247,2.432l-2.235-2.176c-0.346-0.337-0.904-0.342-1.246-0.01L9.776,2.184l3.49,3.398l1.991-1.937C15.598,3.312,15.594,2.769,15.247,2.432z M0.768,12.843l1.612,1.569l2.929-0.92l-3.595-3.5L0.768,12.843z M0,15.16l1.815-0.57l-1.229-1.196L0,15.16z"></path>
							</svg>
						</div>

						<div class="SEOTextList"  v-show="!openSEOBoxStatus && (articleData.metaTitle || articleData.metaDescription || articleData.metaKeyword)">
							<span class="editBtn" @click="openSEOBoxStatus = true;">
								<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="15px" height="15px" viewBox="0 0 15.51 15.16" style="enable-background:new 0 0 15.51 15.16;" xml:space="preserve">
									<path fill="#B9B9B9" d="M2.026,9.683l3.534,3.441l7.363-7.166L9.389,2.517L2.026,9.683z M15.247,2.432l-2.235-2.176c-0.346-0.337-0.904-0.342-1.246-0.01L9.776,2.184l3.49,3.398l1.991-1.937C15.598,3.312,15.594,2.769,15.247,2.432z M0.768,12.843l1.612,1.569l2.929-0.92l-3.595-3.5L0.768,12.843z M0,15.16l1.815-0.57l-1.229-1.196L0,15.16z"></path>
								</svg>
							</span>
							<h4>SEO設定</h4>
							<div class="row">
								<span class="title">標題：</span><span class="text">{{ articleData.metaTitle }}</span>
							</div>
							<div class="row">
								<span class="title">描述：</span><span class="text">{{ articleData.metaDescription }}</span>
							</div>
							<div class="row">
								<span class="title">推薦關鍵字：</span>
							</div>
							<div class="row">
								<span class="title">關鍵字：</span><span class="text">{{ articleData.metaKeyword }}</span>
							</div>
						</div>

						<div class="SEOOptionBox" v-show="openSEOBoxStatus">
							<h4>SEO設定</h4>
							<p>新增特定字詞作為關鍵字或你可以使用這篇文章關鍵字詞設定。</p>
							<div class="row">
								<div class="rowTitle">標題</div>
								<div class="rowContent">
									<input type="text" v-model="articleData.metaTitle" placeholder="請填寫">
								</div>
							</div>
							<div class="row">
								<div class="rowTitle">描述</div>
								<div class="rowContent">
									<textarea type="text" v-model="articleData.metaDescription" placeholder="請填寫"></textarea>
								</div>
							</div>
							<div class="row">
								<div class="rowTitle">推薦關鍵字</div>
								<div class="rowContent">
									<input type="text">
								</div>
							</div>
							<div class="row">
								<div class="rowTitle">關鍵字</div>
								<div class="rowContent">
									<textarea type="text" v-model="articleData.metaKeyword" placeholder="請填寫"></textarea>
								</div>
							</div>
							<div class="btnSection">
								<button class="redBtn" @click="openSEOBoxStatus = false;">確定</button>
								<button class="grayBtn" @click="openSEOBoxStatus = false;">取消</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<p>{{ tagList }}</p>
		</div>
	</layout-basic>
</template>

<script>
	import Ckeditor from 'vue-ckeditor2'
	import clickOutside from '@/directive/clickOutside'
	import LayoutBasic from '@/components/layout/Layout'
	import RelatedSelect from '@/components/unit/edit/RelatedSelect'
	import PostTime from '@/components/unit/edit/PostTime'
	import SwitchBtn from '@/components/unit/edit/SwitchBtn'
	import DatePicker from '@/components/unit/DatePicker'
	import TagSetting from '@/components/unit/TagSetting'
	import SelectBox from '@/components/unit/SelectBox'

	import { bus } from '@/main'

	export default {
		name: 'articlePage',
		data () {
			return {
				unitData: {
					selectcategorylist: [],
					list: []
				},
				config: {
					toolbar: [
						[ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript' ]
					],
					height: 300
				},
				openSEOBoxStatus: false,
				tagList: [
					{
						text: '項目1',
						selected: false
					},
					{
						text: '項目2',
						selected: false
					},
					{
						text: '項目3',
						selected: false
					},
					{
						text: '項目4',
						selected: false
					},
					{
						text: '項目5',
						selected: false
					},
				],
				articleData: {
					// // Id: "int",
					// // guid: "",
					// // title: "",
					// contents: "",
					// // summary: "",
					// url: "",
					// urlType: "",
					// // thumb: "",
					// sortValue: "999",
					// // views: "int",
					// postTime: "",
					// startTime: "/Date(1517313600000-0000)/",
					// endTime: "/Date(1522313600000-0000)/",
					// // createTime: "Date",
					// status: 0,
					// popular: 0,
					// metaTitle: "",
					// metaDescription: "",
					// metaKeyword: "",
					// // value01: "",
					// // value02: "",
					// // value03: "",
					// // value04: "",
					// // value05: "",
					// // isDeleted: "int",
					// // isEnabled: "int",
					// // isAudit: "int",
					// // updateTime: "Date",
					// // updateIP: "",
					// // categoryList: "",
					// // t: ""
				},
				linkSettingStatus: true,
				optionList: [
					{
						text: '開啟新視窗',
						val: '_blank'
					},
					{
						text: '本頁切換視窗',
						val: '_self'
					}
				],
				ckeditorConfig: {
					// toolbar: [
					// 	[ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript' ]
					// ],
					height: 300,
				}
			}
		},
		components: {
			LayoutBasic,
			RelatedSelect,
			DatePicker,
			TagSetting,
			SelectBox,
			PostTime,
			SwitchBtn,
			Ckeditor
		},
		directives: {
			clickOutside
		},
		beforeCreate () {
			let guidData = '';
			let that = this;

			if (this.$route.query.guid) {
				guidData = this.$route.query.guid;
			}

			$.ajax({
				method: "GET",
				url: "http://192.168.0.236/FT2017CORE/apiJoinList/Article",
				data: {
					mGuid: guidData,
					joinType: 'Article',
					t: 'unitData'
				}
			}).done(function (msg) {
				var filteredEvents01 = msg.filter(function (event) {
					if (event.display === false) {
						that.$data[event.t].selectcategorylist.push(event);
					}
					if (event.categoryChild !== null) {
						var A = event.categoryChild.filter(function (event01) {
							if (event01.display === false) {
								that.$data[event01.t].selectcategorylist.push(event01);
							}
						});
					}
				});
				that.unitData.list = msg;
			});

			$.ajax({
				method: "GET",
				url: "http://192.168.0.236/FT2017CORE/apiArticle",
				data: {
					guid: guidData,
				}
			}).done(function (msg) {
				that.articleData = msg.result[0];
			});
			// http://localhost:5000/Article?guid=16e0c548-3963-49d5-a6d8-1cd817cbe389
		},
		methods: {
			getIndex: function (data) {
				this.filterList(this.$data[data.t].list, data.guid, 'add');
			},
			deleteSelect: function (data) {
				this.filterList(this.$data[data.t].list, data.guid, 'delete');
			},
			filterList: function (whichList, guid, methodType) {
				var that = this;
				whichList.filter(x => {
					if (x.guid === guid) {
						if (methodType === 'add') {
							x.display = false;
							that.$data[x.t].selectcategorylist.push(x);
						}
						if (methodType === 'delete') {
							x.display = true;
							that.$data[x.t].selectcategorylist.splice(that.$data[x.t].selectcategorylist.findIndex(e => e.guid === guid),1);
						}
					}
					if (x.categoryChild.length > 0) {
						that.filterList(x.categoryChild, guid, methodType);
					}
                });
			},
			settingTime: function (data) {
				this.articleData.startTime = data.post;
				this.articleData.endTime = data.delete;
			},
			settingTag: function (data) {
				console.log(data);
			},
			onBlur (editor) {
				console.log(editor)
			},
			onFocus (editor) {
				console.log(editor)
			}
		},
		mounted () {
			bus.$on('getIndex', this.getIndex);
			console.log(this.$root);
		}
	}
</script>

<style lang="sass" scoped>
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