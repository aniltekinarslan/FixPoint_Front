let resource = 'StokKontrol/StokHareketleri';

export default {
    GetByPage(paginateFilter) {
        return window.axios.get(resource, {params: paginateFilter});
    },

    GetById(id) {
        return window.axios.get(resource + "/" + id);
    },

    DeleteById(id) {
        return window.axios.delete(resource + "/" + id);
    }
}
