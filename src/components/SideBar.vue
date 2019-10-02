<template>
      <div class="bg-light border-right" id="sidebar-wrapper">
      <div class="sidebar-heading"><font-awesome-icon :icon="['fa', 'sitemap']" class="mr-2"/>網站導覽 </div>
      <div class="list-group list-group-flush">
        <router-link :class="['list-group-item list-group-item-action',{'active': $route.fullPath === '/'}]" 
         :to="{ name: 'home' }">儀錶板</router-link>

        <router-link class="list-group-item list-group-item-action" active-class="active" :to="{ name: 'demo' }">展示</router-link>

        <router-link class="list-group-item list-group-item-action" active-class="active" :to="{ name: 'others' }">其他</router-link>


      </div>
    </div>
</template>