import Vue from 'vue'
import Router from 'vue-router'
import notFund from '@/components/notFound'
import Login from '@/components/Login'
import Article from '@/components/page/ArticlePage'
import ArticleList from '@/components/page/ArticleList'
import Fund from '@/components/page/Fund'
import Layout from '@/components/layout/Layout'


Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/Login',
			name: 'Login',
			component: Login
		},
		// {
		// 	path: '/Article/:userId',
		// 	name: 'ArticleList',
		// 	meta: {
		// 		requireAuth: true,
		// 	},
		// 	component: ArticleList
		// },
		{
			path: '/Article',
			name: 'Article',
			meta: {
				requireAuth: true,
			},
			component: Article,
			// props: (route) => ({
			// 	query: route.query.guid
			// })
		},
		{
			path: '/ArticleList',
			name: 'ArticleList',
			meta: {
				requireAuth: true,
			},
			component: ArticleList
		},
		// {
		// 	path: '/Fund',
		// 	name: 'Fund',
		// 	meta: {
		// 		requireAuth: true,
		// 	},
		// 	component: Fund
		// },
		{
			path: '*',
			name: 'notFund',
			component: notFund
		},
	]
})
