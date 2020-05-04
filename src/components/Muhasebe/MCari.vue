<template>
    <div>
        <el-dialog
                :visible.sync="visible"
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
                        <el-divider><b>CARİ BİLGİSİ</b></el-divider>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form label-width="92px" label-position="left">
                            <div class="form-group">
                                <el-row :gutter="15">
                                    <el-col :xs="12" :lg="12">
                                        <el-row :gutter="10">
                                            <el-col :xs="7" :lg="7">
                                                <el-form-item label="Cari Kodu" size="mini" label-width="70px">
                                                    <el-input placeholder="Cari Kodu"
                                                              v-model="data.CariKod" :disabled="data.id > 0" clearable>
                                                    </el-input>
                                                </el-form-item>
                                            </el-col>

                                            <el-col :xs="13" :lg="13">
                                                <el-form-item label="Cari Tanımı" size="mini" label-width="75px">
                                                    <el-input placeholder="Cari Tanımı" v-model="data.CariAdi"
                                                              clearable></el-input>
                                                </el-form-item>
                                            </el-col>

                                            <el-col :xs="4" :lg="4">
                                                <el-checkbox v-model="data.Aktif" label="Aktif" border size="mini"
                                                             :true-label="1" :false-label="0">
                                                </el-checkbox>
                                            </el-col>
                                        </el-row>
                                    </el-col>

                                    <el-col :xs="12" :lg="12">
                                        <el-row :gutter="10">
                                            <el-col :xs="9" :lg="9">
                                                <el-form-item label="Cari Hesap Tipi" size="mini" label-width="95px">

                                                    <el-select v-model="data.CariHesapTipi" placeholder="- Seçin -">
                                                        <el-option key="Müşteri" value="Müşteri"></el-option>
                                                        <el-option key="Tedarikçi" value="Tedarikçi"></el-option>
                                                        <el-option key="Müşteri+Tedarikçi"
                                                                   value="Müşteri+Tedarikçi"></el-option>
                                                    </el-select>

                                                </el-form-item>
                                            </el-col>

                                        </el-row>

                                    </el-col>
                                </el-row>

                                <el-row :gutter="15">
                                    <el-col :xs="12" :lg="12">
                                        <el-row :gutter="10">

                                            <el-col :xs="8" :lg="8">
                                                <el-form-item label="Çalışma Durumu" size="mini" label-width="110px">
                                                    <el-select v-model="data.KaraListe" placeholder="- Seçin -">
                                                        <el-option key="Normal" value="Normal"></el-option>
                                                        <el-option key="Kontrol Altında"
                                                                   value="Kontrol Altında"></el-option>
                                                        <el-option key="Sevkiyat Yaptırma"
                                                                   value="Sevkiyat Yaptırma"></el-option>
                                                        <el-option key="Siparişi Durdur"
                                                                   value="Siparişi Durdur"></el-option>
                                                        <el-option key="Kara Listede" value="Kara Listede"></el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </el-col>

                                            <el-col :xs="15" :lg="15">
                                                <el-form-item label="Durum Açıklaması" size="mini" label-width="110px">
                                                    <el-input placeholder="" :disabled="data.KaraListe === 'Normal'"
                                                              v-model="data.KaraListeAciklama"
                                                              clearable></el-input>
                                                </el-form-item>
                                            </el-col>


                                        </el-row>
                                    </el-col>

                                    <el-col :xs="12" :lg="12">
                                        <el-row :gutter="10">
                                            <el-col :xs="9" :lg="9">
                                                <el-form-item label="Yurtiçi/Yurtdışı" size="mini" label-width="95px">
                                                    <el-select v-model="data.YurtIciDisi" placeholder="- Seçin -">
                                                        <el-option key="YURTİÇİ" value="YURTİÇİ"></el-option>
                                                        <el-option key="YURTDIŞI" value="YURTDIŞI"></el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </el-col>

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
                            <el-tab-pane label="Cari Kart Bilgileri">
                                <el-form label-width="92px" label-position="left">
                                    <div class="form-group">
                                        <el-row>
                                            <el-col :xs="10" :lg="10">
                                                <el-row :gutter="10">
                                                    <el-col :xs="11" :lg="11">
                                                        <el-form-item label="Kısa Adı" size="mini"
                                                                      label-width="66px">
                                                            <el-input placeholder="Kısa Adı"
                                                                      v-model="data.KisaCariAdi">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>

                                                    <el-col :xs="12" :lg="12">
                                                        <el-form-item label="Grup Tanımı" size="mini"
                                                                      label-width="85px">
                                                            <el-input placeholder="Grup Tanımı"
                                                                      v-model="data.GrupTanimi">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>
                                                <el-row :gutter="10">
                                                    <el-col :xs="11" :lg="11">
                                                        <el-form-item label="Yetkili Kişi" size="mini"
                                                                      label-width="66px">
                                                            <el-input placeholder="Yetkili Kişi"
                                                                      v-model="data.AnaYetkiliAdi">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>

                                                    <el-col :xs="12" :lg="12">
                                                        <el-form-item label="E-Fatura Tipi" size="mini"
                                                                      label-width="85px">
                                                            <el-select v-model="data.EFaturaProfileIDType"
                                                                       placeholder="- Seçin -">
                                                                <el-option key="TEMELFATURA"
                                                                           value="TEMEL FATURA"></el-option>
                                                                <el-option key="TICARIFATURA"
                                                                           value="TİCARİ FATURA"></el-option>
                                                            </el-select>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>
                                                <el-row :gutter="10">
                                                    <el-col :xs="8" :lg="8">
                                                        <el-form-item label="Döviz" size="mini"
                                                                      label-width="66px">
                                                            <Doviz v-model="data.DovizKod"
                                                                   :SirketKod="data.SirketKod"></Doviz>
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :xs="2" :lg="2">
                                                        <el-form-item label="">
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :xs="13" :lg="13">
                                                        <el-form-item label="Muh. Hesap Kodu" size="mini"
                                                                      label-width="107px">
                                                            <el-input placeholder="Muhasebe Hesap Kodu"
                                                                      class="input-green"
                                                                      v-model="data.HesapKod" readonly>
                                                                <i slot="prefix" class="mdi mdi-search-web"
                                                                   @click="findHesapPlani('data.HesapKod')"></i>
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>

                                                </el-row>
                                                <el-row :gutter="10">
                                                    <el-col :xs="18" :lg="18">
                                                        <el-form-item label="Fatura Adresi" size="mini"
                                                                      label-width="110px">
                                                            <el-input placeholder="Fatura Adresi" maxlength="30"
                                                                      v-model="data.FatAdres1">
                                                            </el-input>
                                                            <el-input placeholder="" maxlength="30"
                                                                      v-model="data.FatAdres2">
                                                            </el-input>
                                                            <el-input placeholder="" maxlength="30"
                                                                      v-model="data.FatAdres3">
                                                            </el-input>
                                                            <el-input placeholder="" maxlength="30"
                                                                      v-model="data.FatAdres4">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>
                                                <el-row :gutter="10">
                                                    <el-col :xs="11" :lg="11">
                                                        <el-form-item label="Fatura Ülke" size="mini"
                                                                      label-width="110px">
                                                            <el-input placeholder="Ülke" maxlength="30"
                                                                      v-model="data.Ulke">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :xs="6" :lg="6">
                                                        <el-form-item label="İl" size="mini"
                                                                      label-width="20px">
                                                            <el-input placeholder="İl" maxlength="30"
                                                                      v-model="data.Sehir">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :xs="7" :lg="7">
                                                        <el-form-item label="İlçe" size="mini"
                                                                      label-width="35px">
                                                            <el-input placeholder="İlçe" maxlength="30"
                                                                      v-model="data.Ilce">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>

                                                <el-row :gutter="10">
                                                    <el-col :xs="11" :lg="11">
                                                        <el-form-item label="Posta Kodu" size="mini"
                                                                      label-width="110px">
                                                            <el-input placeholder="Posta Kodu" maxlength="5"
                                                                      v-model="data.PostaKodu">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>

                                                </el-row>

                                                <el-row :gutter="10">
                                                    <el-col :xs="16" :lg="16">
                                                        <el-form-item label="Eposta" size="mini"
                                                                      label-width="110px">
                                                            <el-input placeholder="Eposta" maxlength="100"
                                                                      v-model="data.EPosta">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>

                                                </el-row>

                                                <el-row :gutter="10">
                                                    <el-col :xs="16" :lg="16">
                                                        <el-form-item label="Mutabakat Eposta" size="mini"
                                                                      label-width="110px">
                                                            <el-input placeholder="Mutabakat Eposta"
                                                                      maxlength="100"
                                                                      v-model="data.MutabakatMail">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>

                                                </el-row>

                                                <el-row :gutter="10">
                                                    <el-col :xs="16" :lg="16">
                                                        <el-form-item label="Web Sitesi" size="mini"
                                                                      label-width="110px">
                                                            <el-input placeholder="Web Sitesi" maxlength="50"
                                                                      v-model="data.WWWAdres">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>

                                                </el-row>
                                            </el-col>

                                            <el-col :xs="3" :lg="3">
                                                <el-row>
                                                    <el-col :xs="24" :lg="24">
                                                        <el-form-item size="mini" label-width="0">
                                                            <el-button type="primary" plain>1. Bakiye</el-button>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>
                                                <el-row>
                                                    <el-col :xs="24" :lg="24">
                                                        <el-form-item size="mini" label-width="0">
                                                            <el-button type="primary" plain>2. Ekstre</el-button>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>
                                                <el-row>
                                                    <el-col :xs="24" :lg="24">
                                                        <el-form-item size="mini" label-width="0">
                                                            <el-button type="primary" plain>3. Hesap Özeti</el-button>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>
                                                <el-row>
                                                    <el-col :xs="24" :lg="24">
                                                        <el-form-item size="mini" label-width="0">
                                                            <el-button type="primary" plain>4. Açıklamalar
                                                            </el-button>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>
                                                <el-row>
                                                    <el-col :xs="24" :lg="24">
                                                        <el-form-item size="mini" label-width="0">
                                                            <el-button type="primary" plain>5. Stoklu Ekstre
                                                            </el-button>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>
                                            </el-col>

                                            <el-col :xs="11" :lg="11">
                                                <el-row :gutter="10">
                                                    <el-col :xs="12" :lg="12">
                                                        <el-form-item label="Vergi Dairesi" size="mini"
                                                                      label-width="80px">
                                                            <el-input placeholder="Vergi Dairesi" maxlength="30"
                                                                      v-model="data.VergiDaire">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :xs="12" :lg="12">
                                                        <el-form-item label="Şahıs İse Adı" size="mini"
                                                                      label-width="82px">
                                                            <el-input placeholder="Şahıs İse Adı" maxlength="40"
                                                                      v-model="data.SahisAdi1">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>

                                                <el-row :gutter="10">
                                                    <el-col :xs="12" :lg="12">
                                                        <el-form-item label="Vergi/TC No" size="mini"
                                                                      label-width="80px">
                                                            <el-input placeholder="Vergi/TC No"
                                                                      maxlength="25"
                                                                      v-model="data.VergiNo">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :xs="12" :lg="12">
                                                        <el-form-item label="İkinci Adı" size="mini"
                                                                      label-width="80px">
                                                            <el-input placeholder="İkinci Adı" maxlength="40"
                                                                      v-model="data.SahisAdi2">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>

                                                <el-row :gutter="10">
                                                    <el-col :xs="12" :lg="12">
                                                        <el-form-item label="Sektörü" size="mini"
                                                                      label-width="80px">
                                                            <el-input placeholder="Sektörü" maxlength="40"
                                                                      v-model="data.Sektor">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :xs="12" :lg="12">
                                                        <el-form-item label="Soyadı" size="mini"
                                                                      label-width="80px">
                                                            <el-input placeholder="Soyadı" maxlength="40"
                                                                      v-model="data.SahisAdi2">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>

                                                <el-row :gutter="10">
                                                    <el-col :xs="12" :lg="12">
                                                        <el-form-item label="Bölge Kodu" size="mini"
                                                                      label-width="80px">
                                                            <el-input placeholder="Bölge Kodu" maxlength="10"
                                                                      v-model="data.BolgeKod">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :xs="7" :lg="7">
                                                        <el-form-item label="N.Cüzdan Seri" size="mini"
                                                                      label-width="90px">
                                                            <el-input placeholder="Seri" maxlength="5"
                                                                      v-model="data.TC_Seriii">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>

                                                    <el-col :xs="5" :lg="5">
                                                        <el-form-item size="mini" label-width="0px">
                                                            <el-input placeholder="No" maxlength="10"
                                                                      v-model="data.TC_SeriNo">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>

                                                <el-row :gutter="10">
                                                    <el-col :xs="12" :lg="12">
                                                        <el-form-item label="Satıcı Kodu" size="mini"
                                                                      label-width="80px">
                                                            <el-input placeholder="Satıcı Kodu" maxlength="10"
                                                                      v-model="data.SaticiKod">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :xs="12" :lg="12">
                                                        <el-form-item label="Doğum Yeri" size="mini"
                                                                      label-width="90px">
                                                            <el-input placeholder="Doğum Yeri" maxlength="20"
                                                                      v-model="data.TC_DogumYeri">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>

                                                <el-row :gutter="10">
                                                    <el-col :xs="12" :lg="12">
                                                        <el-form-item label="Özel Kod 1" size="mini"
                                                                      label-width="80px">
                                                            <el-input placeholder="Özel Kod 1" maxlength="10"
                                                                      v-model="data.OzelKod1">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :xs="12" :lg="12">
                                                        <el-form-item label="Doğum Tarihi" size="mini"
                                                                      label-width="90px">
                                                            <el-input placeholder="Doğum Tarihi" maxlength="40"
                                                                      v-model="data.TC_DogumYeri">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>


                                                <el-row :gutter="10">
                                                    <el-col :xs="12" :lg="12">
                                                        <el-form-item label="Özel Kod 2" size="mini"
                                                                      label-width="80px">
                                                            <el-input placeholder="Özel Kod 2" maxlength="10"
                                                                      v-model="data.OzelKod2">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :xs="12" :lg="12">
                                                        <el-form-item label="Cilt No" size="mini"
                                                                      label-width="90px">
                                                            <el-input placeholder="Cilt No" maxlength="10"
                                                                      v-model="data.TC_CiltNo">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>

                                                <el-row :gutter="10">
                                                    <el-col :xs="12" :lg="12">
                                                        <el-form-item label="Özel Kod 3" size="mini"
                                                                      label-width="80px">
                                                            <el-input placeholder="Özel Kod 3" maxlength="10"
                                                                      v-model="data.OzelKod3">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :xs="12" :lg="12">
                                                        <el-form-item label="Aile Sıra No" size="mini"
                                                                      label-width="90px">
                                                            <el-input placeholder="Aile Sıra No" maxlength="10"
                                                                      v-model="data.TC_AileSiraNo">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>


                                                <el-row :gutter="10">
                                                    <el-col :xs="12" :lg="12">
                                                        <el-form-item label="Özel Kod 4" size="mini"
                                                                      label-width="80px">
                                                            <el-input placeholder="Özel Kod 4" maxlength="10"
                                                                      v-model="data.OzelKod4">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :xs="12" :lg="12">
                                                        <el-form-item label="Aile Sıra No" size="mini"
                                                                      label-width="90px">
                                                            <el-input placeholder="Aile Sıra No" maxlength="10"
                                                                      v-model="data.TC_AileSiraNo">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>


                                                <el-row :gutter="10">
                                                    <el-col :xs="12" :lg="12">
                                                        <el-form-item label="Özel Kod 5" size="mini"
                                                                      label-width="80px">
                                                            <el-input placeholder="Özel Kod 5" maxlength="10"
                                                                      v-model="data.OzelKod5">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :xs="12" :lg="12">

                                                    </el-col>
                                                </el-row>


                                                <el-row :gutter="10">
                                                    <el-col :xs="12" :lg="12">
                                                        <el-form-item label="Özel Kod 6" size="mini"
                                                                      label-width="80px">
                                                            <el-input placeholder="Özel Kod 6" maxlength="10"
                                                                      v-model="data.OzelKod6">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :xs="12" :lg="12">

                                                    </el-col>
                                                </el-row>


                                                <el-row :gutter="10">
                                                    <el-col :xs="12" :lg="12">
                                                        <el-form-item label="Özel Kod 7" size="mini"
                                                                      label-width="80px">
                                                            <el-input placeholder="Özel Kod 7" maxlength="10"
                                                                      v-model="data.OzelKod7">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :xs="12" :lg="12">

                                                    </el-col>
                                                </el-row>


                                                <el-row :gutter="10">
                                                    <el-col :xs="12" :lg="12">
                                                        <el-form-item label="Özel Kod 8" size="mini"
                                                                      label-width="80px">
                                                            <el-input placeholder="Özel Kod 8" maxlength="10"
                                                                      v-model="data.OzelKod8">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :xs="12" :lg="12">

                                                    </el-col>
                                                </el-row>


                                                <el-row :gutter="10">
                                                    <el-col :xs="12" :lg="12">
                                                        <el-form-item label="Telefon 1" size="mini"
                                                                      label-width="80px">
                                                            <el-input placeholder="Telefon 1" maxlength="50"
                                                                      v-model="data.Tel1">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :xs="12" :lg="12">
                                                        <el-form-item label="Ticaret Sicil No" size="mini"
                                                                      label-width="95px">
                                                            <el-input placeholder="Ticaret Sicil No" maxlength="20"
                                                                      v-model="data.TICARETSICILNO">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>


                                                <el-row :gutter="10">
                                                    <el-col :xs="12" :lg="12">
                                                        <el-form-item label="Telefon 2" size="mini"
                                                                      label-width="80px">
                                                            <el-input placeholder="Telefon 2" maxlength="50"
                                                                      v-model="data.Tel2">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :xs="12" :lg="12">
                                                        <el-form-item label="Mersis No" size="mini"
                                                                      label-width="95px">
                                                            <el-input placeholder="Mersis No" maxlength="30"
                                                                      v-model="data.MERSISNO">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>

                                                <el-row :gutter="10">
                                                    <el-col :xs="12" :lg="12">
                                                        <el-form-item label="Dahili No'lar" size="mini"
                                                                      label-width="80px">
                                                            <el-input placeholder="Dahili No'lar" maxlength="20"
                                                                      v-model="data.DahiliTelNo">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :xs="12" :lg="12">
                                                        <el-form-item label="Sermayesi" size="mini"
                                                                      label-width="95px">
                                                            <el-input type="number" placeholder="Sermayesi"
                                                                      maxlength="20"
                                                                      v-model="data.Sermaye">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>


                                                <el-row :gutter="10">
                                                    <el-col :xs="12" :lg="12">
                                                        <el-form-item label="Fax" size="mini"
                                                                      label-width="80px">
                                                            <el-input placeholder="Fax" maxlength="50"
                                                                      v-model="data.Fax">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :xs="12" :lg="12">
                                                        <el-form-item label="Kuruluş Tarihi" size="mini"
                                                                      label-width="95px">
                                                            <el-input placeholder="Kuruluş Tarihi" maxlength="30"
                                                                      v-model="data.KurulusTarihi">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>

                                                <el-row :gutter="10">
                                                    <el-col :xs="12" :lg="12">
                                                        <el-form-item label="İletişim Durumu" size="mini"
                                                                      label-width="100px">
                                                            <el-input placeholder="İletişim Durumu" maxlength="50"
                                                                      v-model="data.IletisimDurumu">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :xs="12" :lg="12">

                                                    </el-col>
                                                </el-row>

                                            </el-col>
                                        </el-row>
                                    </div>
                                </el-form>
                            </el-tab-pane>
                            <el-tab-pane label="Diğer Bilgiler">
                                <el-form label-width="92px" label-position="left">
                                    <div class="form-group">
                                        <el-row>
                                            <el-col :xs="12" :lg="12">

                                                <el-row :gutter="10">
                                                    <el-col :xs="14" :lg="14">
                                                        <el-form-item label="Sevk Adresi" size="mini"
                                                                      label-width="85px">
                                                            <el-input placeholder="Sevk Adresi" maxlength="30"
                                                                      v-model="data.Adres1">
                                                            </el-input>
                                                            <el-input placeholder="" maxlength="30"
                                                                      v-model="data.Adres2">
                                                            </el-input>
                                                            <el-input placeholder="" maxlength="30"
                                                                      v-model="data.Adres3">
                                                            </el-input>
                                                            <el-input placeholder="" maxlength="100"
                                                                      v-model="data.Adres4">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>
                                                <el-row :gutter="10">
                                                    <el-col :xs="9" :lg="9">
                                                        <el-form-item label="Sevk Ülke" size="mini"
                                                                      label-width="110px">
                                                            <el-input placeholder="Sevk Ülke" maxlength="30"
                                                                      v-model="data.SevkUlke">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :xs="5" :lg="5">
                                                        <el-form-item label="İl" size="mini"
                                                                      label-width="20px">
                                                            <el-input placeholder="İl" maxlength="30"
                                                                      v-model="data.Sevkil">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :xs="6" :lg="6">
                                                        <el-form-item label="İlçe" size="mini"
                                                                      label-width="35px">
                                                            <el-input placeholder="İlçe" maxlength="30"
                                                                      v-model="data.Sevkilce">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>

                                                <el-row :gutter="10">
                                                    <el-col :xs="12" :lg="12">
                                                        <el-form-item label="Banka/Şube Kodu" size="mini"
                                                                      label-width="110px">
                                                            <el-input placeholder="Banka/Şube Kodu" maxlength="20"
                                                                      v-model="data.BankaKod">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>

                                                    <el-col :xs="6" :lg="6">
                                                        <el-form-item size="mini" label-width="0px">
                                                            <el-input placeholder="Şube Kodu" maxlength="20"
                                                                      v-model="data.BankaSube">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>

                                                </el-row>

                                                <el-row :gutter="10">
                                                    <el-col :xs="12" :lg="12">
                                                        <el-form-item label="Banka Hesap No" size="mini"
                                                                      label-width="110px">
                                                            <el-input placeholder="Banka Hesap No" maxlength="20"
                                                                      v-model="data.BankaHesap">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>

                                                </el-row>

                                                <el-row :gutter="10">
                                                    <el-col :xs="14" :lg="14">
                                                        <el-form-item label="IBAN No" size="mini"
                                                                      label-width="110px">
                                                            <el-input placeholder="IBAN No"
                                                                      maxlength="40"
                                                                      v-model="data.IBANNO">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>

                                                </el-row>

                                                <el-row :gutter="10">
                                                    <el-col :xs="12" :lg="12">
                                                        <el-form-item label="Kredi Kart No" size="mini"
                                                                      label-width="110px">
                                                            <el-input placeholder="Kredi Kart No"
                                                                      maxlength="30"
                                                                      v-model="data.KrediKartNo">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>

                                                    <el-col :xs="4" :lg="4">
                                                        <el-checkbox v-model="data.IsoBelgesiVar"
                                                                     label="ISO Belgesi Var" border size="mini"
                                                                     :true-label="1" :false-label="0">
                                                        </el-checkbox>
                                                    </el-col>
                                                </el-row>

                                                <el-row :gutter="10">
                                                    <el-col :xs="14" :lg="14">
                                                        <el-form-item label="Son Kullanma Tarihi" size="mini"
                                                                      label-width="120px">
                                                            <el-input placeholder="Son Kullanma Tarihi"
                                                                      maxlength="30"
                                                                      v-model="data.KrediKartSonTarih">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>

                                                </el-row>
                                            </el-col>

                                            <el-col :xs="11" :lg="11">

                                                <el-row :gutter="10">
                                                    <el-col :xs="24" :lg="24">
                                                        <el-form-item label="Açıklama" size="mini"
                                                                      label-width="85px">
                                                            <el-input
                                                                    type="textarea"
                                                                    :autosize="{ minRows: 4, maxRows: 4}"
                                                                    placeholder="Please input"
                                                                    v-model="data.Aciklama"
                                                                    maxlength="500"
                                                                    show-word-limit>
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>

                                                <el-row :gutter="10">
                                                    <el-col :xs="10" :lg="10">
                                                        <el-form-item label="Eski Cari Kod" size="mini"
                                                                      label-width="85px">
                                                            <el-input placeholder="Eski Cari Kod"
                                                                      maxlength="25"
                                                                      v-model="data.EskiCariKod">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>

                                                <el-row :gutter="10">
                                                    <el-col :xs="12" :lg="12">
                                                        <el-form-item label="Nakliye Şekli" size="mini"
                                                                      label-width="85px">
                                                            <el-input placeholder="Nakliye Şekli"
                                                                      maxlength="120"
                                                                      v-model="data.Nakliye">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>

                                                <el-row :gutter="10">
                                                    <el-col :xs="12" :lg="12">
                                                        <el-form-item label="Teslim Şekli" size="mini"
                                                                      label-width="85px">
                                                            <el-input placeholder="Teslim Şekli"
                                                                      maxlength="120"
                                                                      v-model="data.Teslim">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>

                                                <el-row :gutter="10">
                                                    <el-col :xs="12" :lg="12">
                                                        <el-form-item label="Varış Yeri" size="mini"
                                                                      label-width="85px">
                                                            <el-input placeholder="Varış Yeri"
                                                                      maxlength="120"
                                                                      v-model="data.VarisYeri">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>

                                                <el-row :gutter="10">
                                                    <el-col :xs="12" :lg="12">
                                                        <el-form-item label="Ödeme Şekli" size="mini"
                                                                      label-width="85px">
                                                            <el-input placeholder="Ödeme Şekli"
                                                                      maxlength="120"
                                                                      v-model="data.Odeme">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>


                                                <el-row :gutter="10">
                                                    <el-col :xs="12" :lg="12">
                                                        <el-form-item label="Ödeme Tarihi" size="mini"
                                                                      label-width="85px">
                                                            <el-input placeholder="Ödeme Tarihi"
                                                                      maxlength="120"
                                                                      v-model="data.OdemeTarihi">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>

                                            </el-col>
                                        </el-row>
                                    </div>
                                </el-form>
                            </el-tab-pane>
                            <el-tab-pane label="Limit ve Fiyatlar">
                                <el-form label-width="92px" label-position="left">
                                    <div class="form-group">
                                        <el-row>
                                            <el-col :xs="11" :lg="11">
                                                <el-row :gutter="10">
                                                    <el-col :xs="12" :lg="12">
                                                        <el-form-item label="" size="mini"
                                                                      label-width="0px">
                                                            <el-checkbox v-model="data.AHLdeAcikMusSipAL"
                                                                         label="A.H.L.'de Açık Müşteri Siparişlerini De Değerlendir"
                                                                         border size="mini"
                                                                         :true-label="1" :false-label="0">
                                                            </el-checkbox>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>

                                                <el-row :gutter="10">
                                                    <el-col :xs="8" :lg="8">
                                                        <el-form-item label="Vade (gün)" size="mini"
                                                                      label-width="75px">
                                                            <el-input placeholder="Vade (gün)"
                                                                      v-model="data.VadeGun">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>

                                                    <el-col :xs="8" :lg="8">
                                                        <el-form-item label="" size="mini"
                                                                      label-width="150px">
                                                            <el-button type="primary" plain size="mini">Liste Giriş
                                                                Ekranı
                                                            </el-button>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>


                                            </el-col>


                                            <el-col :xs="12" :lg="12">
                                                <el-row :gutter="10">
                                                    <el-col :xs="8" :lg="8">
                                                        <el-form-item label="Uyarı Limiti" size="mini"
                                                                      label-width="85px">
                                                            <el-input placeholder="Uyarı Limiti"
                                                                      maxlength="120"
                                                                      v-model="data.AHL_Uyari">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>

                                                    <el-col :xs="8" :lg="8">
                                                        <el-form-item label="Vade (gün)" size="mini"
                                                                      label-width="75px">
                                                            <el-input placeholder="Vade (gün)"
                                                                      v-model="data.VadeGun">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>

                                                <el-row :gutter="10">
                                                    <el-col :xs="12" :lg="12">
                                                        <el-form-item label="Sevkiyat Durdurma Limiti" size="mini"
                                                                      label-width="150px">
                                                            <el-input placeholder="Sevkiyat Durdurma Limiti"
                                                                      maxlength="150"
                                                                      v-model="data.AHL_SevkEngelle">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>

                                                <el-row :gutter="10">
                                                    <el-col :xs="12" :lg="12">
                                                        <el-form-item label="Sipariş Durdurma Limiti" size="mini"
                                                                      label-width="150px">
                                                            <el-input placeholder="Sipariş Durdurma Limiti"
                                                                      maxlength="150"
                                                                      v-model="data.AHL_SipEngelle">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>


                                            </el-col>


                                        </el-row>

                                        <el-row>
                                            <el-col :xs="24" :lg="24">
                                                <el-row>
                                                    <label class="el-form-item__label">
                                                        <el-button type="info" @click="openDialog({})"
                                                                   icon="mdi mdi-library-plus" size="mini">
                                                            Yeni Stok Ekle
                                                        </el-button>
                                                        <b> Özel Fiyatlandırma Listesi</b>
                                                    </label>
                                                </el-row>
                                                <el-row>
                                                    <div id="tCariOzelFiyatlandirmaListesi"
                                                         class="tableDiv bg-white card-shadow--small b-rad-4 box grow scrollable only-y"
                                                         v-loading="resizing || isLoading"
                                                         :style="{ 'height': 150 + 'px' }">

                                                        <el-table :data="data.ozel_fiyatlandirma_listesi"
                                                                  @cell-click="this.selectTableElement" size="small"
                                                                  @row-dblclick="selectItem" resizable border
                                                                  :height="150">
                                                            <el-table-column
                                                                    prop="StokKod"
                                                                    label="Stok Kodu"
                                                                    width="100"
                                                                    fixed="left"
                                                            >
                                                            </el-table-column>
                                                            <el-table-column
                                                                    prop="VariantKod"
                                                                    label="Variant Kodu"
                                                                    width="100"
                                                            >
                                                            </el-table-column>
                                                            <el-table-column
                                                                    prop="VariantKod2"
                                                                    label="Vrt. Kod 2 (Aralık İse)"
                                                                    width="150"
                                                            >
                                                            </el-table-column>
                                                            <el-table-column
                                                                    prop="variant.Tanim"
                                                                    label="Variant - Ürün Tanımı"
                                                                    width="350"
                                                            >
                                                            </el-table-column>
                                                            <el-table-column
                                                                    prop="StkIsk1"
                                                                    label="İsk. 1"
                                                                    width="60"
                                                            >
                                                            </el-table-column>
                                                            <el-table-column
                                                                    prop="StkIsk2"
                                                                    label="İsk. 2"
                                                                    width="60"
                                                            >
                                                            </el-table-column>
                                                            <el-table-column
                                                                    prop="StkIsk3"
                                                                    label="İsk. 3"
                                                                    width="60"
                                                            >
                                                            </el-table-column>
                                                            <el-table-column
                                                                    prop="BrFiyat"
                                                                    label="Br Fiyat"
                                                                    width="70"
                                                            >
                                                            </el-table-column>
                                                            <el-table-column
                                                                    prop="DovizKod"
                                                                    label="Döviz"
                                                                    width="70"
                                                            >
                                                            </el-table-column>
                                                            <el-table-column
                                                                    prop="FiyatKodu"
                                                                    label="Fiyat Kodu"
                                                                    width="90"
                                                            >
                                                            </el-table-column>
                                                            <el-table-column
                                                                    prop="CariStokKod"
                                                                    label="Müşteri Ürün Kodu"
                                                                    width="130"
                                                            >
                                                            </el-table-column>

                                                            <el-table-column
                                                                    prop="CariStokAdi"
                                                                    label="Müşteri Ürün Adı"
                                                                    width="150"
                                                            >
                                                            </el-table-column>

                                                            <el-table-column
                                                                    prop="Aciklama"
                                                                    label="Açıklama"
                                                                    width="200"
                                                            >
                                                            </el-table-column>
                                                            <el-table-column label="Tüm Vrt.larda Geçerli" width="140">
                                                                <template slot-scope="scope">
                                                                    <el-switch v-model="scope.row.TumVrtlardaGecerli"
                                                                               :active-value="1"
                                                                               :inactive-value="0" disabled></el-switch>
                                                                </template>
                                                            </el-table-column>
                                                            <el-table-column
                                                                    label="İşlem"
                                                                    width="90"
                                                                    fixed="right"
                                                            >
                                                                <template slot-scope="scope">
                                                                    <el-button size="mini"
                                                                               @click="selectItem(scope.row)"
                                                                               type="primary" icon="el-icon-edit"
                                                                               circle></el-button>
                                                                    <el-button size="mini"
                                                                               @click="deleteItem(scope.row)"
                                                                               type="danger" icon="el-icon-delete"
                                                                               circle></el-button>
                                                                </template>
                                                            </el-table-column>
                                                        </el-table>
                                                    </div>
                                                </el-row>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </el-form>
                            </el-tab-pane>
                        </el-tabs>
                    </el-col>
                </el-row>
            </div>
        </el-dialog>

        <MCariOzelFiyat v-if="ozelFiyatlarVisible" visibleModel='ozelFiyatlarVisible' :id="dItem.id"
                        :kod="this.CariKod"></MCariOzelFiyat>
        <HesapPlaniArama v-if="hesapPlaniAramaVisible" visibleModel='hesapPlaniAramaVisible'></HesapPlaniArama>

    </div>
</template>

<script>
    import MCarilerService from "@/services/Muhasebe/MCariler";
    import MCariOzelFiyat from '@/components/Muhasebe/MCariOzelFiyat'
    import Doviz from '@/components/Muhasebe/Doviz'
    import HesapPlaniArama from '@/components/Aramalar/HesapPlaniArama'

    export default {
        name: 'MCari',
        props: ['visible', 'CariKod'],
        components:
            {
                MCariOzelFiyat,
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
                this.$parent.mcariVisible = false
            },

            fetchData()
            {
                if (_.isUndefined(this.CariKod))
                {
                    this.loadingData = false;
                    return;
                }

                MCarilerService
                    .GetById(this.CariKod)
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
                if (_.isEmpty(this.data.CariKod) || _.isEmpty(this.data.CariAdi))
                {
                    this.ShowMsg('error', 'Cari Kodu ve Cari Adı girmelisiniz!', 'Hata');
                    return;
                }

                this.loadingData = true;

                MCarilerService
                    .Save(this.data)
                    .then(response =>
                    {
                        if (response && response.data)
                        {
                            if (response.data.status)
                            {
                                this.ShowMsg('success', response.data.message, response.data.title);
                                this.CariKod = response.data.data.CariKod;
                                this.fetchData();
                            }
                            else
                                this.ShowMsg('error', response.data.message, response.data.title);
                        }

                        this.loadingData = false;
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

                this.loadingData = true;

                this.$dialog.confirm('<span class="dg-icon"></span>' + ' (' + this.data.CariKod + ') ' + ' Silmek istediğinizden emin misiniz?', {
                    okText: 'Evet',
                    cancelText: 'Hayır'
                })
                    .then((dialog) =>
                    {
                        MCarilerService
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


        },

        mounted()
        {
            if (_.isUndefined(this.CariKod))
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
        },

        watch: {
            'hesapPlaniAramaVisible': function (newVal, oldVal)
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