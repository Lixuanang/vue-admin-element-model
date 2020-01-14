<template>
  <section
    class="app-main"
    :class="{ 'hide-header': !header }"
  >
    <transition
      name="fade-transform"
      mode="out-in"
    >
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      const urlParentObj = this.$route.matched[this.$route.matched.length - 2]
      if (urlParentObj && urlParentObj.meta && urlParentObj.meta.change) {
        return urlParentObj.name !== undefined
          ? urlParentObj.name
          : urlParentObj
      } else {
        return this.$route.name !== undefined
          ? this.$route.name + +new Date()
          : this.$route + +new Date()
      }
    },
    header() {
      return this.$store.state.settings.header
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  position: relative;
  top: 50px;
  width: 100%;
  /* 50 = navbar  */
  height: calc(100vh - 50px);
  overflow: auto;
  background-color: rgba(245, 248, 252, 1);
  &.hide-header {
    top: 0;
  }
}
.fixed-header + .app-main {
  padding-top: 10px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
