<template>
	<div class="postTime" v-clickOutside="closeIt">
		<div class="notSetting" v-show="!openSettingBox">
			<span class="fakeRadio"></span>
			<span class="text">不設定</span>
			<span class="customRange" @click="openBox(); openSelect();">自訂範圍</span>

			{{startTime}}
		</div>
		<div class="setting" v-show="openSettingBox">
			<div class="settingSelect" :class="{ 'open': openSettingStatus }">
				<div class="settingDisplay" @click="openSelect" :class="{ 'setted': finalTime.post }">上線時間 <span v-if="finalTime.post" class="finalTime">{{finalTime.post}}</span><span v-if="finalTime.delete" class="finalTime"> ~ {{finalTime.delete}}</span></div>
				<div class="settingOptionBox" v-show="openSettingStatus">
					<div class="postTimeRow">
						<span class="text">上線時間</span>
						<DatePicker v-model="postDate"></DatePicker>
						<SelectBox v-model="postTime" :className="'time'" :selectBoxData="timeOptionList"></SelectBox>

						<span class="settingDelete" v-show="!openDeleteSetting" @click="openDeleteSetting = true;">設定下線時間</span>
					</div>
					<div class="deleteTimeRow" v-show="openDeleteSetting">
						<span class="text">下線時間</span>
						<DatePicker v-model="deleteDate"></DatePicker>
						<SelectBox v-model="deleteTime" :className="'time'" :selectBoxData="timeOptionList"></SelectBox>
					</div>
					<div class="btnSection">
						<button class="redBtn" @click="confirmSetting">確定</button>
						<button class="grayBtn" @click="cancelSetting">取消</button>
					</div>
					<p>{{postDate}} {{postTime}}</p>
					<p>{{deleteDate}} {{deleteTime}}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import clickOutside from '@/directive/clickOutside'
	import DatePicker from '@/components/unit/DatePicker'
	import SelectBox from '@/components/unit/SelectBox'

	export default {
		name: 'postTime',
		props: ['startTime', 'endTime'],
		data () {
			return {
				openSettingBox: false,
				openSettingStatus: false,
				openDeleteSetting: false,
				finalTime: {
					post: '',
					delete: ''
				},
				postDate: '',
				postTime: '',
				deleteDate: '',
				deleteTime: '',
				timeOptionList: [
					{
						text: '08:00',
						val: '08:00'
					},
					{
						text: '10:00',
						val: '10:00'
					},
					{
						text: '12:00',
						val: '12:00'
					},
					{
						text: '14:00',
						val: '14:00'
					},
					{
						text: '16:00',
						val: '16:00'
					},
					{
						text: '18:00',
						val: '18:00'
					},
					{
						text: '20:00',
						val: '20:00'
					},
					{
						text: '22:00',
						val: '22:00'
					}
				]
			}
		},
		methods: {
			openBox: function () {
				this.openSettingBox = true;
			},
			closeBox: function () {
				this.openSettingBox = false;
			},
			openSelect: function () {
				this.openSettingStatus = !this.openSettingStatus;
			},
			closeIt: function () {
				this.openSettingStatus = false;
			},
			confirmSetting: function () {
				if (this.postDate) {
					this.finalTime.post = this.postDate + " " + this.postTime;
				}
				if (this.deleteDate) {
					this.finalTime.delete = this.deleteDate + " " + this.deleteTime;
				}
				this.openSettingStatus = false;
				this.$emit('getTimeData', this.finalTime);
			},
			cancelSetting: function () {
				this.openDeleteSetting = false;
				this.openSettingStatus = false;
				this.openSettingBox = false;
				this.postDate = '';
				this.postTime = '';
				this.deleteDate = '';
				this.deleteTime = '';
				this.finalTime.post = '';
				this.finalTime.delete = '';
				this.$emit('getTimeData', this.finalTime);
			},
		},
		directives: {
			clickOutside,
		},
		components: {
			DatePicker,
			SelectBox,
		},
		watch: {
			startTime: function (data) {
				if (this.startTime) {
					let startTime = this.$options.filters.formatDate02(this.startTime).split(" ");

					this.postDate = startTime[0];
					this.postTime = startTime[1];

					this.finalTime.post = this.postDate + " " + this.postTime;
					this.openSettingBox = true;
					this.openSettingStatus = false;
				}
			},
			endTime: function (data) {
				if (this.endTime) {
					let endTime = this.$options.filters.formatDate02(this.endTime).split(" ");

					this.deleteDate = endTime[0];
					this.deleteTime = endTime[1];

					this.finalTime.delete = this.deleteDate + " " + this.deleteTime;
					this.openDeleteSetting = true;
				}
			}
		}
	}
</script>

<style lang="sass" scoped>
	.notSetting
		height: 35px
		line-height: 35px
		span
			vertical-align: middle
			display: inline-block
			font-size: 15px
			color: #519ECC
		.fakeRadio
			box-shadow: 0 0 0 1px #CECECE
			border: 2px solid #FFF
			background: #519ECC
			border-radius: 100%
			display: inline-block
			padding: 2px
			width: 6px
			height: 6px
			cursor: pointer
			margin-right: 5px
			margin-top: 0
		.customRange
			cursor: pointer
			margin-left: 25px
			text-decoration: underline
	.setting
		min-width: 250px
	.settingSelect
		.settingDisplay
			position: relative
			display: block
			color: #2A8DC8
			line-height: 33px
			border-radius: 3px
			cursor: pointer
			border: 1px solid transparent
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
			&.setted
				background: #FFF
		&.open
			.settingDisplay
				border: 1px solid #2A8DC8
				&::after
					border-style: solid
					border-width: 0 5px 5px 5px
					border-color: transparent transparent #2a8dc8 transparent
		.settingOptionBox
			position: relative
			z-index: 2
			-webkit-box-sizing: border-box
			-moz-box-sizing: border-box
			box-sizing: border-box
			position: absolute
			padding: 15px
			width: 480px
			border: 1px solid #D9D9D9
			background-color: #FFF
			.datePicker
				margin: 0 10px
			.deleteTimeRow
				margin: 15px 0
			.text
				font-size: 15px
				color: #666
			.settingDelete
				margin-top: 8px
				float: right
				font-size: 15px
				color: #2A8DC8
				text-decoration: underline
				cursor: pointer
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