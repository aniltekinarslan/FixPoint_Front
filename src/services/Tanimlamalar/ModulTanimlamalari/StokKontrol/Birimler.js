let resource = 'Tanimlamalar/ModulTanimlamalari/StokKontrol/Birim';

export default {
    GetByPage(paginateFilter) {
        if(_.isEmpty(paginateFilter))
        {
            paginateFilter = [];
            paginateFilter['size'] = 20;
        }

        return window.axios.get(resource, {params: paginateFilter});
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
