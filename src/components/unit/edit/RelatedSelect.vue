<template>
	<div class="relatedUnit">
		<div class="unitSelectList">
			<div class="unitItem" v-for="(selectUnitData, index) in selectUnitDatas">
				<span class="text">{{ selectUnitData.name }}</span>
				<span class="deleteBtn" @click="removeFormList(selectUnitData)">x</span>
			</div>
		</div>
		<div class="select" v-clickOutside="closeIt">
			<span class="display" @click="selectBoxOpen = !selectBoxOpen">+新增所屬單元</span>
			<div class="optionList" v-show="selectBoxOpen">
				<div class="searchBox">
					<input type="text" class="searchList">
					<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 18 18" enable-background="new 0 0 18 18" xml:space="preserve">
						<path fill="#B9B9B9" d="M17.711,15.614l-4.194-4.195c-0.332-0.333-0.848-0.378-1.229-0.137l-0.988-0.987 c1.984-2.488,1.827-6.142-0.475-8.442c-2.47-2.471-6.5-2.471-8.971,0c-2.47,2.471-2.47,6.501,0,8.973 c2.301,2.301,5.954,2.458,8.44,0.474l0.988,0.988c-0.241,0.383-0.196,0.897,0.137,1.229l4.194,4.195 c0.386,0.385,1.015,0.385,1.399,0l0.698-0.699C18.096,16.628,18.096,15.999,17.711,15.614z M9.733,9.732 c-1.869,1.87-4.918,1.87-6.788,0c-1.87-1.869-1.87-4.918,0-6.788s4.918-1.87,6.788,0C11.603,4.814,11.603,7.863,9.733,9.732z"/>
					</svg>
				</div>
				<ul>
					<AccordionList v-for="(unitData, index) in unitDatas" :model="unitData" :key="index" :dash="''"></AccordionList>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import clickOutside from '@/directive/clickOutside'
	import { bus } from '@/main'

	export default {
		name: 'relatedUnit',
		props: ['unitDatas' , 'selectUnitDatas'],
		data () {
			return {
				selectBoxOpen: false
			}
		},
		directives: {
			clickOutside
		},
		methods: {
			removeFormList: function (data) {
				this.$emit('deleteSelect', data);
			},
			closeIt: function () {
				this.selectBoxOpen = false;
			}
		},
		mounted () {
			bus.$on('closeBox', this.closeIt);
		}
	}
</script>