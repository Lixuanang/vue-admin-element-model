<template>
  <div class="api-container">
    <el-button
      class="api-text"
      @click="handleButton"
    >
      发送请求
    </el-button>
    <div
      v-if="response"
      class="result"
    >
      公司名称：{{ companyName }}
      <br /><br />
      公司信息：{{ response }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'StoreApi',
  data() {
    return {
      params: {
        company: '第五城',
        driver: '陈晔',
        escort: '陈赛',
        vehicle: '吕志鹏',
        trailer: '李轩昂'
      },
      response: null
    }
  },
  computed: {
    companyName() {
      return this.$store.state.example.company
    }
  },
  methods: {
    /**
     * 发送请求
     */
    handleButton() {
      this.$store
        .dispatch('example/Example', this.params)
        .then(res => {
          if (res && res.code === 0) {
            this.response = JSON.stringify(res.data)
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.api-container {
  padding: 20px;

  .result {
    padding: 20px;
  }
}
</style>
