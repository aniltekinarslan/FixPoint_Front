<template>
    <el-dialog
            title="Cari Arama"
            visible="true"
            width="1200px"
            append-to-body
            :close-on-click-modal="false"
            :close-on-press-escape="true"
            :destroy-on-close="true"
            @close="closeDialog"
    >
        <el-form label-width="120px" label-position="top">
            <el-row :gutter="15">
                <el-col :xs="21" :lg="21">
                    <div class="form-group">
                        <el-row>
                            <el-row>
                                <div id="tCariArama"
                                     class="tableDiv bg-white card-shadow--small b-rad-4 box grow scrollable"
                                     v-loading="resizing || isLoading"
                                     :style="{ 'height': 400 + 'px' }">
                                    <el-table :data="gridData" @cell-click="this.selectTableElement" size="small"
                                              resizable border height="400" @row-dblclick="selectStokKod">
                                        <el-table-column
                                                label="No"
                                                width="50"
                                                type="index"
                                                border
                                                :index="calcRowNum"
                                                highlight-current-row
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="CariKod"
                                                label="Cari Kodu"
                                                width="120"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="CariAdi"
                                                label="Cari Adı"
                                                width="230"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="KisaCariAdi"
                                                label="Kısa Adı"
                                                width="120"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="DovizKod"
                                                label="Döviz"
                                                width="60"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="HesapKod"
                                                label="Hesap P. Kodu"
                                                width="110"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="VergiNo"
                                                label="Vergi No"
                                                width="110"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="Sehir"
                                                label="Şehir"
                                                width="110"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="BolgeKod"
                                                label="Bölge"
                                                width="100"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                label="Aktif"
                                                width="65"
                                        >
                                            <template slot-scope="scope">
                                                <el-switch v-model="scope.row.Aktif" :active-value="1"
                                                           :inactive-value="0" disabled></el-switch>
                                            </template>
                                        </el-table-column>


                                        <el-table-column
                                                prop="Tel1"
                                                label="Tel 1"
                                                width="110"
                                        >
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </el-row>
                            <el-row>
                                <el-col :xs="4" :lg="4" :span="2">
                                    <el-form-item>
                                        <el-input prefix-icon="el-icon-search" placeholder="Cari Kodu"
                                                  v-model="paginateFilter.CariKod" @input="querySearch"></el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :xs="6" :lg="6" :span="2">
                                    <el-form-item>
                                        <el-input prefix-icon="el-icon-search" placeholder="Cari Adı"
                                                  v-model="paginateFilter.CariAdi" @input="querySearch"></el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :xs="4" :lg="4" :span="2">
                                    <el-form-item>
                                        <el-input prefix-icon="el-icon-search" placeholder="Kısa Adı"
                                                  v-model="paginateFilter.KisaCariAdi" @input="querySearch"></el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :xs="4" :lg="4">
                                    <el-form-item label="" label-width="110px">
                                        <el-select v-model="paginateFilter.KaraListe" placeholder="- Çalışma Durumu -"  @change="this.fetchData">
                                            <el-option key="" value="" label="Hepsi"></el-option>
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

                                <el-col :xs="5" :lg="5" :span="2">
                                    <el-form-item>
                                        <el-input prefix-icon="el-icon-search" placeholder="Yetkili Adı"
                                                  v-model="paginateFilter.AnaYetkiliAdi"
                                                  @input="querySearch"></el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :xs="4" :lg="4" :span="2">
                                    <el-form-item>
                                        <el-input prefix-icon="el-icon-search" placeholder="İl"
                                                  v-model="paginateFilter.Sehir" @input="querySearch"></el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :xs="4" :lg="4" :span="2">
                                    <el-form-item>
                                        <el-input prefix-icon="el-icon-search" placeholder="İlçe"
                                                  v-model="paginateFilter.Ilce" @input="querySearch"></el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :xs="4" :lg="4" :span="2">
                                    <el-form-item>
                                        <el-input prefix-icon="el-icon-search" placeholder="Ülke"
                                                  v-model="paginateFilter.Ulke" @input="querySearch"></el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :xs="4" :lg="4" :span="2">
                                    <el-form-item>
                                        <el-input prefix-icon="el-icon-search" placeholder="Özel Kod"
                                                  v-model="paginateFilter.OzelKod" @input="querySearch"></el-input>
                                    </el-form-item>
                                </el-col>

                            </el-row>
                        </el-row>
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

                    <el-row>
                        <el-col :xs="24" :lg="24">
                            <el-form-item label-width="0">
                                <el-radio-group v-model="paginateFilter.Aktiflik" @change="this.fetchData">
                                    <el-radio :label="1">Aktifler</el-radio>
                                    <el-radio :label="0">Pasifler</el-radio>
                                    <el-radio :label="2">Hepsi</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>

                </el-col>
            </el-row>
        </el-form>
    </el-dialog>
</template>

<script>
    import Muhasebe_CarilerService from "@/services/Muhasebe/MCariler";

    const paginateFilter = {
        pageTotal: 0,
        size: 20,
        page: 1,
        sizes: [10, 20, 50, 100, 500, 1000],

        CariKod: null,
        CariAdi: null,
        KisaCariAdi: null,
        KaraListe: '',
        AnaYetkiliAdi: null,
        Sehir: null,
        Ilce: null,
        Ulke: null,
        OzelKod: null,
        Aktiflik: 1,
    };

    export default {
        name: 'CariArama',
        props: ['visible', 'visibleModel'],
        data()
        {
            return {
                paginateFilter,
                data: [],
                params: [],
                item: {},
                gridData: [],
                searchTimeOut: null,
                isLoading: false,
            }
        },
        methods: {
            closeDialog()
            {
                this.$parent[this.visibleModel] = false;
            },
            selectStokKod(row)
            {
                this.$store.commit('app/setFilledData', row);
                this.closeDialog();
            },
            querySearch()
            {
                clearTimeout(this.searchTimeOut);
                this.searchTimeOut = setTimeout(t =>
                {
                    this.fetchData();
                }, 1000);
            },

            handleSizeChange(val)
            {
                this.fetchData(this.paginateFilter.page, val);
            },

            fetchData()
            {
                this.isLoading = true;

                Muhasebe_CarilerService
                    .Search(this.paginateFilter)
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
            },
            calcRowNum(index)
            {
                return index + 1 + ((paginateFilter.page - 1) * paginateFilter.size);
            },
        },
        mounted()
        {
            this.fetchData();
        }
    }
</script>