<template>
    <div class="serchArea">
        <el-form :inline="true" :model="userList.showInfo" class="demo-form-inline">
            <el-form-item label="标题">
                <el-input v-model="userList.showInfo.nickName" placeholder="请输入关键字" />
            </el-form-item>
            <el-select v-model="userList.showInfo.role" class="m-2" placeholder="请选择" size="default">
                <el-option label="全部" :value="0" />
                <el-option v-for="item in userList.RoleList" :key="item.roleId" :label="item.roleName"
                    :value="item.roleId" />
            </el-select>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">搜索</el-button>
            </el-form-item>
        </el-form>
    </div>
    <el-table :data="userList.data" style="width: 100%">
        <el-table-column prop="id" label="用户ID" width="180" />
        <el-table-column prop="nickName" label="昵称" width="180" />
        <el-table-column prop="role" label="角色" width="180">
            <template #default="scope">
                <el-button link size="small" v-for="item in scope.row.role" :key="item.role">
                    {{ item.roleName }}
                </el-button>
            </template>
        </el-table-column>
        <el-table-column prop="role" label="操作">
            <template #default="scope">
                <el-button link size="small" type="primary" @click="changeInfo(scope)">
                    编辑
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog v-model="userList.isShow" title="用户信息管理">
        <!-- 表单验证成功 :rules prop-->
        <el-form :model="userList.actived" :rules="rules" ref="formData">
            <!-- <el-table-column property="id" label="ID" width="150" /> -->
            <el-form-item label="昵称" label-width="140px" prop="nickName">
                <el-input v-model="userList.actived.nickName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="身份" label-width="140px" prop="role">
                <el-select multiple v-model="userList.actived.role" class="m-2" placeholder="请选择" size="default">
                    <el-option v-for="item in userList.RoleList" :key="item.roleId" :label="item.roleName"
                        :value="item.roleId" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="userList.isShow = false">取消</el-button>
                <el-button type="primary" @click="saveInfo(formData)">保存</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { getUserList, getRoleList } from '../../request/api';
import { UserList } from '../../type/users'
import type { IRole } from '../../type/users'
import { FormInstance, FormRules } from 'element-plus';

onMounted(() => {
    get_userList()
    get_roleList()
})
const rules = reactive<FormRules>({
    nickName: [{ required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }],
    role: [{ required: true, message: '请选择身份', trigger: 'change' }]
})
// 定义接收的数据类型数组
const userList = reactive(new UserList())
const fistGetList = reactive(new UserList())
const formData = ref<FormInstance>();
/**
 * 获取服务器数据并储存
 */
const get_userList = () => {
    getUserList().then((res) => {
        if ((res as any).code == 200) {
            fistGetList.data = res.data;
            getAllList()
        }
    })
}
/**
 * 获取服务器储存缓存的所有数据
 */
const getAllList = () => {
    userList.data = fistGetList.data;
    return Promise.resolve(userList)
}
/**
 * 获取角色信息
 */
const get_roleList = () => {
    getRoleList().then((res) => {
        if ((res as any).code == 200) {
            userList.RoleList = res.data
        }
    })
}
const searchUser = () => {
    // console.log(userList.showInfo.nickName);
    // console.log(userList.showInfo.role);
    getAllList().then((res) => {
        const list = new UserList()
        if (!res.showInfo.role) return res;
        for (const data of res.data) {
            if (data.role.find((item) => item.role == res.showInfo.role)) list.data.push(data)
        }
        // console.log(list);
        return list
    }).then((res) => {
        // 搜索栏是否为空，不为空时过滤数组并赋值给data
        userList.data = userList.showInfo.nickName == '' ? res.data : res.data.filter((item) => {
            return item.nickName.indexOf(userList.showInfo.nickName)!=-1
        })

    })

}
const onSubmit = () => {
    searchUser()
}
const changeInfo = (res: any) => {
    userList.actived = { ...res.row }
    // userList.actived.role=new Array(res.row.role)
    userList.actived.role = res.row.role.map((item: any) => { return item.role })
    // console.log(userList.actived.role===res.row.role);
    userList.isShow = true
}
function getDataArray(arr: number[]): IRole[] {

    let list: IRole[] = []
    arr.forEach(item => {
        const obj = userList.RoleList.find(i => { return i.roleId == item })
        list.push({
            role: obj?.roleId,
            roleName: obj?.roleName as string
        })
    })
    return list
}

const saveInfo = async (formData: FormInstance | undefined) => {
    if (!formData) return
    // console.log(formData);
    await formData.validate((valid, fields) => {
        if (valid) {
            const list: IRole[] = getDataArray(userList.actived.role)
            userList.data[userList.data.findIndex(item => item.id == userList.actived.id)] = { ...userList.actived, role: list };
            // console.log(userList.data[userList.data.findIndex(item=>item.id==userList.actived.id)]);
            // todo:submit internet server
            userList.isShow = false
        }else{
            throw new Error("error submit",fields);
        }
    })
}
</script>

<style scoped>
.el-select {
    vertical-align: middle;
    /* display: inline-flex; */
    margin-bottom: 18px;
    margin-right: 32px;
}
</style>
<style>
.el-input__wrapper {
    flex-grow: 0;
    width: 300px !important;
}

.el-dialog {
    --el-dialog-width: 30%
}
</style>