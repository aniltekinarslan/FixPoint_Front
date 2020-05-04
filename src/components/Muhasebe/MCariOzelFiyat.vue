<template>
    <div v-loading="isLoading">
        <el-dialog
                title="Özel Fiyat"
                visible="true"
                width="550px"
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
                            <el-row :gutter="15">
                                <el-col :xs="24" :lg="8">
                                    <el-form-item label="Stok Kodu">
                                        <el-input placeholder="Stok Kodu" v-model="item.StokKod" clearable readonly>
                                            <i slot="prefix" class="mdi mdi-search-web"
                                               @click="findVariant('item.StokKod')"></i>
                                        </el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :xs="24" :lg="8">
                                    <el-form-item label="Variant Kodu">
                                        <el-input placeholder="Variant Kodu" v-model="item.VariantKod" clearable
                                                  readonly>
                                            <i slot="prefix" class="mdi mdi-search-web"
                                               @click="findVariant('item.VariantKod')"></i>
                                        </el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :xs="24" :lg="8">
                                    <el-form-item label="Variant Kodu 2 (Aralık İse)">
                                        <el-input placeholder="Variant Kodu 2 (Aralık İse)" v-model="item.VariantKod2"
                                                  clearable readonly :disabled="_.isEmpty(item.VariantKod)">
                                            <i slot="prefix" class="mdi mdi-search-web"
                                               @click="findVariant('item.VariantKod2', true)"></i>
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="15">
                                <el-col :xs="24" :lg="24">
                                    <el-form-item label="Variant - Ürün Tanımı">
                                        <el-input type="text" placeholder="Variant - Ürün Tanımı"
                                                  v-model="item.variant.Tanim" disabled>
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="15">
                                <el-col :xs="6" :lg="6">
                                    <el-form-item label="Fiyat Kodu">
                                        <el-input type="text" placeholder="Fiyat Kodu"
                                                  v-model="item.FiyatKodu">
                                        </el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :xs="6" :lg="4">
                                    <el-form-item label="İskonto 1">
                                        <el-input type="number" placeholder="İskonto 1" min="0" max="100"
                                                  v-model="item.StkIsk1">
                                        </el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :xs="6" :lg="4">
                                    <el-form-item label="İskonto 2">
                                        <el-input type="number" placeholder="İskonto 2" min="0" max="100"
                                                  v-model="item.StkIsk2">
                                        </el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :xs="6" :lg="4">
                                    <el-form-item label="İskonto 3">
                                        <el-input type="number" placeholder="İskonto 3" min="0" max="100"
                                                  v-model="item.StkIsk3">
                                        </el-input>
                                    </el-form-item>
                                </el-col>


                                <el-col :xs="6" :lg="6">
                                    <el-form-item label="Tüm Vrt.larda Geçerli">
                                        <el-switch v-model="item.TumVrtlardaGecerli" :active-value="1"
                                                   :inactive-value="0"></el-switch>
                                    </el-form-item>
                                </el-col>

                            </el-row>
                            <el-row :gutter="15">
                                <el-col :xs="5" :lg="5">
                                    <el-form-item label="Birim Fiyat">
                                        <el-input type="text" placeholder="Birim Fiyat"
                                                  v-model="item.BrFiyat">
                                        </el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :xs="5" :lg="5">
                                    <el-form-item label="Döviz"
                                                  label-width="45px">
                                        <Doviz v-model="item.DovizKod"
                                               :SirketKod="item.SirketKod"></Doviz>
                                    </el-form-item>
                                </el-col>

                                <el-col :xs="5" :lg="5">
                                    <el-form-item label="Fiyat Kodu">
                                        <el-input type="text" placeholder="Fiyat Kodu"
                                                  v-model="item.FiyatKodu" clearable>
                                        </el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :xs="8" :lg="8">
                                    <el-form-item label="Kayıt Tarihi">
                                        <el-input type="text" placeholder="Kayıt Tarihi"
                                                  v-model="item.KayitTarihi" disabled>
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="15">
                                <el-col :xs="8" :lg="8">
                                    <el-form-item label="Müşteri Ürün Kodu">
                                        <el-input type="text" placeholder="Müşteri Ürün Kodu"
                                                  v-model="item.CariStokKod">
                                        </el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :xs="16" :lg="16">
                                    <el-form-item label="Müşteri Stok Adı">
                                        <el-input type="text" placeholder="Müşteri Stok Adı"
                                                  v-model="item.CariStokAdi">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="15">
                                <el-col :xs="24" :lg="24">
                                    <el-form-item label="Açıklama">
                                        <el-input type="text" placeholder="Açıklama"
                                                  v-model="item.Aciklama">
                                        </el-input>
                                    </el-form-item>
                                </el-col>

                            </el-row>

                        </div>
                    </el-col>
                    <el-col :xs="24" :lg="24" class="mt-20">
                        <el-button style="float:left;" type="info"
                                   @click="closeDialog">Vazgeç
                        </el-button>
                        <el-button style="float:right;" type="success"
                                   @click="saveMCariOzelFiyat()">
                            Özel Fiyat Kaydet
                        </el-button>
                    </el-col>
                </el-row>
            </el-form>
        </el-dialog>

        <VariantArama v-if="variantAramaVisible" visibleModel='variantAramaVisible'
                      SatisYapilabilir="true" :StokKodu="variantAramaStokKodu"></VariantArama>

    </div>
</template>

<script>
    import MCariOzelFiyatlarService from "@/services/Muhasebe/MCariOzelFiyatlar";
    import VariantArama from '@/components/Aramalar/VariantArama'
    import Doviz from '@/components/Muhasebe/Doviz'


    export default {
        name: 'MCariOzelFiyat',
        props: ['visible', 'visibleModel', 'kod', 'id', 'stokbirim'],
        data()
        {
            return {
                item: {
                    stok: {},
                    variant: {}
                },
                variantAramaVisible: false,
                variantAramaStokKodu: '',
                isLoading: false,
            }
        },
        components:
            {
                VariantArama,
                Doviz
            },

        methods: {
            closeDialog()
            {
                this.$parent[this.visibleModel] = false;
                this.$parent.fetchData();
            },

            findVariant(model, sadeceStok = false)
            {
                if(sadeceStok)
                    this.variantAramaStokKodu = this.item.StokKod;

                this.FillModel(model);
                this.variantAramaVisible = true;
            },

            saveMCariOzelFiyat()
            {
                this.item.CariKod = this.kod;
                MCariOzelFiyatlarService
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

                this.isLoading = true;

                MCariOzelFiyatlarService
                    .GetById(this.id)
                    .then(response =>
                    {
                        if (response && response.data)
                        {
                            this.item = response.data.data;
                            this.isLoading = false;
                        }
                    })
                    .catch(error =>
                    {
                        this.ShowMsg('error', error.errors, 'Hata');
                    });
            },
        },
        watch: {
            'variantAramaVisible': function (newVal, oldVal)
            {
                if (newVal === false && oldVal === true)
                {
                    var inData = this.GetInputData();
                    if (inData == null)
                        return;

                    if (inData[0] === 'item.VariantKod2')
                    {
                        if (inData[1].VariantKod === this.item.VariantKod)
                            this.item.VariantKod2 = null;
                        else
                            this.item.VariantKod2 = inData[1].VariantKod;
                    }
                    else
                    {
                        this.item.StokKod = inData[1].StokKod;
                        this.item.VariantKod = inData[1].VariantKod;
                        this.item.variant.Tanim = inData[1].Tanim;

                        if(inData[0] === 'item.VariantKod')
                        {
                            if (this.item.VariantKod === this.item.VariantKod2)
                                this.item.VariantKod2 = null;
                        }
                    }
                }
            },
        },
        mounted()
        {
            this.fetchData();
        }
    }
</script>