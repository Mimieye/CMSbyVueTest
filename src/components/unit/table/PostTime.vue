<template>
	<div class="postTimeIcon">
		<p class="annotation" v-show="openStatus">{{ startTime | formatDate02 }} ~ {{ endTime | formatDate02 }}</p>
		<!-- 有可能沒有下線時間-->


		<span class="icon hoverIcon" @mouseenter="showAnnotation" @mouseleave="hideAnnotation">
			<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="17px" height="17px" viewBox="0 0 91.269 84.684" enable-background="new 0 0 91.269 84.684" xml:space="preserve"><path fill="#bdbdbd" d="M44.585,42.285v-18.74c0-4.924,8.805-4.925,8.805,0v16.892h22.232c3.755,0,3.755,5.711,0,5.711H48.987C46.654,46.148,44.585,44.847,44.585,42.285L44.585,42.285z M11.828,25.662L0,46.148h6.757c1.925,21.601,20.068,38.536,42.169,38.536c23.385,0,42.342-18.958,42.342-42.341C91.269,18.958,72.312,0,48.927,0c-14.72,0-27.684,7.513-35.271,18.913l5.88,10.184c5.052-11.194,16.312-18.985,29.391-18.985c17.8,0,32.23,14.43,32.23,32.23c0,17.799-14.43,32.229-32.23,32.229c-16.512,0-30.123-12.418-32.006-28.424h6.734L11.828,25.662z" /></svg>
		</span>
	</div>
</template>

<script>
	export default {
		name: 'postTime',
		props: ['startTime', 'endTime'],
		data () {
			return {
				openStatus: false
			}
		},
		methods: {
			showAnnotation: function () {
				this.openStatus = true;
			},
			hideAnnotation: function () {
				this.openStatus = false;
			}
		}
	}
</script>