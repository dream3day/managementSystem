<template>
    <div class="topNav">
        <div class="serchArea">
            <el-form :inline="true" :model="goodsList.showInfo" class="demo-form-inline">
                <el-form-item label="标题">
                    <el-input v-model="goodsList.showInfo.introduce" placeholder="请输入关键字" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
    <div class="main">
        <el-table :data="showList.computedList" border style="width: 100%">
            <el-table-column prop="id" label="ID" width="80" />
            <el-table-column prop="title" label="标题" width="180" />
            <el-table-column prop="introduce" label="内容" />
        </el-table>
        <el-pagination background layout="prev, pager, next" :page-size="goodsList.showInfo.maxShow"
            v-model:current-change="defaultValue" @current-change="currentChange" @size-change="sizeChange"
            :total=goodsList.showInfo.maxMsg />
    </div>
</template>

<script setup lang="ts">
import { getGoodsList } from '../../request/api';
import { reactive, computed, ref, onUpdated, onMounted, onBeforeMount, watch } from 'vue'
import { GoodsList } from '../../type/goods'
import type { IList } from '../../type/goods'
let defaultValue = ref(2)

onUpdated(() => {
    // console.log(defaultValue.value);

})
// ui组件导入
const goodsList = reactive(new GoodsList())
// 初次获取资源
const getData = reactive(new GoodsList())
/**
 * 根据当前页显示内容
 */
const showList = reactive({
    computedList: computed(() => {
        return goodsList.getList.slice((goodsList.showInfo.pageIndex - 1) * goodsList.showInfo.maxShow, goodsList.showInfo.pageIndex * goodsList.showInfo.maxShow)
    })
})

onMounted(() => {
    getNetData()
})
/**
 * 首次获取所有资源
 */
const getNetData = () => {
    getGoodsList().then((res) => {
        getData.getList = res.data
        getAllList()
    })
}

/**
 * 获取所有商品列表；
 */
const getAllList = () => {
    goodsList.getList = getData.getList
    goodsList.showInfo.maxMsg = goodsList.getList.length
    return Promise.resolve(goodsList)
}
/**
 * 一页最大显示数量
 */
const sizeChange = (maxShow: number) => {
    goodsList.showInfo.maxShow = maxShow

}
/**
 * 当然显示页数
 */
const currentChange = (pageIndex: number) => {
    return goodsList.showInfo.pageIndex = pageIndex;
}
/**
 * 搜索栏输入后递交查询按钮
 */
const onSubmit = () => {
    // getAllList()
    // 搜索内容不为空，则在所有信息中筛选出符合条件的标题，填充入arr数组
    getAllList().then((res) => {
        serchContent(res)
    })
}
/**
 * 根据内容搜索结果返回给列表数组
 * @pramas {content} 搜索的内容
 */
function serchContent(data: GoodsList) {
    // content=content.trim()
    // 搜索结果的数组
    data.showInfo.introduce=data.showInfo.introduce.trim();
    let arr_result: IList[] = [];
    if (data.showInfo.introduce) {
        /**
        let set_result = new Set();
        // 过滤符合条件的对象，并返回一个新的数组
        goodsList.getList.filter((value: IList, index: number) => {
            if (value.title.indexOf(goodsList.showInfo.introduce) !== -1 || value.introduce.indexOf(goodsList.showInfo.introduce) !== -1) {
                // 使用set数组选取所有符合要求的元素下标
                set_result.add(index)
                return true
            }
            return false
        })
        //使用set数组中的元素作为所有数据数组下标，添加进新数组中
        set_result.forEach((item) => {
            arr_result.push(goodsList.getList[item as number])
        })
        */
        arr_result = data.getList.filter((value: IList) => {
            return (value.title.indexOf(data.showInfo.introduce) !== -1 || value.introduce.indexOf(data.showInfo.introduce) !== -1)
        })
        data.getList = arr_result;
        data.showInfo.maxMsg = arr_result.length
    }
}
// watch(() => goodsList.showInfo.introduce.trim(), () => {
//     if (goodsList.showInfo.introduce.trim() === '') getAllList()
// })
// ui组件导入

</script>

<style scoped lang="less">
* {
    // padding: 0;
    margin: 0;
    box-sizing: border-box;
}

@btn-color: purple;

.topNav {
    padding-bottom: 15px;
    border-bottom: 1px solid #ccc;

    .serchArea {
        width: 292px+64px;
        margin: 0 auto;

        .el-form {
            .el-button {
                background-color: @btn-color;
                width: 60px;
                border-radius: 8px;

                &:hover {
                    background-color: lighten(@btn-color, 10%);
                }
            }
        }
    }
}
</style>
<style>
.el-form-item__label {
    color: #666 !important;
}
</style>