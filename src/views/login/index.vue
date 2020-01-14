<template>
  <div class="root-login">
    <div class="root-login-form">
      <h2 class="root-login-title">欢迎登录</h2>
      <el-form
        ref="loginForm"
        :model="loginParams"
        :rules="loginRules"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginParams.username"
            type="text"
            name="username"
            maxlength="11"
            autocomplete="off"
            size="medium"
            prefix-icon="el-icon-user"
            placeholder="请输入手机号"
            @input="handleUsername($event)"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <input
            type="password"
            style="display: none;"
          />
          <el-input
            v-model="loginParams.password"
            :type="passwordType"
            name="password"
            autocomplete="new-password"
            maxlength="24"
            size="medium"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            @keyup.enter.native="login('loginForm')"
          >
            <span
              slot="suffix"
              class="password-suffix"
              @click="hanldePasswordType"
            >
              <svg-icon
                :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
              />
            </span>
          </el-input>
        </el-form-item>
        <div class="root-login-extra">
          <div class="root-login-remember">
            <el-checkbox v-model="rememberPwd">记住密码</el-checkbox>
          </div>
        </div>
        <div class="root-login-foot">
          <el-button
            :loading="loginLoading"
            class="root-btn"
            type="primary"
            style="width: 100%;"
            @click="login('loginForm')"
          >
            登 录
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  validateTel,
  validatePwd
} from '@/utils/validateRule'
import Cookies from 'js-cookie'
import { debounce } from '@/utils/index'
import md5 from '@/utils/md5'

export default {
  name: 'Login',
  data() {
    return {
      passwordType: 'password',
      rememberPwd: !!+Cookies.get('rememberPwd'),
      loginParams: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          {
            required: true,
            validator: validateTel,
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            validator: validatePwd,
            trigger: 'blur'
          }
        ]
      },
      loginLoading: false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted() {
    let remember = Cookies.get('remember')
    if (remember) {
      remember = JSON.parse(remember)
      this.loginParams.username = remember.username
      this.loginParams.password = remember.password
    }
  },
  methods: {
    /**
     * 手机号输入框只能输入数字
     * @param null
     * @return null
     */
    handleUsername() {
      (debounce(() => {
        this.loginParams.username = this.loginParams.username.replace(/[^0-9]/g, '')
      }, 100))()
    },
    /**
     * 显示密码
     * @param null
     * @return null
     */
    hanldePasswordType() {
      this.passwordType = this.passwordType ? '' : 'password'
    },
    /**
     * 登录
     * @param {String} formName
     * @return null
     */
    login(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) return
        this.loginLoading = true
        const { username, password } = this.loginParams
        this.$store
          .dispatch('user/Login', {
            username: +username,
            password: md5(password)
          })
          .then(res => {
            if (res && res.code === 0) {
              Cookies.set('rememberPwd', this.rememberPwd ? 1 : 0)
              if (this.rememberPwd) {
                Cookies.set('remember', JSON.stringify(this.loginParams))
              } else {
                Cookies.remove('remember')
              }
              this.$router.push(this.redirect || '/')
            }
          })
          .finally(() => {
            this.loginLoading = false
          })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/** 登录 **/
.root-login {
  position: absolute;
  left: 50%;
  z-index: 99999;
  width: 520px;
  padding: 35px 35px 15px 35px;
  margin: 150px auto 0 -260px;
  background-color: #fff;
  border: 1px solid #ebebeb;
  border-radius: 4px;
  &-title {
    margin-bottom: 40px;
    font-size: 24px;
    font-weight: 600;
    text-align: center;
  }
  .el-form-item {
    margin-bottom: 28px;
  }
  .password-suffix {
    margin: 0 6px 0 0;
    font-size: 14px;
    vertical-align: -3px;
    cursor: pointer;
  }
  &-extra {
    display: flex;
    margin-bottom: 20px;
    justify-content: space-between;
  }
  &-forget-link {
    color: #999;
    transition: all 0.25s;
    &:hover {
      color: #409eff;
    }
  }
  &-foot {
    text-align: center;
    .root-btn {
      margin: 0 0 20px 0;
    }
  }
}
</style>
