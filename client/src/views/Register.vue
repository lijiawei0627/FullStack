<template>
  <div class="register">
     <div class="wrapper">
       <span class="title">学生信息在线后台管理系统</span>
       <div class="connect">
         <el-form :model="registerUser" :rules="rules" ref="register" label-width="100px" class="demo-ruleForm">
         <el-form-item label="用户名" prop="name">
           <el-input v-model="registerUser.name" placeholder="请输入用户名"></el-input>
         </el-form-item>
         <el-form-item label="邮箱" prop="email">
           <el-input type="email" v-model="registerUser.email" placeholder="请输入邮箱地址"></el-input>
         </el-form-item>
         <el-form-item label="密码" prop="password">
           <el-input type="password" v-model="registerUser.password" placeholder="请输入密码"></el-input>
         </el-form-item>
         <el-form-item label="确认密码" prop="checkPass">
           <el-input type="password" v-model="registerUser.checkPass" placeholder="请再次输入密码"></el-input>
         </el-form-item>
         <el-form-item label="选择身份" prop="identity">
           <el-select v-model="registerUser.identity" placeholder="请选择身份">
             <el-option label="管理员" value="管理员"></el-option>
             <el-option label="员工" value="员工"></el-option>
           </el-select>
         </el-form-item>
         <el-form-item>
           <el-button type="primary" @click="submitForm('register')">提交</el-button>
           <el-button @click="resetForm('register')">重置</el-button>
         </el-form-item>
       </el-form>
      </div>
     </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value !== this.registerUser.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
    }
    return {
      registerUser: {
        name: '',
        email: '',
        password: '',
        checkPass: '',
        identity: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur' 
          },
          {
            min: 3, max: 30, message: '长度应在3-30之间'
          }
        ],
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
        ],
        checkPass: [
          {
            required: true,
            message: '确认密码密码不能为空',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 30,
            message: '长度在6到30之间',
            trigger: 'blur'
          },
          {
            validator: validatePass,
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
          this.$axios.post('api/users/register', this.registerUser)
            .then(res => {
              const data = res.data
              if (data.success) {
                this.$message({
                  message: data.msg,
                  type: 'success'
                })
                this.$router.push('/login')
              } else {
                this.$message({
                  message: data.msg,
                  type: 'warning'
                })
              }
            })
        }
      })
    },
    resetForm (FormName) {
      console.log(FormName)
      this.$refs[FormName].resetFields();
    }
  },
}
</script>

<style scoped>
.register {
  width: 100%;
  height: 753px;
  background: url('../assets/timg.jpg') no-repeat center center;
  background-size: cover;
}
.register .wrapper {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 36%;
  padding: 25px;
  text-align: center;
}
.register .wrapper .title {
  font-family: 'Microsoft YaHei';
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.register .wrapper .connect {
  width: 330px;
  margin-top: 20px;
  background-color: #ffffff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccccc;
}
</style>


