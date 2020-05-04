<template>
    <el-select :value="value" placeholder="- Seçin -" @input="$emit('input', $event)" :disabled="disabled">
        <el-option
                key=""
                label="-"
                value="-">
        </el-option>
        <el-option
                v-for="item in items"
                :key="item.DovizKod"
                :label="item.DovizKod"
                :value="item.DovizKod">
        </el-option>
    </el-select>
</template>

<script>
    import DovizlerService from "@/services/Muhasebe/Dovizler";

    export default {
        name: 'Doviz',
        props: ['value', 'disabled', 'SirketKod'],
        data() {
            return {
                items: [],
            }
        },
        methods: {
            fetchData()
            {
                console.log(this.SirketKod);

                DovizlerService
                    .GetBySirket(this.SirketKod) //user Sirket
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