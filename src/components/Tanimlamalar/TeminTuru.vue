<template>
    <el-select :value="value" placeholder="- Seçin -" @input="$emit('input', $event)">
        <el-option
                v-for="item in items"
                :key="item.aciklama"
                :label="item.aciklama"
                :value="item.aciklama">
        </el-option>
    </el-select>
</template>

<script>
    import TeminTuruService from "@/services/Tanimlamalar/ModulTanimlamalari/StokKontrol/TeminTurleri";

    export default {
        name: 'TeminTuru',
        props: ['value'],
        data() {
            return {
                items: [],
            }
        },
        methods: {
            fetchData()
            {
                TeminTuruService
                    .GetByPage()
                    .then(response =>
                    {
                        if (response && response.data)
                            this.items = response.data.data.data;
                    })
                    .catch(error =>
                    {
                        this.ShowMsg('error', error.errors, 'Hata');
                    });
            },
        },
        mounted()
        {
            this.fetchData();
        }
    }
</script>