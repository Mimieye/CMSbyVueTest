<template>
	<li v-show="model.display">
		<span class="text" :class="{'item': model.categoryChild.length === 0}" @click="model.categoryChild.length > 0 ? openIt() : thisIndex(model)">{{dash}}{{model.name}}</span>
		<ul v-if="model.categoryChild.length > 0" v-show="openAccordion">
			<AccordionList v-for="(model, index) in model.categoryChild" :model="model" :key="index" :dash="dash + '-'"></AccordionList>
		</ul>
	</li>
</template>

<script>
	import LayoutBasic from '@/components/layout/Layout'
	import { bus } from '@/main'

	export default {
		name: 'accordionList',
		props: ['model', 'dash'],
		data () {
			return {
				openAccordion: false
			}
		},
		methods: {
			openIt: function () {
				this.openAccordion = !this.openAccordion
			},
			thisIndex: function (data) {
				bus.$emit('closeBox');
				bus.$emit('getIndex', data);
			}
		}
	}
</script>