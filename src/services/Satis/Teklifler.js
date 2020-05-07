let resource = 'Satis/Teklif';

export default {
    GetByPage(paginateFilter) {
        return window.axios.get(resource, {params: paginateFilter});
    },

    GetById(kod) {
        return window.axios.get(resource + "/" + kod);
    },

    DeleteById(kod) {
        return window.axios.delete(resource + "/" + kod);
    },

    Search(paginateFilter) {
        return window.axios.get(resource + "/search" , {params: paginateFilter});
    },

    Save(item) {
        if(_.isUndefined(item.id))
            return window.axios.post(resource, item);

        return window.axios.put(resource + "/" + item.CariKod, item);
    },

    GetUrunBazliListe(paginateFilter) {
        return window.axios.get(resource + "/urunbazliliste", {params: paginateFilter});
    },
}
