import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ChannelForm from '@/components/ChannelForm'
import Item from '@/components/Item'
import ItemList from '@/components/ItemList'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/ChannelForm',
      component: ChannelForm
    },
    {
      path: '/item',
      component: Item
    },
    {
      path: '/ItemList',
      component: ItemList
    }
  ]
})
