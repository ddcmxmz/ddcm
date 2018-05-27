import { server } from '@/tools/servers'
export class MH0201Api {
    // 文章新建提交
    static ArticleAddSubmitApi(data = {}, files = []) {
            return server.connection('POST', `/MH0201/A01`, data, files)
        }
        // 文章列表获取（分页&查询）
    static GetArticleListApi(data = {}) {
            return server.connection('GET', `/MH0201/A02`, data)
        }
        // 文章删除
    static DeleteArticleApi(data) {
            return server.connection('POST', `/MH0201/A03`, data)
        }
        // 文章编辑提交
    static ArticleEditSubmitApi(data = {}, files = []) {
            return server.connection('POST', `/MH0201/A04`, data, files)
        }
        // 文章编辑数据获取
    static GetArticleEditData(id) {
        return server.connection('GET', `/MH0201/A05`, id)
    }
    static GetArticleClassifyList() {
        return server.connection('Get', `/MH0202/A01`)
    }
}
