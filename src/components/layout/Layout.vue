<template>
	<div class="layout">
		<HeaderPart :status="openStatus" v-on:changeStatus="changeStatus"></HeaderPart>
		<NavPart></NavPart>
		<Menu :status="openStatus"></Menu>

		<slot name="searchBar"></slot>

		<div class="contentBox">
			<div class="titleBar">
				<slot name="pageTitle"></slot>
				<slot name="searchBtn"></slot>
			</div>
			<slot/>
		</div>
	</div>
</template>

<script>
	import HeaderPart from '@/components/global/Header'
	import Menu from '@/components/global/Menu'
	import NavPart from '@/components/global/Nav'

	export default {
		name: 'layout',
		data () {
			return {
				'openStatus': false,
			}
		},
		components: {
			HeaderPart,
			NavPart,
			Menu,
		},
		methods: {
			changeStatus: function (status) {
				this.openStatus = status;
			},
		}
	}
</script>
