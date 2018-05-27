import { server } from '@/tools/servers'

export class MH0202Api {
    static GetListApi(search = {}) {
        return server.connection('GET', `/MH0202/A01`, search)
    }

    static GetItemApi(id) {
        return server.connection('GET', `/MH0202/A03`, id)
    }

    static AddApi(data) {
        return server.connection('POST', `/MH0202/A02`, data)
    }

    static EditorApi(data) {
        return server.connection('POST', `/MH0202/A04`, data)
    }

    static DeleteApi(id) {
        return server.connection('POST', `/MH0202/A05`, id)
    }
}
