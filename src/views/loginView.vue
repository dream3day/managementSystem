<template>
    <div class="login-bgi">
        <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="80px"
            class="demo-ruleForm">

            <el-form-item label="账号：" prop="username">
                <el-input v-model="ruleForm.username" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码：" prop="password">
                <!-- 需与prop中的值一致 -->
                <el-input type="password" v-model="ruleForm.password" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
                <el-button @click="resetForm(ruleFormRef)">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
// import { AxiosResponse } from 'axios';
import { FormInstance, FormRules } from 'element-plus';
import { reactive, ref } from 'vue';
import { login } from '../request/api';
import { useRouter } from 'vue-router';
const router=useRouter();
const ruleFormRef = ref<FormInstance>();
//双向绑定的账号密码
const ruleForm = reactive({
    username: '',
    password: ''
})
const rules = reactive<FormRules>({
    username: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
    ]
})

// interface IToken{
//     token:string
// }
const submitForm = async (ruleFormRef: FormInstance | undefined) => {
    if (!ruleFormRef) return;
    await ruleFormRef.validate((valid, fields) => {
        if (valid) {
            // console.log('submitForm',ruleFormRef);
            
            login(ruleForm).then((res)=>{
                console.log(res.data);
                
                localStorage.setItem('token',res.data.token);
                router.push('/');
            })
        } else {
            console.log('error submitForm', fields);
        }
    })

}
function resetForm(ruleFormRef: FormInstance | undefined): void {
    if (!ruleFormRef) return;
    ruleFormRef.resetFields();
}
</script>

<style lang="less" scoped>
.login-bgi {
    background-image: url(../assets/wallhaven-758147.jpg);
    width: 100%;
    height: 100%;

    .el-form {
        display: block;
        margin: 0 auto;
        width: 450px;
        position: relative;
        top: 350px;

    }


}
</style>
<style lang="less">
.el-form-item__label {
    color: #ccc !important;

    &::before {
        color: #f60 !important;
    }
}

.el-form-item__error {
    color: #f60 !important;
}

.el-form-item__content {
    display: flex;
    justify-content: space-between;

    .el-button {
        width: 45%;
    }
}
</style>