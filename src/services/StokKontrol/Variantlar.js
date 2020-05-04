let resource = 'StokKontrol/Variant';

export default {
    GetByPage(paginateFilter) {
        return window.axios.get(resource, {params: paginateFilter});
    },

    GetById(id) {
        return window.axios.get(resource + "/" + id);
    },

    DeleteById(id) {
        return window.axios.delete(resource + "/" + id);
    },

    Search(paginateFilter) {
        return window.axios.get(resource + "/search" , {params: paginateFilter});
    }
}
