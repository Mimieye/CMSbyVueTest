<template>
	<div class="login">
		<input type="text" name="userName" v-model="userName">
		<input type="password" name="password" v-model="password">
		<button @click="login">login</button>
		<!-- <p>{{ userID }}</p> -->
	</div>
</template>

<script>
	import { mapActions } from 'vuex'

	export default {
		name: 'login',
		data () {
			return {
				userName: '',
				password: ''
			}
		},
		methods: {
			...mapActions([
				'islogin',
			]),
			login: function () {
				let that = this;
				$.ajax({
					method: "POST",
					url: "http://192.168.0.236/FT2017CORE/auth/credentials",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					data: { userName : this.userName , password : this.password, remeberme: true}
				}).done(function (msg) {
					localStorage.sessionId = msg.sessionId;
					localStorage.setItem("token", that.userName);
					that.islogin(msg);

					if (!that.getLocationSearch()) {
						that.$router.push("ArticleList");
					} else {
						that.$router.push(that.getLocationSearch().split("%2F")[1]);
					}
				});
			},
			getLocationSearch: function () {
				let searchURL = window.location.search;
				searchURL = searchURL.substring(1, searchURL.length);
				let targetPageId = searchURL.split("&")[0].split("=")[1];
				return targetPageId;
			},
			beforeCreate () {
				let that = this;
				$.ajax({
					method: "POST",
					url: "http://192.168.0.236/FT2017CORE/auth",
					data: {},
				}).done(function (msg) {
					that.islogin(msg);
					if (!that.getLocationSearch()) {
						that.$router.push("ArticleList");
					} else {
						that.$router.push(that.getLocationSearch().split("%2F")[1]);
					}
				});
			}
		}
	}
</script>