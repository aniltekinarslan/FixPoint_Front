let resource = 'Tanimlamalar/Sirket';

export default {
    GetByList() {
        return window.axios.get(resource);
    },
}
