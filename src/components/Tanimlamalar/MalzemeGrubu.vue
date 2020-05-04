<template>
    <el-select :value="value" placeholder="- Seçin -" :disabled="disabled" @input="$emit('input', $event)">
        <el-option
                v-for="item in data"
                :key="item.GrupKod"
                :label="item.Aciklama"
                :value="item.GrupKod">
        </el-option>
    </el-select>
</template>

<script>
    import MalzemeGrubuService from "@/services/Tanimlamalar/ModulTanimlamalari/StokKontrol/MalzemeGrubu";

    export default {
        name: 'MalzemeGrubu',
        props: ['value', 'disabled', 'level'],
        data() {
            return {
                data: [],
            }
        },
        methods: {
            fetchData()
            {
                MalzemeGrubuService
                    .GetByLevel(this.level)
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