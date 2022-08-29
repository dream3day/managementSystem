export interface IRole {
    role: number | undefined;
    roleName: string;
}
interface IUserList {
    id: number;
    nickName: string;
    userName: string;
    role: IRole[]
}
interface IRoleList {
    authority: number[];
    roleId: number;
    roleName: string;
}
interface IShow {
    role: number | undefined;
    nickName: string;
}
interface IActived {
    id: number;
    nickName: string;
    userName: string;
    role: number[]
}
export class UserList {
    // 所有用户信息
    data: IUserList[] = [];
    // 搜索条件{role：下拉选择身份}{nickName：搜索框内容}
    showInfo: IShow = {
        role: undefined,
        nickName: ''
    };
    // 角色信息（目前作用仅仅给下拉菜单提供身份名称及对应的数字编号）
    RoleList: IRoleList[] = [];
    // 当前被点击编辑的用户信息
    actived: IActived = {
        id: 0,
        nickName: '',
        userName: '',
        role: []
    };
    /**
     * 信息编辑页面是否展示 
     */ 
    isShow=false
}