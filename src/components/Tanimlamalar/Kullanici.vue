<template>
    <div>
        <el-dialog
                :visible="visible"
                width="70%"
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
                        <el-divider><b>KULLANICI</b></el-divider>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form label-width="92px" label-position="left">
                            <div class="form-group">
                                <el-row :gutter="15">
                                    <el-col :xs="11" :lg="11">
                                        <el-row :gutter="10">
                                            <el-col :xs="9" :lg="9">
                                                <el-form-item label="Kullanıcı Kodu" size="mini">
                                                    <el-input placeholder="Kullanıcı Kodu"
                                                              v-model="data.SicilNo" :disabled="data.id > 0"
                                                              clearable></el-input>
                                                </el-form-item>
                                            </el-col>

                                            <el-col :xs="4" :lg="4">
                                                <el-checkbox v-model="data.Aktif" label="Aktif" border size="mini"
                                                             :true-label="1" :false-label="0">
                                                </el-checkbox>
                                            </el-col>

                                            <el-col :xs="10" :lg="10" label-wid>
                                                <el-form-item label="Şifre" size="mini" label-width="67px">
                                                    <el-input minlength="1" maxlength="15"
                                                              placeholder="Şifre" v-model="data.Sifre"
                                                              clearable></el-input>
                                                </el-form-item>
                                            </el-col>

                                            <el-col :xs="12" :lg="12">
                                                <el-form-item label="Adı Soyadı" size="mini">
                                                    <el-input placeholder="Kullanıcı Adı Soyadı" v-model="data.Isim"
                                                              clearable></el-input>
                                                </el-form-item>
                                            </el-col>

                                            <el-col :xs="9" :lg="9">
                                                <el-form-item label="TC Kimlik No" size="mini">
                                                    <el-input maxlength="11" minlength="11"
                                                              placeholder="TC Kimlik No" v-model="data.TcKimlikNo"
                                                              clearable></el-input>
                                                </el-form-item>
                                            </el-col>

                                            <el-col :xs="12" :lg="12">
                                                <el-form-item label="Eposta" size="mini">
                                                    <el-input placeholder="Eposta" v-model="data.EPosta"
                                                              clearable></el-input>
                                                </el-form-item>
                                            </el-col>

                                            <el-col :xs="11" :lg="11">
                                                <el-form-item label="Görevi" size="mini">
                                                    <el-input placeholder="Görevi" v-model="data.Gorevi"
                                                              clearable></el-input>
                                                </el-form-item>
                                            </el-col>

                                            <el-col :xs="10" :lg="10">
                                                <el-form-item label="Çalıştığı Bölüm" size="mini">
                                                    <el-input placeholder="Çalıştığı Bölüm"
                                                              v-model="data.CalistigiBolum"
                                                              clearable></el-input>
                                                </el-form-item>
                                            </el-col>

                                        </el-row>

                                        <el-row :gutter="10">

                                        </el-row>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-form>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-tabs type="border-card" :stretch="true" tab-position="left">
                            <el-tab-pane label="Genel Yetkiler">
                            </el-tab-pane>
                            <el-tab-pane label="Satınalma Yetkileri">
                            </el-tab-pane>
                            <el-tab-pane label="Satış Yetkileri">
                            </el-tab-pane>
                            <el-tab-pane label="Üretim Yetkileri">
                            </el-tab-pane>
                            <el-tab-pane label="Kalite Yetkileri">
                            </el-tab-pane>
                        </el-tabs>
                    </el-col>
                </el-row>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import KullanicilarService from "@/services/Tanimlamalar/Kullanicilar";

    export default {
        name: 'Kullanici',
        props: ['visible', 'SicilNo'],
        components:
            {},
        data()
        {
            return {
                loadingData: true,
                data: {},
                dataCloned: {},
                dItem: {},
            }
        },
        methods: {
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
                this.$parent.kullaniciVisible = false
            },

            fetchData()
            {
                if (_.isUndefined(this.SicilNo))
                {
                    this.loadingData = false;
                    return;
                }

                KullanicilarService
                    .GetById(this.SicilNo)
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
                        if (error.response.data.errors)
                        {
                            Object.keys(error.response.data.errors).forEach(function (key)
                            {
                                this.ShowMsg('error', error.response.data.errors[key], error.response.data.title);
                            });
                        }
                    });
            },

            saveData()
            {
                if (_.isEmpty(this.data.SicilNo) || _.isEmpty(this.data.Isim))
                {
                    this.ShowMsg('error', 'Kullanıcı Kodu ve Kullanıcı Adı girmelisiniz!', 'Hata');
                    return;
                }

                KullanicilarService
                    .Save(this.data)
                    .then(response =>
                    {
                        if (response && response.data)
                        {
                            if (response.data.status)
                            {
                                this.ShowMsg('success', response.data.message, response.data.title);
                                this.SicilNo = response.data.data.SicilNo;
                                this.fetchData();
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

            cancelData()
            {
                this.data = _.cloneDeep(this.dataCloned);
            },

            deleteData()
            {
                if (_.isNull(this.data.id))
                    return;

                this.$dialog.confirm('<span class="dg-icon"></span>' + ' (' + this.data.SicilNo + ') ' + ' Silmek istediğinizden emin misiniz?', {
                    okText: 'Evet',
                    cancelText: 'Hayır'
                })
                    .then((dialog) =>
                    {
                        KullanicilarService
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
            },

            selectItem(row)
            {
                this.openDialog(row);
            },


        },

        watch: {},

        mounted()
        {
            if (_.isUndefined(this.SicilNo))
            {
                this.data = {
                    Aktif: 1,
                };
                this.dataCloned = _.cloneDeep(this.data);
                this.loadingData = false;
            }
            else
                this.fetchData();
        }
    }
</script>