<template>
    <el-select v-model="model" placeholder="- Seçin -" :disabled="disabled">
        <el-option
                v-for="item in data"
                :key="item.aciklama"
                :label="item.aciklama"
                :value="item.aciklama">
        </el-option>
    </el-select>
</template>

<script>
    import DepolarService from "@/services/Tanimlamalar/ModulTanimlamalari/StokKontrol/Depolar";

    export default {
        name: 'CikisTuru',
        props: ['model', 'disabled'],
        data() {
            return {
                data: [],
            }
        },
        methods: {
            fetchData()
            {
                DepolarService
                    .GetCikisTurleri()
                    .then(response =>
                    {
                        if (response && response.data)
                            this.data = response.data.data;
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