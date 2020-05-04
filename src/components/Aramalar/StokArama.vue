<template>
    <el-dialog
            title="Stok Arama"
            visible="true"
            width="1100px"
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
                                <div id="tStokArama"
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
                                                prop="Kod"
                                                label="Stok Kodu"
                                                width="120"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="Isim"
                                                label="Stok Adı"
                                                width="250"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="KisaTanim"
                                                label="Kısa Tanım"
                                                width="150"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="ResimNo"
                                                label="Stok Resim No"
                                                width="120"
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
                                                prop="Birim"
                                                label="Birim"
                                                width="70"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="MalzemeGrubu1"
                                                label="MalzemeGrubu1"
                                                width="120"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="MalzemeGrubu2"
                                                label="MalzemeGrubu2"
                                                width="120"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="MalzemeGrubu3"
                                                label="MalzemeGrubu3"
                                                width="120"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="MalzemeGrubu4"
                                                label="MalzemeGrubu4"
                                                width="120"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="MalzemeGrubu5"
                                                label="MalzemeGrubu5"
                                                width="120"
                                        >
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </el-row>
                            <el-row>
                                <el-col :xs="4" :lg="4" :span="2">
                                    <el-form-item>
                                        <el-input prefix-icon="el-icon-search" placeholder="Stok Kodu"
                                                  v-model="paginateFilter.Kod" @input="querySearch"></el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :xs="6" :lg="6" :span="2">
                                    <el-form-item>
                                        <el-input prefix-icon="el-icon-search" placeholder="Stok Adı"
                                                  v-model="paginateFilter.Isim" @input="querySearch"></el-input>
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
                                                  v-model="paginateFilter.ResimNo" @input="querySearch"></el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :xs="4" :lg="4" :span="2">
                                    <el-form-item>
                                        <el-input prefix-icon="el-icon-search" placeholder="Malzeme Grubu"
                                                  v-model="paginateFilter.MalzemeGrubu" @input="querySearch"></el-input>
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
    import StokKontrol_StoklarService from "@/services/StokKontrol/Stoklar";

    const paginateFilter = {
        pageTotal: 0,
        size: 20,
        page: 1,
        sizes: [10, 20, 50, 100, 500, 1000],

        Kod: null,
        Isim: null,
        KisaTanim: null,
        ResimNo: null,
        MalzemeGrubu: null,
    };

    export default {
        name: 'StokArama',
        props: ['visible', 'visibleModel', 'name'],
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

                StokKontrol_StoklarService
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