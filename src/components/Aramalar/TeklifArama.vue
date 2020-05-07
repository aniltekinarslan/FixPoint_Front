<template>
    <el-dialog
            title="Teklif - Stok Arama"
            visible="true"
            width="1200px"
            align="center"
            append-to-body
            :close-on-click-modal="false"
            :close-on-press-escape="true"
            @close="closeDialog"
    >
        <el-form label-width="120px" label-position="top">
            <el-row :gutter="15">
                <el-col :xs="24" :lg="24">
                    <div class="form-group">
                        <el-row>
                            <el-row>
                                <div id="tTeklifArama"
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
                                                prop="StokKod"
                                                label="Stok Kodu"
                                                width="120"
                                                v-if="_.isEmpty(StokKodu)"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="TeklifKod"
                                                label="Teklif Kodu"
                                                width="120"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="Tanim"
                                                label="Teklif Tanim"
                                                width="290"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="stok.ParcaBilgisi"
                                                label="Stok Tipi"
                                                width="100"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="Genislik"
                                                label="En"
                                                width="50"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="Boy"
                                                label="Boy"
                                                width="50"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="Yukseklik"
                                                label="Yük"
                                                width="50"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="stok.ResimNo"
                                                label="Stok Resim No"
                                                width="120"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="vResimNo"
                                                label="Vrt. Resim No"
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
                                                label="Stoktaki Kadar Sip. Gir."
                                                width="150"
                                        >
                                            <template slot-scope="scope">
                                                <el-switch v-model="scope.row.StoktakiKadarSipGir" :active-value="1"
                                                           :inactive-value="0" disabled></el-switch>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                label="Sipariş Girilebilir"
                                                width="150"
                                        >
                                            <template slot-scope="scope">
                                                <el-switch v-model="scope.row.SiparisGirilebilir" :active-value="1"
                                                           :inactive-value="0" disabled></el-switch>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </el-row>
                            <el-row>
                                <el-col :xs="4" :lg="4" :span="2" v-if="_.isEmpty(StokKodu)">
                                    <el-form-item>
                                        <el-input prefix-icon="el-icon-search" placeholder="Stok Kodu"
                                                  v-model="paginateFilter.StokKod" @input="querySearch"></el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :xs="4" :lg="4" :span="2">
                                    <el-form-item>
                                        <el-input prefix-icon="el-icon-search" placeholder="Teklif Kodu"
                                                  v-model="paginateFilter.TeklifKod" @input="querySearch"></el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :xs="6" :lg="6" :span="2">
                                    <el-form-item>
                                        <el-input prefix-icon="el-icon-search" placeholder="Teklif Tanım"
                                                  v-model="paginateFilter.TeklifTanim" @input="querySearch"></el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :xs="6" :lg="6" :span="2">
                                    <el-form-item>
                                        <el-input prefix-icon="el-icon-search" placeholder="Kısa Tanım"
                                                  v-model="paginateFilter.KisaTanim" @input="querySearch"></el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :xs="4" :lg="4" :span="2">
                                    <el-form-item>
                                        <el-input prefix-icon="el-icon-search" placeholder="Resim No"
                                                  v-model="paginateFilter.vResimNo" @input="querySearch"></el-input>
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

            </el-row>
        </el-form>
    </el-dialog>
</template>

<script>
    import StokKontrol_TekliflerService from "@/services/Satis/Teklifler";

    const paginateFilter = {
        pageTotal: 0,
        size: 20,
        page: 1,
        sizes: [10, 20, 50, 100, 500, 1000],

        StokKod: null,
        TeklifKod: null,
        TeklifTanim: null,
        KisaTanim: null,
        vResimNo: null,
        SatisYap: null,
    };

    export default {
        name: 'TeklifArama',
        props: ['visible', 'visibleModel', 'name', 'SatisYapilabilir', 'StokKodu'],
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

                if(this.SatisYapilabilir)
                    this.paginateFilter.SatisYap = 'E';

                if(!_.isEmpty(this.StokKodu))
                    this.paginateFilter.SabitStokKod = this.StokKodu;

                StokKontrol_TekliflerService
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