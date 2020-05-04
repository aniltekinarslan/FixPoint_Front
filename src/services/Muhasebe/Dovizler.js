let resource = 'Muhasebe/Doviz';

export default {
    GetBySirket(SirketKod) {
        let paginateFilter = {};
        paginateFilter.SirketKod = SirketKod;

        return window.axios.get(resource, {params: paginateFilter});
    },

    GetById(kod) {
        return window.axios.get(resource + "/" + kod);
    },

    DeleteById(kod) {
        return window.axios.delete(resource + "/" + kod);
    },

    Save(item) {
        if(_.isUndefined(item.id))
            return window.axios.post(resource, item);

        return window.axios.put(resource + "/" + item.DovizKod, item);
    },
}
