<template>
    <div class="page-table column scrollable only-y" id="content" :class="{'flex':!isMobile, 'overflow':isMobile}">

        <resize-observer @notify="handleResize"/>

        <el-row>
            <el-col :lg="24">
                <div class="page-header header-primary card-base">
                    <el-row>
                        <el-col :lg="18">
                            <el-button type="success" @click="openDialog({})" icon="mdi mdi-library-plus" size="mini">
                                Yeni Cari Ekle
                            </el-button>
                            <el-button type="primary" @click="filterOuterVisible = true" icon="mdi mdi-filter"style="margin-right:10px;" size="mini">
                                Filtrele
                            </el-button>

                            <el-tag closable @close="paginateFilter.CariKod = null; fetchData()"
                                    v-if="!_.isEmpty(paginateFilter.CariKod)">
                                <strong>Cari Kodu: </strong> {{ paginateFilter.CariKod }}
                            </el-tag>
                            <el-tag closable @close="paginateFilter.CariAdi = null; fetchData()"
                                    v-if="!_.isEmpty(paginateFilter.CariAdi)">
                                <strong>Cari Adı Soyadı: </strong> {{ paginateFilter.CariAdi }}
                            </el-tag>
                            <el-tag closable @close="paginateFilter.KisaCariAdi = null; fetchData()"
                                    v-if="!_.isEmpty(paginateFilter.KisaCariAdi)">
                                <strong>Kısa Adı: </strong> {{ paginateFilter.KisaCariAdi }}
                            </el-tag>
                            <el-tag closable @close="paginateFilter.KaraListe = null; fetchData()"
                                    v-if="!_.isEmpty(paginateFilter.KaraListe)">
                                <strong>Çalışma Durumu: </strong> {{ paginateFilter.KaraListe }}
                            </el-tag>
                        </el-col>

                        <el-col :lg="6">
                            <div style="float:right;">
                                <h1>Carilar</h1>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>

        <MCari :visible="mcariVisible" v-if="mcariVisible" :CariKod="item.CariKod"></MCari>

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
                                <el-form-item label="Cari Kodu">
                                    <el-input placeholder="Cari Kodu" v-model="paginateFilter.CariKod" clearable>
                                        <i slot="prefix" class="mdi mdi-search-web"
                                           @click="findCari('paginateFilter.CariKod')"></i>
                                    </el-input>
                                </el-form-item>
                            </el-col>

                            <el-col :xs="24" :lg="12">
                                <el-form-item label="Cari Adı Soyadı">
                                    <el-input prefix-icon="el-icon-search" placeholder="Cari Adı Soyadı"
                                              v-model="paginateFilter.CariAdi"></el-input>
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

        <CariArama v-if="cariAramaVisible" visibleModel='cariAramaVisible'></CariArama>

        <div id="tMCariler" class="tableDiv bg-white card-shadow--small b-rad-4 box grow scrollable only-y"
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
                        prop="CariKod"
                        label="Cari Kodu"
                        width="150"
                >
                </el-table-column>
                <el-table-column
                        prop="CariAdi"
                        label="Cari Adı Soyadı">
                </el-table-column>
                <el-table-column
                        prop="KisaCariAdi"
                        label="Kısa Adı">
                </el-table-column>
                <el-table-column
                        prop="CariHesapTipi"
                        label="Cari Hesap Tipi">
                </el-table-column>
                <el-table-column
                        prop="YurtIciDisi"
                        label="Yurtiçi/Yurtdışı">
                </el-table-column>
                <el-table-column label="Aktif" width="70">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.Aktif" :active-value="1"
                                   :inactive-value="0" disabled></el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="KaraListe"
                        label="Çalışma Durumu">
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
    import MCarilerService from "@/services/Muhasebe/MCariler";
    import Filter from '@/core/filter';
    import MCari from '@/components/Muhasebe/MCari'
    import CariArama from '@/components/Aramalar/CariArama'

    const paginateFilter = {
        pageTotal: 0,
        size: 20,
        page: 1,
        sizes: [10, 20, 50, 100, 500, 1000],

        Kod: null,
        CariAdi: null,
        KisaCariAdi: null,
        KaraListe: null,
    };

    export default {
        components:
            {
                MCari,
                CariArama
            },
        data()
        {
            return {
                Filter,
                paginateFilter,
                gridData: [],
                resizing: false,
                filterOuterVisible: false,
                mcariVisible: false,
                cariAramaVisible: false
            }
        },
        mounted()
        {
            this.getAllDatas();
            this.handleResize();
        },
        methods: {
            findCari(model)
            {
                this.FillModel(model);
                this.cariAramaVisible = true;
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
                this.mcariVisible = true;
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

                MCarilerService
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
            },
            'cariAramaVisible': function (newVal, oldVal)
            {
                if (newVal === false && oldVal === true)
                {
                    var inData = this.GetInputData();
                    if (inData == null)
                        return;

                    this.paginateFilter.CariKod = inData[1].CariKod;
                }
            },
        },
    };
</script>
