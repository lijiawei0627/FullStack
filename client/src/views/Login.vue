<template>
  <div class="login">
     <div class="wrapper">
       <span class="title">学生信息在线后台管理系统</span>
       <div class="connect">
         <el-form :model="loginUser" :rules="rules" ref="login" label-width="100px" class="demo-ruleForm">
         <el-form-item label="邮箱" prop="email">
           <el-input type="email" v-model="loginUser.email" placeholder="请输入邮箱地址"></el-input>
         </el-form-item>
         <el-form-item label="密码" prop="password">
           <el-input type="password" v-model="loginUser.password" placeholder="请输入密码"></el-input>
         </el-form-item>
         <el-form-item>
           <el-button type="primary" @click="submitForm('login')">提交</el-button>
           <el-button @click="resetForm('login')">重置</el-button>
         </el-form-item>
         <p>还没有账号?<router-link to="/register" class="redirect">现在注册</router-link></p>
       </el-form>
      </div>
     </div>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'
export default {
  name: 'Login',
  data() {
    return {
      loginUser: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          {
            type: 'email',
            required: true,
            message: '邮箱不正确',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 30,
            message: '长度在6到30之间',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    submitForm (FormName) {
      this.$refs[FormName].validate((valid) => {
        if (valid) {
          this.$axios.post('api/users/login', this.loginUser)
            .then(res => {
              const data = res.data;
              console.log(data)
              if (data.success) {
                this.$message({
                  message: '登录成功',
                  type: 'success'
                })
                const {token} = data
                // console.log(token)
                localStorage.setItem('Token', token)
                
                const decoded = jwtDecode(token)
                console.log(decoded)
                this.$store.dispatch('setUser', decoded)
                this.$store.dispatch('setAuthenticated', !isEmpty(decoded))
                this.$router.push('/index')
              } else if (data.err) {
                this.$message({
                  message: '密码错误',
                  type: 'error'
                })
              } else {
                this.$message({
                  message: data.msg,
                  type: 'warning'
                })
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    },
    resetForm (FormName) {
      console.log(FormName)
      this.$refs[FormName].resetFields();
    },
    isEmpty (value) {
      return (value === undefined || value === null ||
      (typeof value === 'object' && Object.keys(value).length === 0) ||
      (typeof value === 'string' && value.trim().length ===0))
    }
  }
}
</script>

<style scoped>
.login {
  width: 100%;
  height: 753px;
  background: url('../assets/timg.jpg') no-repeat center center;
  background-size: cover;
}
.login .wrapper {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 36%;
  padding: 25px;
  text-align: center;
}
.login .wrapper .title {
  font-family: 'Microsoft YaHei';
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.login .wrapper .connect {
  width: 330px;
  margin-top: 20px;
  background-color: #ffffff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccccc;
}
.login .wrapper .connect p {
  margin-left: 175px;
}
.login .wrapper .connect p .redirect {
  font-size: 14px;
  text-decoration: none;
}
</style>
