<template>
    <div v-loading="loadingData">
    <el-select :value="value" placeholder="- Seçin -" @input="$emit('input', $event)" :disabled="disabled">
        <el-option
                v-for="item in items.filter(i => i.aciklama != exclude)"
                :key="item.aciklama"
                :label="item.aciklama"
                :value="item.aciklama">
        </el-option>
    </el-select>
        </div>
</template>

<script>
    import BirimlerService from "@/services/Tanimlamalar/ModulTanimlamalari/StokKontrol/Birimler";

    export default {
        name: 'Birim',
        props: ['value', 'disabled', 'exclude'],
        data() {
            return {
                loadingData: true,
                items: [],
            }
        },
        methods: {
            fetchData()
            {
                BirimlerService
                    .GetByPage()
                    .then(response =>
                    {
                        if (response && response.data)
                            this.items = response.data.data.data;
                        this.loadingData = false;
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