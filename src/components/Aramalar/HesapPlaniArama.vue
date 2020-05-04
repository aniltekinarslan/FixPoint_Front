<template>
    <el-dialog
            title="Hesap Planı Arama"
            visible="true"
            width="1000px"
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
                                <div id="tHesapPlaniArama"
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
                                                prop="HesapKod"
                                                label="Hesap Kodu"
                                                width="120"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="HesapAdi1"
                                                label="Hesap Adı"
                                                width="200"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="DovizKod"
                                                label="Döviz"
                                                width="60"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="OzelKod1"
                                                label="Özel Kod 1"
                                                width="90"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="OzelKod2"
                                                label="Özel Kod 2"
                                                width="90"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="KarMerkezi"
                                                label="Kar Merkezi"
                                                width="110"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="DagitimKodu"
                                                label="Dağıtım Kodu"
                                                width="110"
                                        >
                                        </el-table-column>

                                        <el-table-column
                                                prop="HesapAdi2"
                                                label="Hesap Adı 2"
                                                width="200"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="CalismaSekli"
                                                label="Çalışma Şekli"
                                                width="130"
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

                                    </el-table>
                                </div>
                            </el-row>
                            <el-row>
                                <el-col :xs="5" :lg="5" :span="2">
                                    <el-form-item>
                                        <el-input prefix-icon="el-icon-search" placeholder="Hesap Kodu"
                                                  v-model="paginateFilter.HesapKod" @input="querySearch"></el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :xs="7" :lg="7" :span="2">
                                    <el-form-item>
                                        <el-input prefix-icon="el-icon-search" placeholder="Hesap Adı"
                                                  v-model="paginateFilter.HesapAdi1" @input="querySearch"></el-input>
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

                </el-col>
            </el-row>
        </el-form>
    </el-dialog>
</template>

<script>
    import Muhasebe_HesapPlanlariService from "@/services/Muhasebe/HesapPlanlari";

    const paginateFilter = {
        pageTotal: 0,
        size: 20,
        page: 1,
        sizes: [10, 20, 50, 100, 500, 1000],

        HesapKod: null,
        HesapAdi1: null,
    };

    export default {
        name: 'HesapPlaniArama',
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

                Muhasebe_HesapPlanlariService
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