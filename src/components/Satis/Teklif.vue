<template>
    <div>
        <el-dialog
                visible="true"
                width="1200px"
                align="left"
                append-to-body
                :close-on-click-modal="false"
                :close-on-press-escape="true"
                @close="closeDialog"
                :before-close="closeDialogControl"
                top="5vh"
        >
            <div v-loading="loadingData">
                <el-row>
                    <el-col>
                        <div>
                            <el-button type="primary" @click="saveData" icon="mdi mdi-content-save" size="mini">
                                Kaydet
                            </el-button>
                            <el-button type="info" @click="cancelData" icon="mdi mdi-content-copy" size="mini">
                                Vazgeç
                            </el-button>
                            <el-button type="danger" @click="deleteData" icon="mdi mdi-delete" size="mini"
                                       v-if="data.id > 0">
                                Sil
                            </el-button>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-divider><b>TEKLİF BİLGİSİ</b></el-divider>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col>
                        <el-tabs type="border-card" :stretch="true" tab-position="left">
                            <el-tab-pane label="Genel Bilgiler">
                                <el-row>
                                    <el-col>
                                        <el-form label-width="92px" label-position="left">
                                            <div class="form-group">
                                                <el-row :gutter="15">
                                                    <el-col :xs="17" :lg="17">
                                                        <el-row :gutter="10">
                                                            <el-col :xs="7" :lg="7">
                                                                <el-form-item label="Teklif Tarihi" size="mini"
                                                                              label-width="75px">
                                                                    <el-input placeholder="Teklif Tarihi"
                                                                              class="input-pink"
                                                                              v-model="data.Tarih"
                                                                              :disabled="data.id > 0">
                                                                    </el-input>
                                                                </el-form-item>
                                                            </el-col>


                                                            <el-col :xs="7" :lg="7">
                                                                <el-form-item label="Durum" label-width="50px">
                                                                    <el-select v-model="data.Durum"
                                                                               placeholder="- Kayıt Durumu -"
                                                                               size="mini">
                                                                        <el-option key="Yeni Kaydediliyor"
                                                                                   value="Yeni Kaydediliyor"></el-option>
                                                                        <el-option key="Kontrol Edilecek"
                                                                                   value="Kontrol Edilecek"></el-option>
                                                                        <el-option key="Beklemede"
                                                                                   value="Beklemede"></el-option>
                                                                        <el-option key="Tekrar Düzenlenecek"
                                                                                   value="Tekrar Düzenlenecek"></el-option>
                                                                        <el-option key="Onaylanan"
                                                                                   value="Onaylanan"></el-option>
                                                                        <el-option key="Tamamlandı"
                                                                                   value="Tamamlandı"></el-option>
                                                                        <el-option key="Revize Edildi"
                                                                                   value="Revize Edildi"></el-option>
                                                                        <el-option key="İptal Edildi"
                                                                                   value="İptal Edildi"></el-option>
                                                                        <el-option key="Kapandı"
                                                                                   value="Kapandı"></el-option>
                                                                        <el-option key="Revize Edildi"
                                                                                   value="Revize Edildi"></el-option>


                                                                    </el-select>
                                                                </el-form-item>
                                                            </el-col>

                                                            <el-col :xs="5" :lg="5">
                                                                <el-form-item label-width="0">
                                                                    <span>İptal Edilmiş </span>
                                                                    <el-switch v-model="data.Iptal" active-value="E"
                                                                               active-color="#ff0000"
                                                                               inactive-value="H" disabled></el-switch>
                                                                </el-form-item>
                                                            </el-col>

                                                            <el-col :xs="5" :lg="5">
                                                                <el-form-item label-width="0">
                                                                    <span>Kapatılmış </span>
                                                                    <el-switch v-model="data.Kapan" active-value="E"
                                                                               active-color="#a83232"
                                                                               inactive-value="H" disabled></el-switch>
                                                                </el-form-item>
                                                            </el-col>
                                                        </el-row>

                                                        <el-row :gutter="10">
                                                            <el-col :xs="6" :lg="6">
                                                                <el-form-item label="Teklif Talep No" size="mini">
                                                                    <el-input placeholder="Teklif Talep No"
                                                                              class="input-pink"
                                                                              v-model="data.Nosu"
                                                                              :disabled="data.id > 0">
                                                                    </el-input>
                                                                </el-form-item>

                                                            </el-col>
                                                            <el-col :xs="7" :lg="7">
                                                                <el-form-item label="Teklif No 2" size="mini"
                                                                              label-width="70px">
                                                                    <el-input placeholder="Teklif No 2"
                                                                              class="input-pink"
                                                                              v-model="data.TeklifNo2"
                                                                              :disabled="data.id > 0">
                                                                    </el-input>
                                                                </el-form-item>

                                                            </el-col>

                                                            <el-col :xs="5" :lg="5">
                                                                <el-form-item label="SAS No" size="mini"
                                                                              label-width="55px">
                                                                    <el-input placeholder="SAS No"
                                                                              v-model="data.SAS_No">
                                                                    </el-input>
                                                                </el-form-item>

                                                            </el-col>

                                                            <el-col :xs="6" :lg="6">
                                                                <el-form-item label="Geçerlilik Günü" size="mini"
                                                                              label-width="100px">
                                                                    <el-input type="number" class="input-pink"
                                                                              v-model="data.GecerliGun">
                                                                    </el-input>
                                                                </el-form-item>
                                                            </el-col>
                                                        </el-row>

                                                        <el-row :gutter="10">
                                                            <el-col :xs="7" :lg="7">
                                                                <el-form-item label="Cari Kodu" size="mini"
                                                                              label-width="70px">
                                                                    <el-input placeholder="Firma Kodu"
                                                                              class="input-pink"
                                                                              v-model="data.FirmaKodu">
                                                                    </el-input>
                                                                </el-form-item>
                                                            </el-col>
                                                            <el-col :xs="13" :lg="13">
                                                                <el-form-item label="Cari Adı" size="mini"
                                                                              label-width="60px">
                                                                    <el-input placeholder="Firma Adı"
                                                                              v-model="data.FirmaAdi" disabled>
                                                                    </el-input>
                                                                </el-form-item>
                                                            </el-col>
                                                        </el-row>

                                                        <el-row :gutter="10">
                                                            <el-col :xs="7" :lg="7">
                                                                <el-form-item label="Sevkiyat Tarihi" size="mini"
                                                                              label-width="90px">
                                                                    <el-input placeholder="Sevkiyat Tarihi"
                                                                              class="input-pink"
                                                                              v-model="data.SevkTarihi"
                                                                              :disabled="data.id > 0">
                                                                    </el-input>
                                                                </el-form-item>
                                                            </el-col>

                                                            <el-col :xs="6" :lg="6">
                                                                <el-form-item label="Asıl Cari" size="mini"
                                                                              label-width="60px">
                                                                    <el-input placeholder="Asıl Firma Kodu"
                                                                              class="input-pink"
                                                                              v-model="data.AsilCariKod">
                                                                    </el-input>
                                                                </el-form-item>

                                                            </el-col>
                                                            <el-col :xs="11" :lg="11">
                                                                <el-form-item label="Asıl Cari Adı" size="mini"
                                                                              label-width="80px">
                                                                    <el-input placeholder="Asıl Firma Adı"
                                                                              v-model="data.AsilCariAdi" disabled>
                                                                    </el-input>
                                                                </el-form-item>
                                                            </el-col>

                                                        </el-row>


                                                    </el-col>
                                                </el-row>

                                            </div>
                                        </el-form>
                                    </el-col>
                                </el-row>
                            </el-tab-pane>
                            <el-tab-pane label="Finansal Bilgiler">

                            </el-tab-pane>
                            <el-tab-pane label="Sevk Bilgileri">

                            </el-tab-pane>
                            <el-tab-pane label="Dökümanlar">

                            </el-tab-pane>
                            <el-tab-pane label="Görüşme Bilgileri">

                            </el-tab-pane>
                        </el-tabs>
                    </el-col>
                </el-row>
            </div>
        </el-dialog>

        <HesapPlaniArama v-if="hesapPlaniAramaVisible" visibleModel='hesapPlaniAramaVisible'></HesapPlaniArama>

    </div>
</template>

<script>
    import TekliflerService from "@/services/Satis/Teklifler";
    import Doviz from '@/components/Muhasebe/Doviz'
    import HesapPlaniArama from '@/components/Aramalar/HesapPlaniArama'

    export default {
        name: 'MTeklif',
        props: ['visible', 'TeklifNo', 'visibleModel'],
        components:
            {
                Doviz,
                HesapPlaniArama
            },
        data()
        {
            return {
                loadingData: true,
                data: {},
                dataCloned: {},
                dItem: {},
                ozelFiyatlarVisible: false,
                hesapPlaniAramaVisible: false
            }
        },
        methods: {
            findHesapPlani(model)
            {
                this.FillModel(model);
                this.hesapPlaniAramaVisible = true;
            },

            closeDialogControl(done)
            {
                if (!this.CompareObject(this.data, this.dataCloned))
                {
                    this.ShowMsg('error', 'Sayfada kaydedilmemiş değişiklikler var! Devam etmek için kaydedin veya vazgeçin.', 'Hata');
                    return false;
                }

                done();
            },

            closeDialog()
            {
                this.$parent[this.visibleModel] = false;
            },

            fetchData()
            {
                if (_.isUndefined(this.TeklifNo))
                {
                    this.loadingData = false;
                    return;
                }

                TekliflerService
                    .GetById(this.TeklifNo)
                    .then(response =>
                    {
                        if (response && response.data)
                        {
                            this.data = response.data.data;
                            this.dataCloned = _.cloneDeep(this.data);
                            this.$parent.fetchData(-1);
                            this.loadingData = false;
                        }
                    })
                    .catch(error =>
                    {
                        this.loadingData = false;
                    });
            },

            saveData()
            {
                if (_.isEmpty(this.data.TeklifNo) || _.isEmpty(this.data.TeklifAdi))
                {
                    this.ShowMsg('error', 'Teklif Kodu ve Teklif Adı girmelisiniz!', 'Hata');
                    return;
                }

                if (_.isEmpty(this.data.TeklifHesapTipi))
                {
                    this.ShowMsg('error', 'Hesap Tipi girmelisiniz!', 'Hata');
                    return;
                }

                if (_.isEmpty(this.data.YurtIciDisi))
                {
                    this.ShowMsg('error', 'Yurtiçi/Yurtışı Seçimi yapınız', 'Hata');
                    return;
                }


                this.loadingData = true;

                TekliflerService
                    .Save(this.data)
                    .then(response =>
                    {
                        if (response && response.data)
                        {
                            if (response.data.status)
                            {
                                this.ShowMsg('success', response.data.message, response.data.title);
                                this.TeklifNo = response.data.data.TeklifNo;
                                this.fetchData();
                            }
                            else
                            {
                                this.ShowMsg('error', response.data.message, response.data.title);
                                this.loadingData = false;
                            }
                        }

                    })
                    .catch(error =>
                    {
                        this.loadingData = false;
                    });
            },

            cancelData()
            {
                this.data = _.cloneDeep(this.dataCloned);
            },

            deleteData()
            {
                if (_.isNull(this.data.id))
                    return;

                this.loadingData = true;

                this.$dialog.confirm('<span class="dg-icon"></span>' + ' (' + this.data.TeklifNo + ') ' + ' Silmek istediğinizden emin misiniz?', {
                    okText: 'Evet',
                    cancelText: 'Hayır'
                })
                    .then((dialog) =>
                    {
                        TekliflerService
                            .DeleteById(this.data.id)
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
                                dialog.close();
                            })
                            .catch(error =>
                            {
                                console.log(error);
                                dialog.close();
                            });

                        this.loadingData = false;
                    })
                    .catch(() =>
                    {
                        console.log('Clicked on cancel')
                    });
            },

            openDialog(item)
            {
                if (!this.CompareObject(this.data, this.dataCloned))
                {
                    this.ShowMsg('error', 'Sayfada kaydedilmemiş değişiklikler var! Devam etmek için kaydedin veya vazgeçin.', 'Hata');
                    return;
                }

                this.dItem = item;
                this.ozelFiyatlarVisible = true;
            },

            selectItem(row)
            {
                this.openDialog(row);
            },


        }
        ,

        mounted()
        {
            if (_.isUndefined(this.TeklifNo))
            {
                this.data = {
                    Aktif: 1,
                    KaraListe: 'Normal'
                };
                this.dataCloned = _.cloneDeep(this.data);
                this.loadingData = false;
            }
            else
                this.fetchData();
        }
        ,

        watch: {
            'hesapPlaniAramaVisible':

                function (newVal, oldVal)
                {
                    if (newVal === false && oldVal === true)
                    {
                        var inData = this.GetInputData();
                        if (inData == null)
                            return;

                        this.data.HesapKod = inData[1].HesapKod;
                    }
                }
        }
    }
</script>