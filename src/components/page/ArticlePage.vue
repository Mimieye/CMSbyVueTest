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
	import Ckeditor from '@/components/global/Ckeditor'
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
			// settingTag: function (data) {
			// 	console.log(data);
			// },
			onBlur (editor) {
				// console.log(editor)
			},
			onFocus (editor) {
				// console.log(editor)
			}
		},
		mounted () {
			bus.$on('getIndex', this.getIndex);
		}
	}
</script>