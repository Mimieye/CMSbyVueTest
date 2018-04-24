<template>
	<div class="unitRelated">
		<p class="annotation" v-show="openStatus">{{ unitList }}</p>
		<span class="icon hoverIcon" @mouseenter="showAnnotation" @mouseleave="hideAnnotation">
			<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="17px" height="17px" viewBox="0 0 35.627 35.627" enable-background="new 0 0 35.627 35.627" xml:space="preserve"><path fill="#bdbdbd" d="M16.85,3.222C16.335,3.735,0.586,19.484,0.586,19.484c-0.781,0.781-0.781,2.048,0,2.829l12.728,12.728c0.781,0.781,2.048,0.781,2.829,0c0,0,15.749-15.749,16.263-16.264c4.296-4.296,4.296-11.26,0-15.556S21.146-1.074,16.85,3.222zM30.638,10.924c-1.366,1.367-3.583,1.367-4.949,0c-1.367-1.367-1.367-3.584,0-4.949c1.366-1.367,3.583-1.367,4.949,0C32.005,7.34,32.005,9.557,30.638,10.924z"></path></svg>
		</span>
	</div>
</template>

<script>
	export default {
		name: 'unitRelated',
		props: ['unitList'],
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