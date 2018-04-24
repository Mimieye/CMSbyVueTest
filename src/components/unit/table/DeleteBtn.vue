<template>
	<div class="deleteBtn">
		<div class="confirmBox" v-show="openStatus">
			<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 137.818 137.816" enable-background="new 0 0 137.818 137.816" xml:space="preserve"><g><path fill="#f05245" d="M125.432,18.736H89.479v-6.333C89.479,5.553,83.926,0,77.076,0H60.742C53.893,0,48.34,5.553,48.34,12.403v6.333H12.387C5.547,18.736,0,21.873,0,28.714v6.419h137.818v-6.419C137.818,21.873,132.271,18.736,125.432,18.736z M59.387,15.474c0-3.172,2.57-5.742,5.742-5.742h7.561c3.172,0,5.742,2.57,5.742,5.742v3.263H59.387V15.474zM11.674,43.045v82.368c0,6.85,5.918,12.403,13.219,12.403h88.033c7.301,0,13.219-5.554,13.219-12.403V43.045H11.674z M36.104,123.199h-8V57.301h8V123.199z M60.641,123.199h-8V57.301h8V123.199zM85.178,123.199h-8V57.301h8V123.199z M109.715,123.199h-8V57.301h8V123.199z"></path></g></svg>
			<span class="text">資料刪除後將無法回覆</span>
			<button class="redBtn" @click="deleteData">刪除</button>
			<button class="grayBtn" @click="openStatus = false">取消</button>
		</div>
		<span class="icon del" @click="openStatus = true">
			<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="17px" height="17px" viewBox="0 0 137.818 137.816" enable-background="new 0 0 137.818 137.816" xml:space="preserve"><g><path fill="#bdbdbd" d="M125.432,18.736H89.479v-6.333C89.479,5.553,83.926,0,77.076,0H60.742C53.893,0,48.34,5.553,48.34,12.403v6.333H12.387C5.547,18.736,0,21.873,0,28.714v6.419h137.818v-6.419C137.818,21.873,132.271,18.736,125.432,18.736z M59.387,15.474c0-3.172,2.57-5.742,5.742-5.742h7.561c3.172,0,5.742,2.57,5.742,5.742v3.263H59.387V15.474zM11.674,43.045v82.368c0,6.85,5.918,12.403,13.219,12.403h88.033c7.301,0,13.219-5.554,13.219-12.403V43.045H11.674z M36.104,123.199h-8V57.301h8V123.199z M60.641,123.199h-8V57.301h8V123.199zM85.178,123.199h-8V57.301h8V123.199z M109.715,123.199h-8V57.301h8V123.199z"/></g></svg>
		</span>
	</div>
</template>

<script>
	export default {
		name: 'deleteBtn',
		props: ['deletedIndex'],
		data () {
			return {
				openStatus: false
			}
		},
		methods: {
			showConfirmBox: function () {
				this.openStatus = true;
			},
			hideConfirmBox: function () {
				this.openStatus = false;
			},
			deleteData: function () {
				this.$emit('getDeleted', this.deletedIndex);
			}
		}
	}
</script>