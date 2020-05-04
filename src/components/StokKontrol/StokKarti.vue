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
                        <el-button type="info" @click="copyData" icon="mdi mdi-content-copy" size="mini"
                                   v-if="data.id > 0">
                            Kopyala
                        </el-button>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <el-divider><b>STOK KARTI</b></el-divider>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <el-form label-width="80px" label-position="left">
                        <div class="form-group">
                            <el-row :gutter="15">
                                <el-col :xs="11" :lg="11">
                                    <el-row :gutter="10">
                                        <el-col :xs="8" :lg="8" :span="1">
                                            <el-form-item label="Stok Kodu" size="mini">
                                                <el-input placeholder="Stok Kodu"
                                                          v-model="data.Kod" :disabled="data.id > 0"
                                                          clearable></el-input>
                                            </el-form-item>
                                        </el-col>

                                        <el-col :xs="7" :lg="7" :span="1">
                                            <el-form-item label="Stok Tipi" size="mini" label-width="60px">
                                                <ParcaBilgisi v-model="data.ParcaBilgisi"></ParcaBilgisi>
                                            </el-form-item>
                                        </el-col>

                                        <el-col :xs="9" :lg="9">
                                            <el-form-item label="Temin Türü" size="mini" label-width="95px">
                                                <TeminTuru v-model="data.TeminTuru"></TeminTuru>
                                            </el-form-item>
                                        </el-col>

                                    </el-row>

                                    <el-row :gutter="10">
                                        <el-col :xs="15" :lg="15" :span="1">
                                            <el-form-item label="Stok Adı" size="mini">
                                                <el-input placeholder="Stok Adı" v-model="data.Isim"
                                                          clearable></el-input>
                                            </el-form-item>
                                        </el-col>

                                        <el-col :xs="9" :lg="9">
                                            <el-form-item label="Satınalma Türü" size="mini" label-width="95px">
                                                <el-select v-model="data.SatinalmaTeminTuru" placeholder="- Seçin -"
                                                           required :disabled="data.SatinalmaTeminTuru == ''">
                                                    <el-option key="NORMAL" value="NORMAL"></el-option>
                                                    <el-option key="İTHAL" value="İTHAL"></el-option>
                                                    <el-option key="HAZIR-NORM" value="HAZIR-NORM"></el-option>
                                                    <el-option key="ÖZEL" value="ÖZEL"></el-option>
                                                    <el-option key="YANSANAYİ" value="YANSANAYİ"></el-option>
                                                </el-select>
                                            </el-form-item>

                                        </el-col>
                                    </el-row>

                                    <el-row :gutter="20">
                                        <el-col :xs="10" :lg="10">
                                            <el-form-item label="Kısa Tanım" size="mini">
                                                <el-input placeholder="Kısa Tanım" v-model="data.KisaTanim"
                                                          clearable></el-input>
                                            </el-form-item>
                                        </el-col>

                                        <el-col :xs="5" :lg="5">
                                            <el-form-item>
                                            </el-form-item>
                                        </el-col>

                                        <el-col :xs="9" :lg="9">
                                            <el-form-item label="Marka" size="mini" label-width="50px">
                                                <el-input placeholder="Marka" v-model="data.Marka" clearable></el-input>
                                            </el-form-item>
                                        </el-col>


                                    </el-row>

                                    <el-row :gutter="10">

                                        <el-col :xs="5" :lg="5">
                                            <el-form-item label="Sat./İmlt. Ted. Süresi" size="mini"
                                                          label-width="125px">
                                            </el-form-item>
                                        </el-col>
                                        <el-col :xs="3" :lg="3" :span="1">
                                            <el-input placeholder="Satınalma Ted. Süresi" size="mini"
                                                      v-model="data._SatinalmaTedSure" disabled></el-input>
                                        </el-col>
                                        <el-col :xs="3" :lg="3" :span="1">
                                            <el-input placeholder="İmlt. Ted Süresi" size="mini"
                                                      v-model="data.imalatTedSure" clearable></el-input>
                                        </el-col>

                                        <el-col :xs="4" :lg="4">
                                            <el-form-item>
                                            </el-form-item>
                                        </el-col>

                                        <el-col :xs="9" :lg="9">
                                            <el-form-item label="Kayıt Tarihi" size="mini" label-width="95px">
                                                <el-input placeholder="Kayıt Tarihi"
                                                          v-model="data.KayitTarihi" disabled></el-input>
                                            </el-form-item>
                                        </el-col>

                                    </el-row>

                                    <el-row :gutter="10" :span="2">

                                        <el-col :xs="15" :lg="15">
                                            <el-form-item>
                                            </el-form-item>
                                        </el-col>

                                        <el-col :xs="9" :lg="9">
                                            <el-form-item label="Kullanıcı No" size="mini" label-width="95px">
                                                <el-input placeholder="Kullanıcı No"
                                                          v-model="data.KullaniciNo" disabled></el-input>
                                            </el-form-item>
                                        </el-col>

                                    </el-row>
                                </el-col>

                                <el-col :xs="13" :lg="13">
                                    <el-row :gutter="10">
                                        <el-col :xs="8" :lg="8">

                                            <el-form-item label="Stok Birimi" size="mini" label-width="140px">
                                                <Birim v-model="data.Birim"></Birim>
                                            </el-form-item>
                                        </el-col>

                                        <el-col :xs="5" :lg="5">
                                            <el-checkbox v-model="data.Aktif" label="Aktif" border size="mini"
                                                         :true-label="1" :false-label="0">
                                            </el-checkbox>
                                        </el-col>

                                        <el-col :xs="6" :lg="6">
                                            <el-form-item label="Hacim(m3)" size="mini" label-width="80px">
                                                <el-input placeholder="Hacim(m3)"
                                                          v-model="data.Hacim"></el-input>
                                            </el-form-item>
                                        </el-col>


                                        <el-col :xs="5" :lg="5">
                                            <el-form-item label="En(mm)" size="mini" label-width="80px">
                                                <el-input placeholder="En" size="mini"
                                                          v-model="data.Genislik"></el-input>
                                            </el-form-item>
                                        </el-col>

                                    </el-row>

                                    <el-row :gutter="10">
                                        <el-col :xs="8" :lg="8">
                                            <el-form-item label="Satınalma Sipariş Birimi" size="mini"
                                                          label-width="140px">
                                                <Birim v-model="data.SatinalmaSiparisBirim"
                                                       :disabled="data.TeminTuru == 'İMALAT'"></Birim>
                                            </el-form-item>
                                        </el-col>

                                        <el-col :xs="5" :lg="5">
                                            <el-checkbox v-model="data.MpsKalemi" label="MPS Kalemi" border size="mini"
                                                         true-label="E" false-label="H">
                                            </el-checkbox>
                                        </el-col>

                                        <el-col :xs="6" :lg="6">
                                            <el-form-item label="Yüzey Alanı" size="mini" label-width="80px">
                                                <el-input placeholder="Yüzey Alanı"
                                                          v-model="data.YuzeyAlaniM2"></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :xs="5" :lg="5">
                                            <el-form-item label="Boy(mm)" size="mini" label-width="80px">
                                                <el-input placeholder="Boy" size="mini"
                                                          v-model="data.Boy"></el-input>
                                            </el-form-item>
                                        </el-col>

                                    </el-row>

                                    <el-row :gutter="10">
                                        <el-col :xs="8" :lg="8">
                                            <el-form-item label="Satınalma Kabul Birimi" size="mini"
                                                          label-width="140px">
                                                <Birim v-model="data.SatinalmaKabulBirim"
                                                       :disabled="data.TeminTuru == 'İMALAT'"></Birim>
                                            </el-form-item>
                                        </el-col>

                                        <el-col :xs="5" :lg="5">
                                            <el-checkbox v-model="data.SatisYap" label="Satış Yapılabilir" border
                                                         size="mini"
                                                         true-label="E" false-label="H">
                                            </el-checkbox>
                                        </el-col>

                                        <el-col :xs="6" :lg="6">
                                            <el-form-item label="Net(gr)" size="mini" label-width="80px">
                                                <el-input placeholder="Net(gr)" size="mini"
                                                          v-model="data.AgirlikNet"></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :xs="5" :lg="5">
                                            <el-form-item label="Yük.(mm)" size="mini" label-width="80px">
                                                <el-input placeholder="Yükseklik" size="mini"
                                                          v-model="data.Yukseklik"></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>

                                    <el-row :gutter="10">
                                        <el-col :xs="8" :lg="8">
                                            <el-form-item label="Satış Birimi" size="mini" label-width="140px">
                                                <Birim v-model="data.SatisBirim"
                                                       :disabled="data.TeminTuru == 'İMALAT' || data.TeminTuru == 'SATINALMA'"></Birim>
                                            </el-form-item>
                                        </el-col>

                                        <el-col :xs="5" :lg="5">
                                            <el-checkbox v-model="data.Hayalet" label="Hayalet" border size="mini"
                                                         :true-label="1" :false-label="0"
                                                         :disabled="data.TeminTuru == 'SATINALMA'">
                                            </el-checkbox>
                                        </el-col>

                                        <el-col :xs="6" :lg="6">
                                            <el-form-item label="Brüt(gr)" size="mini" label-width="80px">
                                                <el-input placeholder="Brüt(gr)" size="mini"
                                                          v-model="data.AgirlikBrut"></el-input>
                                            </el-form-item>
                                        </el-col>

                                        <el-col :xs="5" :lg="5">
                                            <el-form-item label="Kalınlık(mm)" size="mini" label-width="80px">
                                                <el-input placeholder="Kalınlık"
                                                          v-model="data.Kalinlik"></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>

                                    <el-row :gutter="10">
                                        <el-col :xs="8" :lg="8">
                                            <el-form-item label="İmalat Sipariş Birimi" size="mini" label-width="140px">
                                                <Birim v-model="data.ImalatSiparisBirim"
                                                       :disabled="data.TeminTuru == 'SATINALMA'"></Birim>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :xs="3" :lg="3">
                                            <el-form-item>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :xs="3" :lg="4">
                                            <el-form-item label="İç/Dış Çap(mm)" size="mini" label-width="100px">
                                            </el-form-item>
                                        </el-col>
                                        <el-col :xs="2" :lg="2">
                                            <el-input placeholder="İç Çap" size="mini"
                                                      v-model="data.IcCap"></el-input>
                                        </el-col>
                                        <el-col :xs="2" :lg="2">
                                            <el-input placeholder="Dış Çap" size="mini"
                                                      v-model="data.DisCap"></el-input>
                                        </el-col>
                                        <el-col :xs="5" :lg="5">
                                            <el-form-item label="Yoğunluk" size="mini" label-width="80px">
                                                <el-input placeholder="Yoğunluk"
                                                          v-model="data.Yogunluk"></el-input>
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
                        <el-tab-pane label="Stok Bilgileri">
                            <div class="">
                                <el-form label-position="left" label-width="110px">
                                    <el-row :gutter="15">

                                        <el-col :xs="12" :lg="12">
                                            <el-row>
                                                <el-col :xs="12" :lg="12">
                                                    <el-row :gutter="10">
                                                        <el-col :xs="20" :lg="20" :span="1">
                                                            <el-form-item label="Emniyet Stoğu" size="mini">
                                                                <el-input placeholder="Emniyet Stoğu"
                                                                          v-model="data.EmniyetStogu"></el-input>
                                                            </el-form-item>
                                                        </el-col>
                                                    </el-row>

                                                    <el-row :gutter="10">
                                                        <el-col :xs="20" :lg="20" :span="1">
                                                            <el-form-item label="Min. Sip. Miktarı" size="mini">
                                                                <el-input placeholder="Min Sip. Miktarı"
                                                                          v-model="data.MinSipMiktari"></el-input>
                                                            </el-form-item>
                                                        </el-col>
                                                    </el-row>

                                                    <el-row :gutter="10">
                                                        <el-col :xs="20" :lg="20" :span="1">
                                                            <el-form-item label="Max. Sip. Miktarı" size="mini">
                                                                <el-input placeholder="Max Sip. Miktarı"
                                                                          v-model="data.MaxSiparisMiktari"></el-input>
                                                            </el-form-item>
                                                        </el-col>
                                                    </el-row>

                                                    <el-row :gutter="10">
                                                        <el-col :xs="20" :lg="20" :span="1">
                                                            <el-form-item label="Sipariş Katları" size="mini">
                                                                <el-input placeholder="Sipariş Katları"
                                                                          v-model="data.SipKatlari"></el-input>
                                                            </el-form-item>
                                                        </el-col>
                                                    </el-row>

                                                    <el-row :gutter="10">
                                                        <el-col :xs="20" :lg="20" :span="1">
                                                            <el-form-item label="Üretim Katsayısı" size="mini">
                                                                <el-input placeholder="Üretim Katsayısı"
                                                                          v-model="data.UretimKatsayisi"></el-input>
                                                            </el-form-item>
                                                        </el-col>
                                                    </el-row>

                                                    <el-row :gutter="10">
                                                        <el-col :xs="20" :lg="20" :span="1">
                                                            <el-form-item label="Mail Stok Seviyesi" size="mini">
                                                                <el-input placeholder="Mail Stok Seviyesi"
                                                                          v-model="data.MailStokSeviyesi"></el-input>
                                                            </el-form-item>
                                                        </el-col>
                                                    </el-row>

                                                    <el-row :gutter="10">
                                                        <el-col :xs="23" :lg="23">
                                                            <el-form-item label="Malzeme Grubu 1" size="mini">
                                                                <MalzemeGrubu v-model="data.MalzemeGrubu1"
                                                                              :level="1"></MalzemeGrubu>
                                                            </el-form-item>
                                                        </el-col>
                                                    </el-row>

                                                    <el-row :gutter="10">
                                                        <el-col :xs="23" :lg="23">
                                                            <el-form-item label="Malzeme Grubu 2" size="mini">
                                                                <MalzemeGrubu v-model="data.MalzemeGrubu2"
                                                                              :level="2"></MalzemeGrubu>
                                                            </el-form-item>
                                                        </el-col>
                                                    </el-row>

                                                    <el-row :gutter="10">
                                                        <el-col :xs="23" :lg="23">
                                                            <el-form-item label="Malzeme Grubu 3" size="mini">
                                                                <MalzemeGrubu v-model="data.MalzemeGrubu3"
                                                                              :level="3"></MalzemeGrubu>
                                                            </el-form-item>
                                                        </el-col>
                                                    </el-row>

                                                    <el-row :gutter="10">
                                                        <el-col :xs="23" :lg="23">
                                                            <el-form-item label="Malzeme Grubu 4" size="mini">
                                                                <MalzemeGrubu v-model="data.MalzemeGrubu4"
                                                                              :level="4"></MalzemeGrubu>
                                                            </el-form-item>
                                                        </el-col>
                                                    </el-row>

                                                    <el-row :gutter="10">
                                                        <el-col :xs="23" :lg="23">
                                                            <el-form-item label="Malzeme Grubu 5" size="mini">
                                                                <MalzemeGrubu v-model="data.MalzemeGrubu5"
                                                                              :level="5"></MalzemeGrubu>
                                                            </el-form-item>
                                                        </el-col>
                                                    </el-row>

                                                </el-col>

                                                <el-col :xs="12" :lg="12">
                                                    <el-row :gutter="10">
                                                        <el-col :xs="20" :lg="20" :span="1">
                                                            <el-form-item label="Ürün Barkod No" size="mini">
                                                                <el-input placeholder="Ürün Barkod No"
                                                                          v-model="data.BarkodNo"></el-input>
                                                            </el-form-item>
                                                        </el-col>
                                                    </el-row>

                                                    <el-row :gutter="10">
                                                        <el-col :xs="20" :lg="20" :span="1">
                                                            <el-form-item label="Resim No" size="mini">
                                                                <el-input placeholder="Resim No"
                                                                          v-model="data.ResimNo"></el-input>
                                                            </el-form-item>
                                                        </el-col>
                                                    </el-row>

                                                    <el-row :gutter="10">
                                                        <el-col :xs="20" :lg="20" :span="1">
                                                            <el-form-item label="Standart Kod" size="mini">
                                                                <el-input placeholder="Standart Kod"
                                                                          v-model="data.StandartKod"></el-input>
                                                            </el-form-item>
                                                        </el-col>
                                                    </el-row>

                                                    <el-row :gutter="10">
                                                        <el-col :xs="20" :lg="20" :span="1">
                                                            <el-form-item label="Özel Kod 1" size="mini">
                                                                <el-input placeholder="Özel Kod 1"
                                                                          v-model="data.OzelKod1"></el-input>
                                                            </el-form-item>
                                                        </el-col>
                                                    </el-row>

                                                    <el-row :gutter="10">
                                                        <el-col :xs="20" :lg="20" :span="1">
                                                            <el-form-item label="Özel Kod 2" size="mini">
                                                                <el-input placeholder="Özel Kod 2"
                                                                          v-model="data.OzelKod2"></el-input>
                                                            </el-form-item>
                                                        </el-col>
                                                    </el-row>
                                                    <el-row :gutter="10">
                                                        <el-col :xs="20" :lg="20" :span="1">
                                                            <el-form-item label="Özel Kod 3" size="mini">
                                                                <el-input placeholder="Özel Kod 3"
                                                                          v-model="data.OzelKod3"></el-input>
                                                            </el-form-item>
                                                        </el-col>
                                                    </el-row>
                                                    <el-row :gutter="10">
                                                        <el-col :xs="20" :lg="20" :span="1">
                                                            <el-form-item label="Özel Kod 4" size="mini">
                                                                <el-input placeholder="Özel Kod 4"
                                                                          v-model="data.OzelKod4"></el-input>
                                                            </el-form-item>
                                                        </el-col>
                                                    </el-row>

                                                    <el-row :gutter="10">
                                                        <el-col :xs="20" :lg="20" :span="1">
                                                            <el-form-item label="Fire Stok Kodu" size="mini">
                                                                <el-input placeholder="Fire Stok Kodu"
                                                                          v-model="data.FireStokKod"></el-input>
                                                            </el-form-item>
                                                        </el-col>
                                                    </el-row>

                                                    <el-row :gutter="10">
                                                        <el-col :xs="20" :lg="20" :span="1">
                                                            <el-form-item label="Hurda Stok Kodu" size="mini">
                                                                <el-input placeholder="Hurda Stok Kodu"
                                                                          v-model="data.HurdaStokKod"></el-input>
                                                            </el-form-item>
                                                        </el-col>
                                                    </el-row>

                                                </el-col>
                                            </el-row>

                                        </el-col>

                                        <el-col :xs="12" :lg="12">
                                            <el-row :gutter="10">
                                                <el-col :xs="24" :lg="24">
                                                    <el-form-item label="İş Emri Açklama 1" size="mini">
                                                        <el-input
                                                                type="textarea"
                                                                :autosize="{ minRows: 3, maxRows: 5}"
                                                                placeholder="İş Emri Açıklama 1"
                                                                resize="none"
                                                                v-model="textarea2">
                                                        </el-input>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :xs="24" :lg="24">
                                                    <el-form-item label="İş Emri Açklama 2" size="mini">
                                                        <el-input
                                                                type="textarea"
                                                                :autosize="{ minRows: 3, maxRows: 5}"
                                                                placeholder="İş Emri Açıklama 2"
                                                                resize="none"
                                                                v-model="textarea2">
                                                        </el-input>
                                                    </el-form-item>
                                                </el-col>
                                            </el-row>

                                            <el-row :gutter="10">
                                                <el-col :xs="24" :lg="24">
                                                    <label class="el-form-item__label">
                                                        <el-button type="info" @click="openDialog({})"
                                                                   icon="mdi mdi-library-plus" size="mini">
                                                            Yeni Eşdeğer Ekle
                                                        </el-button>
                                                        <b> Farklı Birimlerdeki Eşdeğerleri</b>
                                                    </label>
                                                </el-col>

                                                <el-col :xs="24" :lg="24">
                                                    <div id="tStokOzelBirimler"
                                                         class="tableDiv bg-white card-shadow--small b-rad-4 box grow scrollable only-y"
                                                         v-loading="resizing || isLoading"
                                                         :style="{ 'height': 150 + 'px' }">

                                                        <el-table :data="data.ozel_birimler"
                                                                  @cell-click="this.selectTableElement" size="small"
                                                                  @row-dblclick="selectItem" resizable border
                                                                  :height="150">
                                                            <el-table-column
                                                                    prop="Birim"
                                                                    label="Birim"
                                                                    width="80"
                                                            >
                                                            </el-table-column>
                                                            <el-table-column
                                                                    prop="Esdegeri"
                                                                    label="Eş Değeri"
                                                                    width="80"
                                                            >
                                                            </el-table-column>
                                                            <el-table-column
                                                                    label="Formül"
                                                                    width="150"
                                                            >
                                                                <template slot-scope="scope">
                                                                    {{ scope.row.Kaci + ' ' + dataCloned.Birim + ' = ' +
                                                                    scope.row.Esdegeri + ' ' + scope.row.Birim }}
                                                                </template>
                                                            </el-table-column>
                                                            <el-table-column
                                                                    prop="Kaci"
                                                                    label="Birim Miktarı"
                                                                    width="100"
                                                            >
                                                            </el-table-column>
                                                            <el-table-column
                                                                    label="İşlem"
                                                                    width="90"
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
                                                </el-col>

                                            </el-row>

                                            <el-row :gutter="10">
                                                <el-col :xs="12" :lg="12">
                                                    <label class="el-form-item__label">
                                                        Resim
                                                    </label>
                                                    <div class="block">
                                                        <img src="" width="100%" height="150px">
                                                    </div>
                                                </el-col>
                                            </el-row>


                                        </el-col>
                                    </el-row>
                                </el-form>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="Tedarikçi Bilgileri">
                        </el-tab-pane>
                        <el-tab-pane label="Mamül Variant Bilgileri">
                            <div id="tVariantlar"
                                 class="tableDiv bg-white card-shadow--small b-rad-4 box grow scrollable"
                                 v-loading="resizing || isLoading" :style="{ 'height': 500 + 'px' }">

                                <el-table :data="data.variantlar" @cell-click="this.selectTableElement" size="small"
                                           resizable border :height="500">
                                    <el-table-column
                                            label="No"
                                            width="80"
                                            type="index"
                                            border
                                            highlight-current-row
                                    >
                                    </el-table-column>
                                    <el-table-column
                                            prop="VariantKod"
                                            label="Variant Kodu"
                                            width="150"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                            prop="Tanim"
                                            label="Variant Adı"
                                            width="275"
                                    >
                                    </el-table-column>
                                    <el-table-column label="Aktif" width="70">
                                        <template slot-scope="scope">
                                            <el-switch v-model="scope.row.Aktif" :active-value="1"
                                                       :inactive-value="0" disabled></el-switch>
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="Sip. Girilebilir" width="100">
                                        <template slot-scope="scope">
                                            <el-switch v-model="scope.row.SiparisGirilebilir" :active-value="1"
                                                       :inactive-value="0" disabled></el-switch>
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="Stok Mik. Kadar Sip. Gir." width="160">
                                        <template slot-scope="scope">
                                            <el-switch v-model="scope.row.StoktakiKadarSipGir" :active-value="1"
                                                       :inactive-value="0" disabled></el-switch>
                                        </template>
                                    </el-table-column>

                                    <el-table-column
                                            prop="Genislik"
                                            label="En"
                                            width="60"
                                    >
                                    </el-table-column>

                                    <el-table-column
                                            prop="Boy"
                                            label="Boy"
                                            width="60"
                                    >
                                    </el-table-column>

                                    <el-table-column
                                            prop="Yukseklik"
                                            label="Yükseklik"
                                            width="80"
                                    >
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="Depo ve Takip Bilgileri">
                        </el-tab-pane>
                        <el-tab-pane label="Stok Hareketleri">
                        </el-tab-pane>
                        <el-tab-pane label="Stok Transferleri">
                        </el-tab-pane>
                        <el-tab-pane label="Dökümantasyon">
                        </el-tab-pane>
                        <el-tab-pane label="Kalite Bilgileri">
                        </el-tab-pane>
                        <el-tab-pane label="Fiyat/Ek Maliyet Bilgileri">
                        </el-tab-pane>
                        <el-tab-pane label="Satış - Barkod">
                            <div class="">
                                <el-form label-position="left" label-width="110px">
                                    <el-row :gutter="15">

                                        <el-col :xs="12" :lg="12">
                                            <el-row>
                                                <el-col :xs="18" :lg="18">
                                                    <el-row :gutter="10">
                                                        <el-col :xs="24" :lg="24" :span="1">
                                                            <el-form-item label="Fatura Stok Tanımı" size="mini" label-width="115px">
                                                                <el-input placeholder="Fatura Stok Tanımı"
                                                                          v-model="data.FaturaStokIsim"></el-input>
                                                            </el-form-item>
                                                        </el-col>
                                                    </el-row>
                                                </el-col>
                                            </el-row>
                                        </el-col>
                                    </el-row>
                                </el-form>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="İş Emri Bilgileri ve Resimler">
                        </el-tab-pane>
                        <el-tab-pane label="Diğer Diller">
                        </el-tab-pane>
                        <el-tab-pane label="Kullandığı Mamüller">
                        </el-tab-pane>
                        <el-tab-pane label="Bileşen Malzemeleri">
                        </el-tab-pane>
                        <el-tab-pane label="Operasyonlar">
                        </el-tab-pane>
                        <el-tab-pane label="Stok Kartı Log">
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
            </el-row>
            </div>
        </el-dialog>

        <OzelBirim :visible="ozelBirimVisible" v-if="ozelBirimVisible" :id="dItem.id" :kod="this.Kod"
                   :stokbirim="dataCloned.Birim"></OzelBirim>
    </div>
</template>

<script>
    import StokKontrol_StoklarService from "@/services/StokKontrol/Stoklar";
    import MalzemeGrubu from '@/components/Tanimlamalar/MalzemeGrubu'
    import Birim from '@/components/Tanimlamalar/Birim'
    import OzelBirim from '@/components/Tanimlamalar/OzelBirim'
    import TeminTuru from '@/components/Tanimlamalar/TeminTuru'
    import ParcaBilgisi from '@/components/Tanimlamalar/ParcaBilgisi'
    import OzelBirimlerService from "@/services/Tanimlamalar/ModulTanimlamalari/StokKontrol/OzelBirimler";

    export default {
        name: 'StokKarti',
        props: ['visible', 'Kod'],
        components:
            {
                Birim,
                OzelBirim,
                MalzemeGrubu,
                TeminTuru,
                ParcaBilgisi
            },
        data()
        {
            return {
                loadingData: true,
                data: {},
                dataCloned: {},
                dItem: {},
                ozelBirimVisible: false
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
                this.$parent.stokKartiVisible = false
            },

            fetchData()
            {
                if (_.isUndefined(this.Kod))
                {
                    this.loadingData = false;
                    return;
                }

                StokKontrol_StoklarService
                    .GetById(this.Kod)
                    .then(response =>
                    {
                        if (response && response.data)
                        {
                            this.data = response.data.data;
                            this.dataCloned = _.cloneDeep(this.data);
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
                if (_.isEmpty(this.data.Kod) || _.isEmpty(this.data.Isim))
                {
                    this.ShowMsg('error', 'Stok Kodu ve Stok Adı girmelisiniz!', 'Hata');
                    return;
                }

                if (_.isEmpty(this.data.ParcaBilgisi) || _.isEmpty(this.data.TeminTuru))
                {
                    this.ShowMsg('error', 'Stok Tipi ve Temin Türü girmelisiniz!', 'Hata');
                    return;
                }

                if ((this.data.ozel_birimler == null
                    && (this.data.SatinalmaSiparisBirim != this.data.Birim
                        || this.data.SatisBirim != this.data.Birim
                        || this.data.SatinalmaKabulBirim != this.data.Birim
                        || this.data.ImalatSiparisBirim != this.data.Birim))
                    || this.data.SatinalmaSiparisBirim != this.data.Birim && this.data.ozel_birimler.filter(x => x.Birim === this.data.SatinalmaSiparisBirim).length === 0
                    || this.data.SatisBirim != this.data.Birim && this.data.ozel_birimler.filter(x => x.Birim === this.data.SatisBirim).length === 0
                    || this.data.SatinalmaKabulBirim != this.data.Birim && this.data.ozel_birimler.filter(x => x.Birim === this.data.SatinalmaKabulBirim).length === 0
                    || this.data.ImalatSiparisBirim != this.data.Birim && this.data.ozel_birimler.filter(x => x.Birim === this.data.ImalatSiparisBirim).length === 0
                )
                {
                    this.ShowMsg('error', 'Seçilen bir birim Özel birimlerde bulunmuyor! Önce özel birim eklemelisiniz.', 'Hata');
                    return;
                }

                StokKontrol_StoklarService
                    .Save(this.data)
                    .then(response =>
                    {
                        if (response && response.data)
                        {
                            if (response.data.status)
                            {
                                this.ShowMsg('success', response.data.message, response.data.title);
                                this.Kod = response.data.data.Kod;
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

                this.$dialog.confirm('<span class="dg-icon"></span>' + ' (' + this.data.Kod + ') ' + ' Silmek istediğinizden emin misiniz?', {
                    okText: 'Evet',
                    cancelText: 'Hayır'
                })
                    .then((dialog) =>
                    {
                        StokKontrol_StoklarService
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
                this.ozelBirimVisible = true;
            },

            selectItem(row)
            {
                this.openDialog(row);
            },

            deleteItem(row)
            {
                if (_.isUndefined(row.id))
                    return;

                this.$dialog.confirm('<span class="dg-icon"></span>' + ' (' + row.Birim + ') ' + ' Silmek istediğinizden emin misiniz?', {
                    okText: 'Evet',
                    cancelText: 'Hayır'
                })
                    .then((dialog) =>
                    {
                        OzelBirimlerService
                            .DeleteById(row.id)
                            .then(response =>
                            {
                                if (response && response.data)
                                {
                                    if (response.data.status)
                                    {
                                        this.ShowMsg('success', response.data.message, response.data.title);
                                        this.fetchData();
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
                        console.log('Clicked on cancel');
                    });
            },
        },

        watch: {
            'data.ParcaBilgisi': function (newVal, oldVal)
            {
                if (_.isUndefined(oldVal))
                    return;

                if (newVal == 'MAMÜL')
                    this.data.SatisYap = 'E';
            },

            'data.TeminTuru': function (newVal, oldVal)
            {
                if (_.isUndefined(oldVal))
                    return;

                if (newVal == 'İMALAT')
                {
                    this.data.SatinalmaTeminTuru = '';
                    this.data.SatinalmaSiparisBirim = this.data.Birim;
                    this.data.SatisBirim = this.data.Birim;
                    this.data.SatinalmaKabulBirim = this.data.Birim;
                    this.data.ImalatSiparisBirim = this.data.Birim;
                }
                else if (newVal == 'SATINALMA')
                {
                    this.data.ImalatSiparisBirim = this.data.Birim;
                    this.data.SatisBirim = this.data.Birim;
                    this.data.SatinalmaTeminTuru = 'NORMAL';
                }
            },

            'data.Birim': function (newVal, oldVal)
            {
                if (_.isUndefined(oldVal))
                    return;

                if (this.data.TeminTuru == 'İMALAT')
                {
                    this.data.SatinalmaSiparisBirim = this.data.Birim;
                    this.data.SatisBirim = this.data.Birim;
                    this.data.SatinalmaKabulBirim = this.data.Birim;
                }
                else if (this.data.TeminTuru == 'SATINALMA')
                {
                    this.data.ImalatSiparisBirim = this.data.Birim;
                    this.data.SatisBirim = this.data.Birim;
                }
            },

        },

        mounted()
        {
            if (_.isUndefined(this.Kod))
            {
                this.data = {
                    Aktif: 1,
                    Birim: 'ADET',
                    TeminTuru: 'SATINALMA',
                    SatinalmaSiparisBirim: 'ADET',
                    SatinalmaKabulBirim: 'ADET',
                    ImalatSiparisBirim: 'ADET',
                    SatisBirim: 'ADET',
                    SatinalmaTeminTuru: 'NORMAL',
                };
                this.dataCloned = _.cloneDeep(this.data);
                this.loadingData = false;
            }
            else
                this.fetchData();
        }
    }
</script>