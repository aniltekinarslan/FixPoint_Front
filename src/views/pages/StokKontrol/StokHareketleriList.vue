<template>
    <div class="page-table column scrollable only-y" id="content" :class="{'flex':!isMobile, 'overflow':isMobile}">

        <resize-observer @notify="handleResize"/>

        <el-row>
            <el-col :lg="24">
                <div class="page-header header-primary card-base">
                    <el-row>
                        <el-col :lg="18">
                            <el-button type="success" @click="openDialog({})" icon="mdi mdi-library-plus" size="mini">
                                Yeni Stok Hareketi Ekle
                            </el-button>
                            <el-button type="primary" @click="filterOuterVisible = true" icon="mdi mdi-filter" style="margin-right:10px;" size="mini">
                                Filtrele
                            </el-button>

                            <el-tag v-if="!_.isNull(paginateFilter.Tarih1)">
                                <strong>Tarih 1: </strong> {{ paginateFilter.Tarih1.toLocaleDateString() }}
                            </el-tag>
                            <el-tag v-if="!_.isNull(paginateFilter.Tarih2)">
                                <strong>Tarih 2: </strong> {{ paginateFilter.Tarih2.toLocaleDateString() }}
                            </el-tag>
                            <el-tag closable @close="paginateFilter.StokKod1 = null; fetchData()"
                                    v-if="!_.isEmpty(paginateFilter.StokKod1)">
                                <strong>Stok Kodu 1: </strong> {{ paginateFilter.StokKod1 }}
                            </el-tag>
                            <el-tag closable @close="paginateFilter.StokKod2 = null; fetchData()"
                                    v-if="!_.isEmpty(paginateFilter.StokKod2)">
                                <strong>Stok Kodu 2: </strong> {{ paginateFilter.StokKod2 }}
                            </el-tag>
                            <el-tag closable @close="paginateFilter.VariantKod1 = null; fetchData()"
                                    v-if="!_.isEmpty(paginateFilter.VariantKod1)">
                                <strong>Variant Kodu 1: </strong> {{ paginateFilter.VariantKod1 }}
                            </el-tag>
                            <el-tag closable @close="paginateFilter.VariantKod2 = null; fetchData()"
                                    v-if="!_.isEmpty(paginateFilter.VariantKod2)">
                                <strong>Variant Kodu 2: </strong> {{ paginateFilter.VariantKod2 }}
                            </el-tag>
                            <el-tag closable @close="paginateFilter.GirisTuru = null; fetchData()"
                                    v-if="!_.isEmpty(paginateFilter.GirisTuru)">
                                <strong>Giriş Türü: </strong> {{ paginateFilter.GirisTuru }}
                            </el-tag>

                            <el-tag closable @close="paginateFilter.GirisYeri = null; fetchData()"
                                    v-if="!_.isEmpty(paginateFilter.GirisYeri)">
                                <strong>Giriş Yeri: </strong> {{ paginateFilter.GirisYeri }}
                            </el-tag>

                            <el-tag closable @close="paginateFilter.CikisTuru = null; fetchData()"
                                    v-if="!_.isEmpty(paginateFilter.CikisTuru)">
                                <strong>Çıkış Türü: </strong> {{ paginateFilter.CikisTuru }}
                            </el-tag>

                            <el-tag closable @close="paginateFilter.CikisYeri = null; fetchData()"
                                    v-if="!_.isEmpty(paginateFilter.CikisYeri)">
                                <strong>Çıkış Yeri: </strong> {{ paginateFilter.CikisYeri }}
                            </el-tag>
                        </el-col>

                        <el-col :lg="6">
                            <div style="float:right;">
                                <h1>Stok Hareketleri</h1>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>

        <el-dialog
                title="Filtrele"
                :visible.sync="filterOuterVisible"
                width="500px"
                align="center"
                append-to-body
                :close-on-click-modal="false"
                :close-on-press-escape="true"
        >
            <el-form label-width="120px" label-position="top" align="center">
                <el-row :gutter="15">
                    <el-col :xs="12" :lg="24">
                        <div class="form-group">

                            <el-col :xs="24" :lg="24">
                                <el-form-item label="Tarih Aralığı">

                                    <el-row :gutter="20">
                                        <el-col :xs="12" :lg="12" :span="2">
                                            <el-date-picker
                                                    v-model="paginateFilter.Tarih1"
                                                    type="date"
                                                    placeholder="Başlangıç Tarihi"
                                                    :picker-options="pickerOptions"
                                                    :clearable="false"
                                            >
                                            </el-date-picker>
                                        </el-col>
                                        <el-col :xs="12" :lg="12" :span="2">
                                            <el-date-picker
                                                    v-model="paginateFilter.Tarih2"
                                                    type="date"
                                                    placeholder="Bitiş Tarihi"
                                                    :picker-options="pickerOptions"
                                                    :clearable="false"
                                            >
                                            </el-date-picker>
                                        </el-col>

                                    </el-row>
                                </el-form-item>
                            </el-col>

                            <el-col :xs="24" :lg="24">
                                <el-form-item label="Stok Kodu">
                                    <el-row :gutter="20">
                                        <el-col :xs="12" :lg="12" :span="2">
                                            <el-input placeholder="Stok Kodu 1" v-model="paginateFilter.StokKod1" clearable>
                                                <i slot="prefix" class="mdi mdi-search-web"
                                                   @click="findVariant('paginateFilter.StokKod1')"></i>
                                            </el-input>
                                        </el-col>
                                        <el-col :xs="12" :lg="12" :span="2">
                                            <el-input placeholder="Stok Kodu 2"  v-model="paginateFilter.StokKod2" clearable>
                                                <i slot="prefix" class="mdi mdi-search-web"
                                                   @click="findVariant('paginateFilter.StokKod2')"></i>
                                            </el-input>
                                        </el-col>
                                    </el-row>
                                </el-form-item>
                            </el-col>

                            <el-col :xs="24" :lg="24">
                                <el-form-item label="Variant Kodu">
                                    <el-row :gutter="20">
                                        <el-col :xs="12" :lg="12" :span="2">
                                            <el-input placeholder="Variant Kodu 1" v-model="paginateFilter.VariantKod1" clearable>
                                                <i slot="prefix" class="mdi mdi-search-web"
                                                   @click="findVariant('paginateFilter.VariantKod1')"></i>
                                            </el-input>
                                        </el-col>
                                        <el-col :xs="12" :lg="12" :span="2">
                                            <el-input placeholder="Variant Kodu 2" v-model="paginateFilter.VariantKod2" clearable>
                                                <i slot="prefix" class="mdi mdi-search-web"
                                                   @click="findVariant('paginateFilter.VariantKod2')"></i>
                                            </el-input>
                                        </el-col>
                                    </el-row>
                                </el-form-item>
                            </el-col>

                            <el-col :xs="24" :lg="24">
                                <el-row :gutter="20">
                                    <el-col :xs="12" :lg="12" :span="2">
                                        <el-form-item label="Giriş Türü">
                                            <GirisTuru ref="GirisTuru" :model="paginateFilter.GirisTuru" :hareket="1"></GirisTuru>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :xs="12" :lg="12" :span="2">
                                        <el-form-item label="Giriş Yeri">
                                            <DepoYeri v-model="paginateFilter.GirisYeri"></DepoYeri>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-col>

                            <el-col :xs="24" :lg="24">
                                <el-row :gutter="20">
                                    <el-col :xs="12" :lg="12" :span="2">
                                        <el-form-item label="Çıkış Türü">
                                            <CikisTuru :model="paginateFilter.CikisTuru"></CikisTuru>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :xs="12" :lg="12" :span="2">
                                        <el-form-item label="Çıkış Yeri">
                                            <DepoYeri v-model="paginateFilter.CikisYeri"></DepoYeri>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-col>

                            <el-col :xs="24" :lg="24" class="mt-20">
                                <el-button type="danger" style="float:left;" @click="filterOuterVisible = false" >
                                    Vazgeç
                                </el-button>
                                <el-button type="primary" style="float:right;"
                                           @click="fetchData(); filterOuterVisible = false;">Filtrele
                                </el-button>
                            </el-col>

                        </div>
                    </el-col>

                </el-row>
            </el-form>
        </el-dialog>

        <VariantArama v-if="variantAramaVisible" visibleModel='variantAramaVisible'></VariantArama>

        <el-dialog
                title="Stok Hareketi"
                :visible.sync="stokHareketVisible"
                width="30%"
                align="center"
                append-to-body
                :close-on-click-modal="false"
                :close-on-press-escape="true"
        >
            <el-form label-width="120px" label-position="top" align="center">
                <el-row :gutter="15">
                    <el-col :xs="12" :lg="24">
                        <div class="form-group">
                            <el-row>
                                <el-col :xs="12" :lg="12" :span="2">
                                    <el-form-item label="Hareket Tarihi">
                                        <el-date-picker
                                                v-model="item.Tarih"
                                                type="date"
                                                placeholder="Hareket Tarihi"
                                                :picker-options="pickerOptions"
                                                default-value="2020-03-01"
                                                :clearable="false"
                                        >
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <div style="text-align:right;">
                                    <el-col :xs="12" :lg="12">
                                        <span>
                                            <b>Kayıt No : </b>{{ item.id }}
                                        </span>
                                    </el-col>

                                    <el-col :xs="12" :lg="12">
                                        <span>
                                            <b>Kaynak : </b>{{ item.KaynakProgram }}
                                        </span>
                                    </el-col>

                                    <el-col :xs="12" :lg="12">
                                        <span>
                                            <b>İmalat Sipariş No : </b>{{ item.ImalatSiparisid }}
                                        </span>
                                    </el-col>
                                    <el-col :xs="12" :lg="12">
                                        <span>
                                           <b>Satınalma Sipariş No : </b>{{ item.SatinalmaSipId }}
                                        </span>
                                    </el-col>
                                </div>
                            </el-row>

                            <el-row :gutter="20">
                                <el-col :xs="8" :lg="8" :span="2">
                                    <el-form-item label="Stok Kodu">
                                        <el-input prefix-icon="el-icon-search" placeholder="Stok Kodu"
                                                  v-model="item.StokKod" :readonly="true"></el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :xs="16" :lg="16" :span="2">
                                    <el-form-item label="Stok Adı">
                                        <el-input :disabled="true"
                                                  placeholder="Stok Adı"
                                                  v-model="item.stok_tanim"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <el-row :gutter="20">
                                <el-col :xs="8" :lg="8" :span="2">
                                    <el-form-item label="Variant Kodu">
                                        <el-input :disabled="true" prefix-icon="el-icon-search"
                                                  placeholder="Variant Kodu"
                                                  v-model="item.VariantKod"></el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :xs="16" :lg="16" :span="2">
                                    <el-form-item label="Variant Adı">
                                        <el-input :disabled="true"
                                                  placeholder="Variant Adı"
                                                  v-model="item.variant_tanim"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <div v-if="item.StokKod">
                                <el-row :gutter="20">
                                    <el-col :xs="24" :lg="24" :span="2">
                                        <el-form-item label="Tür">
                                            <el-radio v-model="hareketTuru" label="Giris" border>Giriş</el-radio>
                                            <el-radio v-model="hareketTuru" label="Cikis" border>Çıkış</el-radio>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </div>

                            <div v-if="item.StokKod">
                                <el-row :gutter="20">
                                    <el-col :xs="6" :lg="6" :span="2">
                                        <label class="el-form-item__label">Miktar ({{ item.StokBirim }})</label>
                                        <el-form-item>
                                            <el-input-number v-if="hareketTuru == 'Giris'" :min="0" size="mini"
                                                             :precision="2" :step="1.0"
                                                             placeholder="Giriş Miktarı"
                                                             v-model="item.GirisMiktari"></el-input-number>
                                            <el-input-number v-if="hareketTuru == 'Cikis'" :min="0" size="mini"
                                                             :step="1.0"
                                                             placeholder="Çıkış Miktarı"
                                                             v-model="item.CikisMiktari"></el-input-number>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :xs="9" :lg="9" :span="2">
                                        <el-form-item label="İşlem Türü">
                                            <GirisTuru :model="item.GirisTuru" :hareket="1"
                                                       v-if="hareketTuru == 'Giris'"></GirisTuru>
                                            <CikisTuru :model="item.CikisTuru" :hareket="1"
                                                       v-if="hareketTuru == 'Cikis'"></CikisTuru>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :xs="9" :lg="9" :span="2">
                                        <el-form-item label="Depo Kodu">
                                            <DepoYeri v-model="item.GirisYeri" v-if="hareketTuru == 'Giris'"></DepoYeri>
                                            <DepoYeri v-model="item.CikisYeri" v-if="hareketTuru == 'Cikis'"></DepoYeri>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </div>

                            <div v-if="item.StokKod">
                                <el-row :gutter="20">
                                    <el-col :xs="6" :lg="6" :span="2">
                                        <el-form-item label="Müşteri Sipariş No">
                                            <el-input prefix-icon="el-icon-search"
                                                      placeholder="Müşteri Sipariş No"
                                                      v-model="item.MusteriSiparisNo"></el-input>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :xs="6" :lg="6" :span="2">
                                        <el-form-item label="İrsaliye No">
                                            <el-input prefix-icon="el-icon-search"
                                                      placeholder="İrsaliye No"
                                                      v-model="item.EvrakNo"></el-input>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :xs="12" :lg="12" :span="2">
                                        <el-form-item label="Açıklama">
                                            <el-input placeholder="Açıklama"
                                                      v-model="item.Aciklama"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </div>


                            <el-row>
                                <el-col :xs="24" :lg="24" class="mt-20">
                                    <el-button type="danger" style="float:left;" @click="stokHareketVisible = false">
                                        Vazgeç
                                    </el-button>
                                    <el-button type="primary" style="float:right;"
                                               @click="saveStokHareket();">Kaydet
                                    </el-button>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>

                </el-row>
            </el-form>
        </el-dialog>

        <div id="tStokHareketleri" class="tableDiv bg-white card-shadow--small b-rad-4 box grow scrollable"
             v-loading="resizing || isLoading"
             :style="{ 'height': tableHeight + 'px' }">
            <el-table :data="gridData" @cell-click="this.selectTableElement" size="small"
                      @row-dblclick="selectItem" resizable border :height="this.tableHeight">
                <el-table-column
                        label="No"
                        min-width="80"
                        type="index"
                        border
                        :index="calcRowNum"
                        highlight-current-row
                        fixed
                >
                </el-table-column>
                <el-table-column
                        prop="StokKod"
                        label="Stok Kodu"
                        min-width="100"
                        fixed
                >
                </el-table-column>
                <el-table-column
                        prop="stok_tanim"
                        label="Stok Adı"
                        min-width="200"
                >
                </el-table-column>
                <el-table-column
                        prop="VariantKod"
                        label="Variant Kodu"
                        min-width="100"
                >
                </el-table-column>
                <el-table-column
                        prop="variant_tanim"
                        label="Variant Adı"
                        min-width="200"
                >
                </el-table-column>
                <el-table-column
                        prop="GirisMiktari"
                        label="Giriş Miktarı"
                        min-width="100"
                >
                </el-table-column>
                <el-table-column
                        prop="CikisMiktari"
                        label="Çıkış Miktari"
                        min-width="100"
                >
                </el-table-column>
                <el-table-column
                        prop="StokBirim"
                        label="Birim">
                </el-table-column>
                <el-table-column
                        prop="KabulGirisMiktari"
                        label="Kabul Giriş Miktarı"
                        min-width="150"
                >
                </el-table-column>
                <el-table-column
                        prop="KabulCikisMiktari"
                        label="Kabul Çıkış Miktarı"
                        min-width="150"
                >
                </el-table-column>
                <el-table-column
                        prop="GirisYeri"
                        label="Giriş Yeri"
                >
                </el-table-column>
                <el-table-column
                        prop="GirisTuru"
                        label="Giriş Türü"
                >
                </el-table-column>
                <el-table-column
                        prop="CikisYeri"
                        label="Çıkış Yeri"
                >
                </el-table-column>
                <el-table-column
                        prop="CikisTuru"
                        label="Çıkış Türü"
                >
                </el-table-column>
                <el-table-column
                        prop="EvrakNo"
                        label="Evrak No"
                >
                </el-table-column>
                <el-table-column
                        prop="KaynakProgram"
                        label="Kaynak Program"
                        min-width="150"
                >
                </el-table-column>
                <el-table-column
                        prop="MusteriSiparisNo"
                        label="Müş Sip No"
                        min-width="100"
                >
                </el-table-column>
                <el-table-column
                        prop="SatinalmaSipId"
                        label="Sat Sip No"
                        min-width="100"
                >
                </el-table-column>
                <el-table-column
                        prop="ImalatSiparisid"
                        label="Imlt Sip No"
                        min-width="100"
                >
                </el-table-column>
                <el-table-column
                        prop="KullaniciNo"
                        label="Kullanıcı No"
                        min-width="100"
                >
                </el-table-column>
                <el-table-column
                        prop="KayitTarihi"
                        label="Kayıt Tarihi"
                        min-width="100"
                >
                </el-table-column>
                <el-table-column
                        prop="KullaniciNo_1"
                        label="Son Değişen Kull"
                        min-width="120"
                >
                </el-table-column>
                <el-table-column
                        prop="KayitTarihi_1"
                        label="Son Değişiklik"
                        min-width="120"
                >
                </el-table-column>
            </el-table>
        </div>

        <div class="block" v-loading="resizing || isLoading">
            <el-pagination
                    v-if="paginateFilter.pageTotal > 0"
                    @size-change="handleSizeChange"
                    @current-change="fetchData"
                    :current-page.sync="paginateFilter.page"
                    :page-sizes="paginateFilter.sizes"
                    :page-size="paginateFilter.size"
                    layout="sizes, prev, pager, next"
                    :total="paginateFilter.pageTotal"
            >
            </el-pagination>
        </div>

    </div>
</template>

<script>
    import StokKontrol_StokHareketleriService from "@/services/StokKontrol/StokHareketleri";
    import Filter from '@/core/filter';
    import DepoYeri from '@/components/Tanimlamalar/DepoYeri'
    import GirisTuru from '@/components/Tanimlamalar/GirisTuru'
    import CikisTuru from '@/components/Tanimlamalar/CikisTuru'
    import VariantArama from '@/components/Aramalar/VariantArama'

    const paginateFilter = {
        pageTotal: 0,
        size: 20,
        page: 1,
        sizes: [10, 20, 50, 100, 500, 1000],

        StokKod1: null,
        StokKod2: null,
        VariantKod1: null,
        VariantKod2: null,
        GirisTuru: null,
        GirisYeri: null,
        CikisTuru: null,
        CikisYeri: null,
        Tarih1: new Date((new Date).getFullYear(), (new Date).getMonth() - 1, 1),
        Tarih2: new Date()
    };

    export default {
        components:
            {
                DepoYeri,
                GirisTuru,
                CikisTuru,
                VariantArama
            },
        data()
        {
            return {
                Filter,
                paginateFilter,
                gridStoklar: null,
                gridData: [],
                resizing: false,
                //isLoading: true,
                filterOuterVisible: false,
                stokHareketVisible: false,
                variantAramaVisible: false,
                item: {},
                hareketTuru: 'Giris',
                pickerOptions: {
                    disabledDate(time)
                    {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [
                        {
                            text: 'Bugün',
                            onClick(picker)
                            {
                                picker.$emit('pick', new Date());
                            }
                        },
                        {
                            text: 'Dün',
                            onClick(picker)
                            {
                                let date = new Date();
                                picker.$emit('pick', new Date().getDate() - 2);
                            }
                        },
                        {
                            text: 'Ayın İlk Günü',
                            onClick(picker)
                            {
                                let date = new Date();
                                picker.$emit('pick', new Date(date.getFullYear(), date.getMonth(), 1));
                            }
                        },
                        {
                            text: 'Ayın Son Günü',
                            onClick(picker)
                            {
                                let date = new Date();
                                picker.$emit('pick', new Date(date.getFullYear(), date.getMonth() + 1, 0));
                            }
                        },

                        {
                            text: 'Geçen Hafta Bugün',
                            onClick(picker)
                            {
                                let date = new Date();
                                date.setTime(date.getTime() - 1000 * (60 * 60 * 24 * 7));
                                picker.$emit('pick', date);
                            }
                        },
                        {
                            text: 'Ay Başı',
                            onClick(picker)
                            {
                                let date = new Date();
                                date.setTime(date.getTime() - 1000 * (60 * 60 * 24 * 30));
                                picker.$emit('pick', new Date(date.getFullYear(), date.getMonth(), 1));
                            }
                        },
                        {
                            text: 'Yıl Başı',
                            onClick(picker)
                            {
                                let date = new Date();
                                picker.$emit('pick', new Date(date.getFullYear(), 0, 1));
                            }
                        }
                    ]
                },
            }
        },
        mounted()
        {
            this.getAllDatas();
        },
        methods: {
            findVariant(model)
            {
                this.FillModel(model);
                this.variantAramaVisible = true;
            },

            getAllDatas(resetPage = true)
            {
                this.fetchData((resetPage ? 1 : this.paginateFilter.page));
            },

            handleResize: _.throttle(function (e)
            {
                if (!this.resizing)
                {
                    this.resizing = true;
                    setTimeout(() =>
                    {
                        this.resizing = false;
                        this.tableHeight = document.getElementById('content').clientHeight - 130;
                    }, 1000);
                    setTimeout(() =>
                    {
                        //this.fetchData(-1)
                    }, 1500);
                }
            }, 1000),

            handleSizeChange(val)
            {
                this.fetchData(this.paginateFilter.page, val);
            },

            openDialog(item)
            {
                this.item = item;
                this.hareketTuru = 'Giris';
                if (item.CikisMiktari > 0)
                    this.hareketTuru = 'Cikis';
                this.stokHareketVisible = true
            },
            selectItem(row, column, event)
            {
                this.openItem(row.id);
            },

            openItem(id)
            {
                StokKontrol_StokHareketleriService
                    .GetById(id)
                    .then(response =>
                    {
                        if (response && response.data)
                            this.openDialog(response.data.data);
                    })
                    .catch(error =>
                    {
                        this.ShowMsg('error', error.errors, 'Hata');
                    });
            },

            calcRowNum(index)
            {
                return index + 1 + ((paginateFilter.page - 1) * paginateFilter.size);
            },

            fetchData(page = 1, size = null)
            {
                if (page != -1)
                {
                    if (page > 0)
                        this.paginateFilter.page = page;
                    else
                        this.paginateFilter.page = 1;
                }

                if (!_.isNull(size))
                    this.paginateFilter.size = size;

                if (!_.isEmpty(this.paginateFilter.StokKod1) && _.isEmpty(this.paginateFilter.StokKod2))
                    this.paginateFilter.StokKod2 = this.paginateFilter.StokKod1;

                if (!_.isEmpty(this.paginateFilter.StokKod2) && _.isEmpty(this.paginateFilter.StokKod1))
                    this.paginateFilter.StokKod1 = this.paginateFilter.StokKod2;

                this.isLoading = true;

                StokKontrol_StokHareketleriService
                    .GetByPage(this.paginateFilter)
                    .then(response =>
                    {
                        if (response && response.data)
                        {
                            this.gridData = response.data.data.data;
                            this.paginateFilter.pageTotal = response.data.data.total;
                            this.isLoading = false;
                        }
                    })
                    .catch(error =>
                    {
                        alert(error);
                    });
            }
        },
        watch: {
            'variantAramaVisible': function (newVal, oldVal)
            {
                if (newVal === false && oldVal === true)
                {
                    var inData = this.GetInputData();
                    if (inData == null)
                        return;

                    if(inData[0] === 'paginateFilter.StokKod1')
                    {
                        this.paginateFilter.StokKod1 = inData[1].StokKod;
                    }
                    else if(inData[0] === 'paginateFilter.StokKod2')
                    {
                        this.paginateFilter.StokKod2 = inData[1].StokKod;
                    }
                    else if(inData[0] === 'paginateFilter.VariantKod1')
                    {
                        this.paginateFilter.StokKod1 = inData[1].StokKod;
                        this.paginateFilter.VariantKod1 = inData[1].VariantKod;
                    }
                    else if(inData[0] === 'paginateFilter.VariantKod2')
                    {
                        this.paginateFilter.StokKod2 = inData[1].StokKod;
                        this.paginateFilter.VariantKod2 = inData[1].VariantKod;
                    }

                }
            },
        },
    };
</script>


