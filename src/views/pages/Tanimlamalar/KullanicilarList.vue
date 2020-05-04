<template>
    <div class="page-table column scrollable only-y" id="content" :class="{'flex':!isMobile, 'overflow':isMobile}">

        <resize-observer @notify="handleResize"/>

        <el-row>
            <el-col :lg="24">
                <div class="page-header header-primary card-base">
                    <el-row>
                        <el-col :lg="18">
                            <el-button type="success" @click="openDialog({})" icon="mdi mdi-library-plus" size="mini">
                                Yeni Kullanıcı Ekle
                            </el-button>
                            <el-button type="primary" @click="filterOuterVisible = true" icon="mdi mdi-filter"style="margin-right:10px;" size="mini">
                                Filtrele
                            </el-button>

                            <el-tag closable @close="paginateFilter.SicilNo = null; fetchData()"
                                    v-if="!_.isEmpty(paginateFilter.SicilNo)">
                                <strong>Kullanıcı Kodu: </strong> {{ paginateFilter.SicilNo }}
                            </el-tag>
                            <el-tag closable @close="paginateFilter.Isim = null; fetchData()"
                                    v-if="!_.isEmpty(paginateFilter.Isim)">
                                <strong>Kullanıcı Adı Soyadı: </strong> {{ paginateFilter.Isim }}
                            </el-tag>
                            <el-tag closable @close="paginateFilter.Gorevi = null; fetchData()"
                                    v-if="!_.isEmpty(paginateFilter.Gorevi)">
                                <strong>Görevi: </strong> {{ paginateFilter.Gorevi }}
                            </el-tag>
                            <el-tag closable @close="paginateFilter.CalistigiBolum = null; fetchData()"
                                    v-if="!_.isEmpty(paginateFilter.CalistigiBolum)">
                                <strong>Çalıştığı Bölüm: </strong> {{ paginateFilter.CalistigiBolum }}
                            </el-tag>
                        </el-col>

                        <el-col :lg="6">
                            <div style="float:right;">
                                <h1>Kullanıcılar</h1>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>

        <Kullanici :visible="kullaniciVisible" v-if="kullaniciVisible" :SicilNo="item.SicilNo"></Kullanici>

        <el-dialog
                title="Filtrele"
                :visible.sync="filterOuterVisible"
                width="25%"
                align="center"
                append-to-body
                :close-on-click-modal="false"
                :close-on-press-escape="true"
        >
            <el-form label-width="120px" label-position="top" align="center">
                <el-row :gutter="15">
                    <el-col :xs="12" :lg="24">
                        <div class="form-group">

                            <el-col :xs="24" :lg="12">
                                <el-form-item label="Kullanici Kodu">
                                    <el-input prefix-icon="el-icon-search" placeholder="Kullanici Kodu"
                                              v-model="paginateFilter.SicilNo"></el-input>
                                </el-form-item>
                            </el-col>

                            <el-col :xs="24" :lg="12">
                                <el-form-item label="Kullanici Adı Soyadı">
                                    <el-input prefix-icon="el-icon-search" placeholder="Kullanici Adı Soyadı"
                                              v-model="paginateFilter.Isim"></el-input>
                                </el-form-item>
                            </el-col>

                            <el-col :xs="24" :lg="12">
                                <el-form-item label="Görevi">
                                    <el-input prefix-icon="el-icon-search" placeholder="Görevi"
                                              v-model="paginateFilter.Gorevi"></el-input>
                                </el-form-item>
                            </el-col>

                            <el-col :xs="24" :lg="12">
                                <el-form-item label="Çalıştığı Bölüm">
                                    <el-input prefix-icon="el-icon-search" placeholder="Çalıştığı Bölüm"
                                              v-model="paginateFilter.CalistigiBolum"></el-input>
                                </el-form-item>
                            </el-col>

                            <el-col :xs="24" :lg="24" class="mt-20">
                                <el-button @click="filterOuterVisible = false">Kapat</el-button>
                                <el-button type="primary" @click="fetchData(); filterOuterVisible = false;"  size="mini">Filtrele
                                </el-button>
                            </el-col>

                        </div>
                    </el-col>

                </el-row>
            </el-form>
        </el-dialog>

        <div id="tKullanicilar" class="tableDiv bg-white card-shadow--small b-rad-4 box grow scrollable only-y"
             v-loading="resizing || isLoading" :style="{ 'height': tableHeight + 'px' }">

            <el-table :data="gridData" @cell-click="this.selectTableElement" size="small"
                      @row-dblclick="selectItem" resizable border :height="this.tableHeight">
                <el-table-column
                        label="No"
                        width="80"
                        type="index"
                        border
                        :index="calcRowNum"
                        highlight-current-row
                >
                </el-table-column>
                <el-table-column
                        prop="SicilNo"
                        label="Kullanici Kodu"
                        width="150"
                >
                </el-table-column>
                <el-table-column
                        prop="Isim"
                        label="Kullanici Adı Soyadı">
                </el-table-column>
                <el-table-column
                        prop="Gorevi"
                        label="Görevi">
                </el-table-column>
                <el-table-column
                        prop="CalistigiBolum"
                        label="Çalıştığı Bölüm">
                </el-table-column>
                <el-table-column
                        prop="EPosta"
                        label="EPosta">
                </el-table-column>
                <el-table-column label="Aktif" width="70">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.Aktif" :active-value="1"
                                   :inactive-value="0" disabled></el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="SonSifreDegisikligi"
                        label="Son Şifre Değişikliği">
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
    import KullanicilarService from "@/services/Tanimlamalar/Kullanicilar";
    import Filter from '@/core/filter';
    import Kullanici from '@/components/Tanimlamalar/Kullanici'

    const paginateFilter = {
        pageTotal: 0,
        size: 20,
        page: 1,
        sizes: [10, 20, 50, 100, 500, 1000],

        Kod: null,
        Isim: null,
        KisaTanim: null,
        ResimNo: null,
        ParcaBilgisi: null,
        MalzemeGrubu1: null,
        MalzemeGrubu2: null,
    };

    export default {
        components:
            {
                Kullanici
            },
        data()
        {
            return {
                Filter,
                paginateFilter,
                gridData: [],
                resizing: false,
                //isLoading: true,
                filterOuterVisible: false,
                kullaniciVisible: false,
            }
        },
        mounted()
        {
            this.getAllDatas();
            this.handleResize();
        },
        methods: {

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
                this.kullaniciVisible = true;
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
                this.isLoading = true;

                KullanicilarService
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
            },

            selectItem(row, column, event)
            {
                this.openDialog(row);
            },
        },
        created()
        {

        },
        watch: {
            "paginateFilter.search": function (val)
            {
                clearTimeout(this.paginateFilter.searchTimeOut);
                this.paginateFilter.searchTimeOut = setTimeout(t =>
                {
                    this.fetchData(1, this.paginateFilter.size);
                }, 1000);
            },
            "paginateFilter.type": function (val)
            {
                if (!_.isEmpty(this.paginateFilter.search))
                    this.fetchData(1, this.paginateFilter.size);
            }
        },
    };
</script>
