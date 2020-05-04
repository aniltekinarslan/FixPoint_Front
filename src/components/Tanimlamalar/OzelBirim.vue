<template>
    <el-dialog
            title="Özel Birim"
            :visible.sync="visible"
            width="20%"
            align="center"
            append-to-body
            :close-on-click-modal="false"
            :close-on-press-escape="true"
            @close="closeDialog"
    >
        <el-form label-width="120px" label-position="top" align="center">
            <el-row :gutter="15">
                <el-col :xs="12" :lg="24">
                    <div class="form-group">
                        <el-col :xs="24" :lg="8">
                            <el-form-item label="Eş Değeri">
                                <el-input placeholder="Eş Değeri" v-model="item.Esdegeri" clearable>
                                </el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :xs="24" :lg="8">
                            <el-form-item label="Birim">
                                <Birim v-model="item.Birim" :exclude="stokbirim"></Birim>
                            </el-form-item>
                        </el-col>

                        <el-col :xs="24" :lg="8">
                            <el-form-item label="Birim Miktarı">
                                <el-input placeholder="Birim Miktarı" v-model="item.Kaci" clearable>
                                </el-input>
                            </el-form-item>
                        </el-col>

                    </div>
                </el-col>
                <el-col :xs="24" :lg="24" class="mt-20">
                    <el-button style="float:left;" type="info"
                               @click="closeDialog">Vazgeç
                    </el-button>
                    <el-button style="float:right;" type="success"
                               @click="saveOzelBirim()">
                        Özel Birim Kaydet
                    </el-button>
                </el-col>
            </el-row>
        </el-form>
    </el-dialog>
</template>

<script>
    import OzelBirimlerService from "@/services/Tanimlamalar/ModulTanimlamalari/StokKontrol/OzelBirimler";
    import Birim from '@/components/Tanimlamalar/Birim'

    export default {
        name: 'OzelBirim',
        props: ['visible', 'kod', 'id', 'stokbirim'],
        data()
        {
            return {
                item: {},
            }
        },
        components:
            {
                Birim,
            },
        methods: {
            closeDialog()
            {
                this.$parent.ozelBirimVisible = false;
                this.$parent.fetchData();
            },

            saveOzelBirim()
            {
                this.item.StokKod = this.kod;
                OzelBirimlerService
                    .Save(this.item)
                    .then(response =>
                    {
                        if (response && response.data)
                        {
                            if (response.data.status)
                            {
                                this.ShowMsg('success', response.data.message, response.data.title);
                                this.closeDialog();
                            }
                            else
                                this.ShowMsg('error', response.data.message, response.data.title);
                        }
                    })
                    .catch(error =>
                    {
                        if (error.response.data.errors)
                        {
                            Object.keys(error.response.data.errors).forEach(function (key)
                            {
                                this.ShowMsg('error', error.response.data.errors[key], error.response.data.title);
                            });
                        }
                    });
            },

            fetchData()
            {
                if (_.isUndefined(this.id))
                    return;

                OzelBirimlerService
                    .GetById(this.id)
                    .then(response =>
                    {
                        if (response && response.data)
                            this.item = response.data.data;
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