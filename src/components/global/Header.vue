<template>
	<header :style="{
		left: headerPositionX + 'px'
	}">
		<div class="hamburger" :class="{'open' : status}" @click="changeStatus">
			<span class="icon"></span>
			<span class="text">控制台選單</span>
		</div>
		<div class="btn home">
			<a href=""><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24">
				<path fill="#FFFFFF" d="M12,5.389c6.324,0,11.469,5.145,11.469,11.468v0.75h-4.375v-1.5h2.848c-0.169-2.252-1.089-4.298-2.51-5.887 l-1.936,2.058l-1.092-1.028l1.949-2.068C16.808,7.9,14.869,7.075,12.75,6.917V9.5H12h-0.75V6.917C9.13,7.075,7.192,7.9,5.647,9.182 l1.948,2.068l-1.092,1.028l-1.935-2.058c-1.421,1.589-2.341,3.635-2.509,5.887h2.847v1.5H0.531v-0.75 C0.531,10.534,5.676,5.389,12,5.389z"/>
				<path fill="#FFFFFF" d="M17.355,13.572c0.481,0.807-3.097,3.828-3.92,4.318s-1.88,0.232-2.362-0.576 c-0.482-0.807-0.206-1.859,0.618-2.351C12.514,14.474,16.874,12.764,17.355,13.572z"/>
			</svg>控制台首頁</a>
		</div>
		<div class="btn view"><a href=""><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24">
			<polygon fill="#FFFFFF" points="13.979,12.566 13.979,18.607 19.021,18.607 19.021,10.58 21.961,10.58 12,1.111 2.039,10.58 4.979,10.58 4.979,18.607 10.021,18.607 10.021,12.566 "/></svg>檢視前台</a>
		</div>
		<div class="accountWrap">
			<!-- <p class="mail">{{ userID.email }}</p> -->
			<p class="mail">aa@sobo.com.tw</p>
			<div class="userInfo">
				<p class="name">使用者名稱：<span>{{ userID.userName }}</span></p>
				<button class="logout" @click="logout">登出</button>
				<a class="editAccount" href="">變更帳號資料</a>
			</div>
		</div>
	</header>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'

	export default {
		name: 'HeaderPart',
		props: ['status'],
		data () {
			return {
				headerPositionX: 0,
			}
		},
		methods: {
			changeStatus: function () {
				this.$emit('changeStatus', !this.status);
			},
			handleScroll: function (event) {
				this.headerPositionX = $(window).scrollLeft() * -1
			},
			logout: function () {
				var that = this;
				localStorage.removeItem("token");
				$.ajax({
					method: "POST",
					url: "http://192.168.0.236/FT2017CORE/auth/logout"
				}).done(function (msg) {
					that.$router.push("Login");
				});
			}
		},
		computed: {
			...mapGetters({
				userID: 'getUserId'
			})
		},
		created: function () {
			window.addEventListener('scroll', this.handleScroll);
		},
		destroyed: function () {
			window.removeEventListener('scroll', this.handleScroll);
		}
	}
</script>