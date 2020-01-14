<template>
  <div
    :class="{ hidden: hidden }"
    class="pagination-container"
  >
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="20 * total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { scrollTo } from '@/utils/scrollTo'

export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50]
      }
    },
    layout: {
      type: String,
      default: ' prev, pager, next'
    },
    background: {
      type: Boolean,
      default: false
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentPage: {
      get() {
        return +this.$route.query.currentPage || this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  },
  destroyed() {
    sessionStorage.removeItem('page')
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('pagination', { page: this.currentPage, limit: val })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    },
    handleCurrentChange(val) {
      this.$emit('pagination', { page: val, limit: this.pageSize })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
      sessionStorage.setItem('page', val)
    }
  }
}
</script>

<style scoped>
.pagination-container {
  padding: 10px 16px;
  overflow-x: auto;
  background: #fff;
}
.pagination-container.hidden {
  display: none;
}
.pagination.is-background .el-pager li {
  color: #595959;
  color: rgba(89, 89, 89, 1);
  border-radius: 50%;
}
::v-deep .el-pager li {
  height: 24px;
  min-width: 24px;
  margin-left: 10px;
  color: rgba(89, 89, 89, 1);
}
::v-deep .el-pager li.active {
  color: rgba(64, 121, 255, 1);
  background: #f0f4ff;
  border-radius: 50%;
}
</style>
