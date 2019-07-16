<template>
  <div>
    <head-nav></head-nav>
    <left-nav></left-nav>
    <router-view></router-view>
  </div>
</template>

<script>
import HeadNav from '../components/HeadNav'
import LeftNav from '../components/LeftNav'
export default {
  name: 'Index',
  components: {
    HeadNav,
    LeftNav
  }
}
</script>

<style scoped>
.index {
  width: 100%;
  height: 754px;
  overflow: hidden;
}
</style>
