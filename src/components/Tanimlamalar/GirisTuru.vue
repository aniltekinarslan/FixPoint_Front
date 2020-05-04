<template>
    <el-select v-model="model" placeholder="- Seçin -" :disabled="disabled" @change="changed">
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
        name: 'GirisTuru',
        props: ['model', 'disabled', 'transfer', 'hareket'],
        data() {
            return {
                data: [],
                params: {
                    transfer: this.transfer,
                    hareket: this.hareket
                }
            }
        },
        methods: {
            changed()
            {
                console.log(this.$parent.lastSelectedInputParentName);
            },

            fetchData()
            {
                DepolarService
                    .GetGirisTurleri(this.params)
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