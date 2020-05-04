let resource = 'Tanimlamalar/ModulTanimlamalari/StokKontrol/Depo';

export default {
    GetByPage(paginateFilter) {
        return window.axios.get(resource, {params: paginateFilter});
    },

    GetById(id) {
        return window.axios.get(resource + "/" + id);
    },

    GetDepoYerleri() {
        return window.axios.get(resource + "/listDepoYerleri");
    },

    GetGirisTurleri(params) {
        return window.axios.get(resource + "/listGirisTurleri", {params: params});
    },

    GetCikisTurleri() {
        return window.axios.get(resource + "/listCikisTurleri");
    },

    DeleteById(id) {
        return window.axios.delete(resource + "/" + id);
    },

    Save(item) {
        if(item.id === undefined)
            return window.axios.post(resource, item);

        return window.axios.put(resource + "/" + item.id, item);
    },
}
