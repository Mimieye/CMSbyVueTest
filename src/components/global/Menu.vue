<template>
	<div class="menu" :class="{'show' : status}">
		<ul class="lvOne">
			<li v-on:mouseenter="showLvTwo(indexOne)" v-on:mouseleave="hideLvTwo(indexOne)" v-for="(lvOneItem, indexOne) in navList" class="lvOne-list" v-if="lvOneItem.lvTwo">
				<p class="listText">{{ lvOneItem.lvOneName }}</p>
				<ul v-show="lvOneItem.display" class="lvTwo">
					<h3>{{ lvOneItem.lvOneName }}</h3>
					<router-link v-if="lvOneItem.btn" class="add" :to="'/'">
						<span class="plus"></span> 新增{{lvOneItem.btn.name}}
					</router-link>
					<li v-for="(lvTwoItem, indexTwo) in lvOneItem.lvTwo"><router-link :to="lvTwoItem.href">{{ lvTwoItem.name }}</router-link></li>
				</ul>
			</li>
			<li class="lvOne-list" v-else>
				<router-link class="listLink" :to="lvOneItem.href">{{ lvOneItem.lvOneName }}</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'MenuPart',
		props: ['status'],
		data () {
			return {
				navList: [
					{
						lvOneName: "基金管理",
						display: false,
						lvTwo: [
							{
								name: "基金總覽",
								href: "/Fund"
							},
							{
								name: "基金系列",
								href: "/"
							},
							{
								name: "基金群組",
								href: "/"
							},
							{
								name: "基金經理人",
								href: "/"
							},
							{
								name: "銷售買回機構",
								href: "/"
							},
							{
								name: "基金資料匯入",
								href: "/"
							}
						]
					},
					{
						lvOneName: "文章管理",
						display: false,
						btn: {
							name: '文章',
							href: '/'
						},
						lvTwo: [
							{
								name: "文章單元管理",
								href: "/Article"
							},
							{
								name: "%?單元名稱",
								href: "/Article/2423"
							}
						]
					},
					{
						lvOneName: "廣告管理",
						display: false,
						btn: {
							name: '廣告',
							href: '/'
						},
						lvTwo: [
							{
								name: "廣告版位管理",
								href: "/"
							},
							{
								name: "廣告列表",
								href: "/"
							}
						]
					},
					{
						lvOneName: "關鍵字管理",
						display: false,
						lvTwo: [
							{
								name: "關鍵字維護",
								href: "/"
							},
							{
								name: "熱門關鍵字",
								href: "/"
							},
							{
								name: "關鍵字報表",
								href: "/"
							}
						]
					},
					{
						lvOneName: "客服管理",
						href: "/",
					},
					{
						lvOneName: "活動管理",
						display: false,
						btn: {
							name: '活動',
							href: '/'
						},
						lvTwo: [
							{
								name: "活動場次管理",
								href: "/"
							}
						]
					},
					{
						lvOneName: "行事曆管理",
						display: false,
						btn: {
							name: '事件',
							href: '/'
						},
						lvTwo: [
							{
								name: "行事曆類別",
								href: "/"
							},
							{
								name: "行事曆事件",
								href: "/"
							}
						]
					},
					{
						lvOneName: "文件下載",
						href: "/",
					},
					{
						lvOneName: "電子報別管理",
						href: "/",
					},
					{
						lvOneName: "警語管理",
						href: "/",
					},
					{
						lvOneName: "單元管理",
						display: false,
						lvTwo: [
							{
								name: "單元管理",
								href: "/"
							},
							{
								name: "側邊功能管理",
								href: "/"
							}
						]
					},
					{
						lvOneName: "帳號管理",
						display: false,
						btn: {
							name: '使用者',
							href: '/'
						},
						lvTwo: [
							{
								name: "部門管理",
								href: "/"
							},
							{
								name: "使用者管理",
								href: "/"
							},
							{
								name: "權限設定",
								href: "/"
							}
						]
					},
					{
						lvOneName: "類別管理",
						display: false,
						lvTwo: [
							{
								name: "活動場次類別",
								href: "/"
							},
							{
								name: "基金管理類別",
								href: "/"
							},
							{
								name: "客服管理類別",
								href: "/"
							},
							{
								name: "文件下載類別",
								href: "/"
							},
							{
								name: "銷售買回機構類別",
								href: "/"
							}
						]
					},
					{
						lvOneName: "推播管理",
						display: false,
						btn: {
							name: '推播',
							href: '/'
						},
						lvTwo: [
							{
								name: "推播發送管理",
								href: "/"
							},
							{
								name: "推播發送紀錄",
								href: "/"
							},
							{
								name: "推播群組管理",
								href: "/"
							},
							{
								name: "推播使用者清單",
								href: "/"
							}
						]
					},
					{
						lvOneName: "系統設定",
						href: "/",
					},
				]
			}
		},
		methods: {
			showLvTwo: function (index) {
				this.navList[index].display = true;
			},
			hideLvTwo: function (index) {
				this.navList[index].display = false;
			},
		}
	}
</script>