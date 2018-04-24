<template>
	<div class="datePicker" v-clickOutside="clickOutside">
		<div class="inputSection">
			<input type="text" @focus="focus" ref="input" v-model="time" @keyup.enter="blur(); clickOutside();" @blur="blur">
			<svg @click="focusInput" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="17px" viewBox="0 0 36 34" enable-background="new 0 0 36 34" xml:space="preserve">
				<path fill="#B9B9B9" d="M8,8c1.104,0,2-0.896,2-2V2c0-1.104-0.896-2-2-2S6,0.896,6,2v4C6,7.104,6.896,8,8,8zM28,8c1.104,0,2-0.896,2-2V2c0-1.104-0.896-2-2-2s-2,0.896-2,2v4C26,7.104,26.896,8,28,8zM34,2h-2v4c0,2.206-1.794,4-4,4s-4-1.794-4-4V2H12v4c0,2.206-1.794,4-4,4S4,8.206,4,6V2H2C0.896,2,0,2.896,0,4v28c0,1.104,0.896,2,2,2h32c1.104,0,2-0.896,2-2V4C36,2.896,35.104,2,34,2z M34,30c0,1.104-0.896,2-2,2H4c-1.104,0-2-0.896-2-2V14c0-1.104,0.896-2,2-2h28c1.104,0,2,0.896,2,2V30z"></path>
				<rect x="4" y="14" fill="#B9B9B9" width="4" height="4"></rect>
				<rect x="10" y="14" fill="#B9B9B9" width="4" height="4"></rect>
				<rect x="16" y="14" fill="#B9B9B9" width="4" height="4"></rect>
				<rect x="22" y="14" fill="#B9B9B9" width="4" height="4"></rect>
				<rect x="22" y="20" fill="#B9B9B9" width="4" height="4"></rect>
				<rect x="28" y="14" fill="#B9B9B9" width="4" height="4"></rect>
				<rect x="4" y="20" fill="#B9B9B9" width="4" height="4"></rect>
				<rect x="10" y="20" fill="#B9B9B9" width="4" height="4"></rect>
				<rect x="16" y="20" fill="#B9B9B9" width="4" height="4"></rect>
				<rect x="28" y="20" fill="#B9B9B9" width="4" height="4"></rect>
				<rect x="4" y="26" fill="#B9B9B9" width="4" height="4"></rect>
				<rect x="10" y="26" fill="#B9B9B9" width="4" height="4"></rect>
				<rect x="16" y="26" fill="#B9B9B9" width="4" height="4"></rect>
				<rect x="22" y="26" fill="#B9B9B9" width="4" height="4"></rect>
				<rect x="28" y="26" fill="#B9B9B9" width="4" height="4"></rect>
			</svg>
		</div>
		<div class="calendarSection" v-if="picking">
			<div class="calendarHead">
				<div class="selectSection">
					<select name="year" v-model="nowYear" @change="onChange">
						<option v-for="(year, index) in years" :value="year">{{ year }}</option>
					</select>
					<select name="month" v-model="nowMonth" @change="onChange">
						<option v-for="(month, index) in months" :value="index">{{ month }}</option>
					</select>
				</div>
				<div class="week">
					<span class="text" v-for="day in days">{{ day }}</span>
				</div>
			</div>
			<div class="date">
				<span class="text" v-for="(date, index) in dates" :class="{
					'selected': nowYear === selectDay.year && nowMonth === selectDay.month && date === selectDay.day,
					'hasVal': date !== ''
				}" @mousedown.prevent="selectTime(date); clickOutside()">{{ date }}</span>
			</div>
		</div>
	</div>
</template>

<script>
	import clickOutside from '@/directive/clickOutside'

	export default {
		name: 'datePicker',
		props: ["value"],
		data () {
			return {
				picking: false,
				years: [],
				days: ["日", "一", "二", "三", "四", "五", "六"],
				months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
				dates: [],
				nowYear: null,
				nowMonth: null,
				time: '',
				selectDay: {
					year: null,
					month: null,
					day: null
				}
			}
		},
		directives: {
			clickOutside
		},
		methods: {
			focus: function () {
				this.picking = true;
			},
			clickOutside: function () {
				this.picking = false;
			},
			blur: function () {
				this.$refs.input.blur();
				if (this.time !== '' && this.dateValidationCheck(this.time) && this.years.indexOf(this.returnYMD(this.time)[0]) > 0) {
					let correctD = this.returnYMD(this.time);
					this.nowYear = correctD[0];
					this.nowMonth = correctD[1] - 1;
					this.selectTime(correctD[2]);
					this.createCalendar(this.nowYear, this.nowMonth + 1);
					this.$emit('input', this.time);
				} else {
					let resetD = new Date();
					this.nowYear = resetD.getFullYear();
					this.nowMonth = resetD.getMonth();
					this.createCalendar(this.nowYear, this.nowMonth + 1);
					this.selectDay.year = null;
					this.selectDay.month = null;
					this.selectDay.day = null;
				}
			},
			focusInput: function () {
				this.$refs.input.focus();
			},
			onChange: function () {
				this.createCalendar(this.nowYear, this.nowMonth + 1);
			},
			selectTime: function (day) {
				this.selectDay.year = this.nowYear;
				this.selectDay.month = this.nowMonth;
				this.selectDay.day = day;
				this.time = this.combineYMD(this.nowYear, this.nowMonth + 1, this.selectDay.day);
				this.$refs.input.blur();
				this.$emit('input', this.time);
			},

			combineYMD: function (Y, M, D) {
				return Y + '/' +  ((M < 10) ? '0' + M : M) + '/' + ((D < 10) ? '0' + D : D);
			},
			returnYMD: function (array) {
				return array.split("/").map(Number);
			},
			getMonthDays: function (year, month) {
				let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
				let days = monthDays[month - 1];

				if (month === 2) {
					if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
					days = 29;
					}
				}
				return days;
			},
			getFirstDay: function (year, month, day) {
				let d = new Date();
				d.setFullYear(year, month - 1, day);
				return d.getDay();
			},
			createCalendar: function (year, month) {
				let monthDays = this.getMonthDays(year, month);
				let firstDay = this.getFirstDay(year, month, 1)

				this.dates = [];
				for (let i = 0; i < firstDay + monthDays; i ++) {
					if (i < firstDay) {
						this.dates.push("");
					} else {
						this.dates.push(i - firstDay + 1);
					}
				}
			},
			dateValidationCheck: function(str) {
				var re = new RegExp("^([0-9]{4})[./]{1}([0-9]{1,2})[./]{1}([0-9]{1,2})$");
				var strDataValue;
				var infoValidation = true;
				if ((strDataValue = re.exec(str)) != null) {
					var i;
					i = parseFloat(strDataValue[1]);
					if (i <= 0 || i > 9999) { /*年*/
						infoValidation = false;
					}
					i = parseFloat(strDataValue[2]);
					if (i <= 0 || i > 12) { /*月*/
						infoValidation = false;
					}
					i = parseFloat(strDataValue[3]);
					if (i <= 0 || i > 31) { /*日*/
					  infoValidation = false;
				}
				} else {
					infoValidation = false;
				}
				return infoValidation;
			}
		},
		watch: {
			value: function (data) {
				if (data === '') {
					this.time = ''
					this.blur();
				}
			}
		},
		mounted () {
			let d = new Date();
			for (let i = 0; i < 10; i++) {
				this.years.push((d.getFullYear() - 5) + i);
			}

			if (this.value) {
				this.time = this.value;
				this.blur();
			} else {
				this.nowYear = d.getFullYear();
				this.nowMonth = d.getMonth();
				this.createCalendar(this.nowYear, this.nowMonth + 1);

			}
		}
	}
</script>