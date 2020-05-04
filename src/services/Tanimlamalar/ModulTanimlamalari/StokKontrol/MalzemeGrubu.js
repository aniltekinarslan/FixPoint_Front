let resource = 'Tanimlamalar/ModulTanimlamalari/StokKontrol/MalzemeGrubu';

export default {
    GetByPage(paginateFilter) {
        return window.axios.get(resource, {params: paginateFilter});
    },

    GetByLevel(groupNo) {
        return window.axios.get(resource + "/listWithLevel/" + groupNo);
    },

    GetById(id) {
        return window.axios.get(resource + "/" + id);
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
