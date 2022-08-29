<template>
    <!-- <div>
        <h1 v-if="username">欢迎回来,{{ username }}</h1>
    </div> -->
    <div class="common-layout">
        <el-container>
            <el-header>
                <el-row :gutter="20">
                    <el-col :span="4">
                        <div class="grid-content ep-bg-purple">
                            <img src="../assets/wallhaven-753179.jpg" alt="logo" class="topLogo">
                        </div>
                    </el-col>
                    <el-col :span="16">
                        <div class="grid-content ep-bg-purple">
                            <h1 class="title">管 理 系 统</h1>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content ep-bg-purple">
                            <span class="picborder" @mouseover="pic2show" @mouseleave="pic2none">
                                <span class="dropdown">
                                    <div class="aboutMe">
                                        <ul>
                                            <li>个人信息</li>
                                            <li>我的消息<el-icon
                                                    style="vertical-align: middle;margin-left: 5px;padding-bottom: 2px;font-size: 12px;"
                                                    color="#666">
                                                    <Bell />
                                                </el-icon>
                                            </li>
                                            <li>退出登录</li>
                                        </ul>
                                    </div>
                                </span>
                                <span class="iconfont icon-bussiness-man" @click.self="router.push({ name: 'login' })"></span>
                            </span>

                        </div>
                    </el-col>
                </el-row>
            </el-header>
            <el-container>
                <el-aside width="150px">
                    <el-menu :default-active="list[0].path" class="el-menu-vertical-demo" background-color="#545c64"
                        text-color="#ccc" active-text-color="#ffd04b" router><!-- router表示启用路由，element功能 -->
                        <!-- 菜单项中遍历，使用title作为分类名 -->
                        <!-- 启用element的路由功能后，index可以跳转对应路由 -->
                        <el-menu-item :index="item.path" v-for="item in list" :key="item.path">
                            <span style="font-size:16px">{{item.meta.title}}</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-container>
                    <el-main>
                        <!-- 占位符 -->
                        <router-view></router-view>
                    </el-main>
                    <el-footer>Footer</el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>
<script setup lang="ts">
// import jwtDecode from "jwt-decode";
// const token = localStorage.getItem('token');
// interface IUser {
//     user: any
// }
// const user = (jwtDecode(token as string) as IUser).user;
// const username = user.nickname;
import { useRouter } from 'vue-router';
let router = useRouter();
// 用户头像下菜单是否显示
let isShowPic = false;
let overTimer: any;
// 筛选出所有isShow为true的菜单项
const list=router.getRoutes().filter(item=>item.meta.isShow);
// console.log(list);


async function pic2show() {
    // 重置计时器
    clearTimeout(overTimer);
    if (!isShowPic) {
        (document.querySelector('.aboutMe') as HTMLElement).style.opacity = '1';
        isShowPic = true;
    }
    overTimer = await setTimeout(() => {
        isShowPic = false;
    }, 300);

}
async function pic2none() {

    await setTimeout(() => {
        if (isShowPic) return;
        (document.querySelector('.aboutMe') as HTMLElement).style.opacity = '0';
    }, 300);
}

</script>

<style lang="less" scoped>
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

@keyframes img_animation {
    0% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-3px);
    }

    100% {
        transform: translateY(0);
    }
}

.el-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #333;
    width: 100%;
    z-index: 1;
    .el-row {
        margin-bottom: 20px;
        position: relative;

        .topLogo {
            position: absolute;
            top: -12px;
            height: 60px;
            object-fit: cover;
        }


        .title {
            color: #ccc;
            text-align: center;
            line-height: 36px;
        }
    }

    .el-row:last-child {
        margin-bottom: 0;
    }

    .el-col {
        border-radius: 4px;

        // background-color: #ccc;
        .picborder {
            background-color: #333;
            display: inline-block;
            width: 36px;
            height: 36px;
            border: #ccc 2px solid;
            border-radius: 50%;

            &:hover {
                cursor: pointer;
                // animation: img_animation 0.3s;
            }

            // overflow: hidden;
            .icon-bussiness-man {
                font-size: 32px;
                line-height: 32px;
                text-align: center;
                color: #ccc;
            }

            .dropdown {
                position: relative;

                .aboutMe {
                    position: absolute;
                    left: -15px;
                    top: 34px;
                    width: 100px;
                    background-color: #eee;
                    border-radius: 3px;
                    transition: all 0.3s;
                    z-index: 1;
                    opacity: 0;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

                    ul {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        padding-top: 10px;
                        padding-bottom: 10px;

                        li {
                            margin: 0;
                            width: 100%;
                            cursor: pointer;
                            padding: 5px;
                            text-align: left;

                            &:hover {
                                background-color: #ccc;
                                color: #666;
                            }
                        }

                    }
                }
            }
        }



    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
}

.el-aside {
    .el-menu {
        //括号内无空格会出错
        height: calc(100vh - 60px);
    }
}


.el-footer {
    background-color: #666;
}
</style>