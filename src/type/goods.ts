export interface IList {
    id: number,
    introduce: string,
    title: string,
    userId: number,
}
interface IshowInfo{
    id: number,
    introduce: string,
    title: string,
    pageIndex:number,
    maxShow:number,
    maxMsg:number,
}
export class GoodsList {
    getList:IList[]=[];
    showInfo:IshowInfo={
        id: 1,
        introduce: '',
        title: '',
        pageIndex:1,
        maxMsg:1,
        maxShow:5
    }
}