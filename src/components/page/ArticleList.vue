<template>
	<layout-basic>
		<h1 class="pageTitle" slot="pageTitle">文章列表</h1>
		<SearchBtn slot="searchBtn" @openSearchBar="openIt"></SearchBtn>

		<div class="searchBar" :class="{'open': searchBarStatus}" slot="searchBar">
			<input class="keyWords" type="text" placeholder="請輸入搜尋關鍵字" v-model.lazy="selectDataTotal.keyWord">
			<span class="close" @click="openIt"></span>
			<div class="filter">
				<div class="item date">
					<span class="itemTitle">日期範圍</span>
					<DatePicker v-model="selectDataTotal.startTime"></DatePicker>
					<span class="periodText"> ~ </span>
					<DatePicker v-model="selectDataTotal.endTime"></DatePicker>
				</div>
				<div class="item review">
					<span class="itemTitle">審核</span>
					<SelectBox v-model="selectDataTotal.isAudit" :className="'displayGray'" :selectBoxData="optionList"></SelectBox>
				</div>
				<div class="item status">
					<span class="itemTitle">狀態</span>
					<SelectBox v-model="selectDataTotal.status" :className="'displayGray'" :selectBoxData="optionList2"></SelectBox>
				</div>
				<div class="item popular">
					<span class="itemTitle">熱門</span>
					<input id="popular" type="checkbox" v-model="selectDataTotal.popular">
					<label for="popular"></label>
				</div>

				<button class="sendSearch" @click="search">搜尋</button>
			</div>
		</div>

		<router-link :to="'/Article'" class="addBtn">+ 新增文章</router-link>


		<div class="list">
			<div class="table">
				<table>
					<thead>
						<tr>
							<th>文章日期</th>
							<th>文章名稱</th>
							<th>上線時間</th>
							<th>所屬單元</th>
							<th>熱門</th>
							<th>審核</th>
							<th>狀態</th>
							<th>排序</th>
							<th>刪除</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="listData in articleListData">
							<td>{{ listData.postTime | formatDate01 }}</td>
							<td><router-link class="listLink" :to="'/Article?guid=' + listData.guid">{{ listData.title }}</router-link></td>
							<td>
								<PostTime :startTime="listData.startTime" :endTime="listData.endTime"></PostTime>
							</td>
							<td>
								<UnitRelated :unitList="listData.categoryList"></UnitRelated>
							</td>
							<td>
								<span class="icon star" :class="{'selected': listData.popular === 1}">
									<svg version="1.1" id="table_1_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="17px" viewBox="0 0 18 17" style="enable-background:new 0 0 18 17;" xml:space="preserve"><path fill="#b9b9b9" d="M13.8,10.946L14.562,17L9,14.409L3.438,17L4.2,10.946L0,6.493l6.033-1.151L9,0l2.966,5.342L18,6.493L13.8,10.946z"/></svg>
								</span>
							</td>
							<td>{{ (listData.isAudit === 1) ? '審核' : '未審核'}}</td>
							<td>
								<SelectBox @statusChange="statusChange" :statusIndex="listData.id" :selectBoxData="statusText" v-model="listData.isEnabled"></SelectBox>
								<!--
									ajax send  isEnabled === 1 & guid,  method: PUT, sned to: /apiArticle/part

									data : {
										op: 'isEnabled',
										article: listData
									}
								-->
							</td>
							<td>
								<input class="order" v-model="listData.sortValue" @change="sortChange(listData.id)">
								<!--
									ajax send  sortValue === 1 & guid,  method: PUT, sned to: /apiArticle/part

									data : {
										op: 'sortValue',
										article: listData
									}
								-->
							</td>
							<td>
								<DeleteBtn @getDeleted="deleteData" :deletedIndex="listData.id"></DeleteBtn>
								<!--
									ajax send  isDeleted === 1 & guid,  method: PUT, sned to: /apiArticle/part

									data : {
										op: 'isDeleted',
										article: listData
									}
								-->
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<p>{{ selectDataTotal }}</p>
		<p>{{ articleListData }}</p>

	</layout-basic>
</template>

<script>
	import LayoutBasic from '@/components/layout/Layout'
	import SearchBtn from '@/components/unit/SearchBtn'
	import SelectBox from '@/components/unit/SelectBox'
	import DatePicker from '@/components/unit/DatePicker'
	import PostTime from '@/components/unit/table/PostTime'
	import UnitRelated from '@/components/unit/table/UnitRelated'
	import DeleteBtn from '@/components/unit/table/DeleteBtn'

	export default {
		name: 'articleList',
		data () {
			return {
				searchBarStatus: false,
				statusText: [
					{
						text: '開啟',
						val: 1
					},
					{
						text: '關閉',
						val: 0
					}
				],
				optionList: [
					{
						text: '全部',
						val: null
					},
					{
						text: '已審核',
						val: 1
					},
					{
						text: '未審核',
						val: 0
					}
				],
				optionList2: [
					{
						text: '開啟',
						val: 1
					},
					{
						text: '關閉',
						val: 0
					},
					{
						text: '全部',
						val: null
					}
				],
				selectDataTotal: {
					keyWord: '',
					startTime: '',
					endTime: '',
					isAudit: null,
					status: null,
					popular: false
				},
				articleListData: "",
			}
		},
		components: {
			LayoutBasic,
			SearchBtn,
			SelectBox,
			DatePicker,
			PostTime,
			UnitRelated,
			DeleteBtn
		},
		methods: {
			openIt: function () {
				this.searchBarStatus = !this.searchBarStatus;
			},
			search: function () {
				console.log(this.selectDataTotal);
			},

			deleteData: function (data) {
				let whichData = this.articleListData.filter(i => i.id === data);
				this.sendData("isDeleted", whichData[0]);
			},
			statusChange: function (data) {
				let whichData = this.articleListData.filter(i => i.id === data[1]);
				this.sendData("isEnabled", whichData[0]);
			},
			sortChange: function (data) {
				let whichData = this.articleListData.filter(i => i.id === data)
				this.sendData("sortValue", whichData[0]);
			},

			sendData: function (op, data) {
				let that = this;
				$.ajax({
					method: "PUT",
					url: "http://192.168.0.236/FT2017CORE/apiArticle/part",
					data: JSON.stringify({ article: data, op: op })
				}).done(function (msg) {
					console.log(msg);
				});
			}
		},
		beforeMount () {
			let that = this;
			$.ajax({
				method: "GET",
				url: "http://192.168.0.236/FT2017CORE/apiArticle/Search",
				data: {}
			}).done(function (msg) {
				that.articleListData = msg.result;
			});
		}
	}
</script>

<style lang="sass" scoped>
	.filter
		width: 94%
		padding: 20px 0 0
		.item
			vertical-align: middle
			display: inline-block
			&:first-child
				.itemTitle
					margin-left: 0
		.itemTitle, .periodText
			color: #666
			margin: 0 15px
		.sendSearch
			float: right
			border: 0
			-webkit-border-radius: 3px
			border-radius: 3px
			padding: 7px 15px 8px
			outline: none
			color: #FFF
			background-color: #519ECC
			box-shadow: 0 3px 0 #4385AC
			font-size: 15px
			&:active
				transform: translateY(3px)
				box-shadow: 0 0
	#popular
		display: none
		+ label
			margin-top: 2px
			vertical-align: top
			display: inline-block
			width: 16px
			height: 16px
			&::before
				position: relative
				display: block
				content: ""
				font-size: 14px
				line-height: 16px
				background: #FFF
				border: 1px solid #BDBDBD
				border-radius: 2px
				width: 16px
				height: 16px
				vertical-align: text-top
				text-align: center
				cursor: pointer
		&:checked
			+ label
				&::before
					content: "\2714"
					color: #FFF
					background: #519ECC
					border: 1px solid #519ECC
	.list
		table
			th
				&:nth-child(1)
					-webkit-flex-grow: 2
					flex-grow: 2
					min-width: 65px
				&:nth-child(2)
					-webkit-flex-grow: 6
					flex-grow: 6
					max-width: 300px
				&:nth-child(3)
					-webkit-flex-grow: 2
					flex-grow: 2
					min-width: 64px
				&:nth-child(4)
					-webkit-flex-grow: 2
					flex-grow: 2
					min-width: 68px
				&:nth-child(5)
					-webkit-flex-grow: 0.5
					flex-grow: 0.5
					min-width: 33px
				&:nth-child(6)
					-webkit-flex-grow: 1
					flex-grow: 1
					min-width: 54px
				&:nth-child(7)
					-webkit-flex-grow: 1
					flex-grow: 1
					width: 80px
				&:nth-child(8)
					-webkit-flex-grow: 1
					flex-grow: 1
				&:nth-child(9)
					-webkit-flex-grow: 0.5
					flex-grow: 0.5
					min-width: 35px
					width: 80px
			td
				&:nth-child(1)
					-webkit-flex-grow: 2
					flex-grow: 2
					min-width: 65px
				&:nth-child(2)
					text-align: left
					-webkit-flex-grow: 6
					flex-grow: 6
					max-width: 300px
				&:nth-child(3)
					-webkit-flex-grow: 2
					flex-grow: 2
					min-width: 64px
				&:nth-child(4)
					-webkit-flex-grow: 2
					flex-grow: 2
					min-width: 68px
				&:nth-child(5)
					-webkit-flex-grow: 0.5
					flex-grow: 0.5
					min-width: 33px
				&:nth-child(6)
					-webkit-flex-grow: 1
					flex-grow: 1
					min-width: 54px
				&:nth-child(7)
					-webkit-flex-grow: 1
					flex-grow: 1
					width: 80px
				&:nth-child(8)
					-webkit-flex-grow: 1
					flex-grow: 1
				&:nth-child(9)
					-webkit-flex-grow: 0.5
					flex-grow: 0.5
					min-width: 35px
					width: 80px

</style>