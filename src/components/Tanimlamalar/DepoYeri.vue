<template>
    <el-select :value="value" placeholder="- Seçin -" :disabled="disabled" @input="$emit('input', $event)">
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
        name: 'DepoYeri',
        props: ['value', 'disabled'],
        data() {
            return {
                data: [],
            }
        },
        methods: {
            fetchData()
            {
                DepolarService
                    .GetDepoYerleri()
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