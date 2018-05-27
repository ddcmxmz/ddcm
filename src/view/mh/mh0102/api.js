import { server } from '@/tools/servers'

export class Mh0102Api {
    static GetArticleClassifyListApi(data) {
        return server.connection('GET', `/MH0102/A01`, data)
    }
}
