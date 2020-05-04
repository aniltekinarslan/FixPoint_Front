<template>
    <div class="page-table column scrollable only-y" id="content" :class="{'flex':!isMobile, 'overflow':isMobile}">

        <resize-observer @notify="handleResize"/>

        <el-row>
            <el-col :lg="24">
                <div class="page-header header-primary card-base">
                    <el-row>
                        <el-col :lg="18">
                            <el-button type="success" @click="openDialog({})" icon="mdi mdi-library-plus" size="mini">
                                Yeni Stok Ekle
                            </el-button>
                            <el-button type="primary" @click="filterOuterVisible = true" icon="mdi mdi-filter"style="margin-right:10px;" size="mini">
                                Filtrele
                            </el-button>

                            <el-tag closable @close="paginateFilter.Kod = null; fetchData()"
                                    v-if="!_.isEmpty(paginateFilter.Kod)">
                                <strong>Stok Kodu: </strong> {{ paginateFilter.Kod }}
                            </el-tag>
                            <el-tag closable @close="paginateFilter.Isim = null; fetchData()"
                                    v-if="!_.isEmpty(paginateFilter.Isim)">
                                <strong>Stok Adı: </strong> {{ paginateFilter.Isim }}
                            </el-tag>
                            <el-tag closable @close="paginateFilter.KisaTanim = null; fetchData()"
                                    v-if="!_.isEmpty(paginateFilter.KisaTanim)">
                                <strong>Kısa Tanım: </strong> {{ paginateFilter.KisaTanim }}
                            </el-tag>
                            <el-tag closable @close="paginateFilter.ResimNo = null; fetchData()"
                                    v-if="!_.isEmpty(paginateFilter.ResimNo)">
                                <strong>Resim No: </strong> {{ paginateFilter.ResimNo }}
                            </el-tag>
                            <el-tag closable @close="paginateFilter.MalzemeGrubu1 = null; fetchData()"
                                    v-if="!_.isEmpty(paginateFilter.MalzemeGrubu1)">
                                <strong>Malzeme Grubu 1: </strong> {{ paginateFilter.MalzemeGrubu1 }}
                            </el-tag>
                            <el-tag closable @close="paginateFilter.MalzemeGrubu2 = null; fetchData()"
                                    v-if="!_.isEmpty(paginateFilter.MalzemeGrubu2)">
                                <strong>Malzeme Grubu 2: </strong> {{ paginateFilter.MalzemeGrubu2 }}
                            </el-tag>
                        </el-col>

                        <el-col :lg="6">
                            <div style="float:right;">
                                <h1>Stoklar</h1>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>

        <StokKarti :visible="stokKartiVisible" v-if="stokKartiVisible" :Kod="item.Kod"></StokKarti>

        <el-dialog
                title="Filtrele"
                :visible.sync="filterOuterVisible"
                width="400px"
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
                                <el-form-item label="Stok Kodu">
                                    <el-input placeholder="Stok Kodu" v-model="paginateFilter.Kod" clearable>
                                        <i slot="prefix" class="mdi mdi-search-web"
                                           @click="findStok('paginateFilter.Kod')"></i>
                                    </el-input>
                                </el-form-item>
                            </el-col>

                            <el-col :xs="24" :lg="12">
                                <el-form-item label="Resim No">
                                    <el-input prefix-icon="el-icon-search" placeholder="Resim No"
                                              v-model="paginateFilter.ResimNo"></el-input>
                                </el-form-item>
                            </el-col>

                            <el-col :xs="24" :lg="12">
                                <el-form-item label="Stok Adı">
                                    <el-input prefix-icon="el-icon-search" placeholder="Stok Adı"
                                              v-model="paginateFilter.Isim"></el-input>
                                </el-form-item>
                            </el-col>

                            <el-col :xs="24" :lg="12">
                                <el-form-item label="Kısa Tanım">
                                    <el-input prefix-icon="el-icon-search" placeholder="Kısa Tanım"
                                              v-model="paginateFilter.KisaTanim"></el-input>
                                </el-form-item>
                            </el-col>

                            <el-col :xs="24" :lg="12">
                                <el-form-item label="Malzeme Grubu 1">
                                    <el-input prefix-icon="el-icon-search" placeholder="Malzeme Grubu 1"
                                              v-model="paginateFilter.MalzemeGrubu1"></el-input>
                                </el-form-item>
                            </el-col>

                            <el-col :xs="24" :lg="12">
                                <el-form-item label="Malzeme Grubu 2">
                                    <el-input prefix-icon="el-icon-search" placeholder="Malzeme Grubu 2"
                                              v-model="paginateFilter.MalzemeGrubu2"></el-input>
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

        <StokArama v-if="stokAramaVisible" visibleModel='stokAramaVisible'></StokArama>

        <div id="tStoklar" class="tableDiv bg-white card-shadow--small b-rad-4 box grow scrollable only-y"
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
                        prop="Kod"
                        label="Stok Kodu"
                        width="150"
                >
                </el-table-column>
                <el-table-column
                        prop="Isim"
                        label="Stok Adı"
                >
                </el-table-column>
                <el-table-column
                        prop="KisaTanim"
                        label="Kısa Tanım"
                >
                </el-table-column>
                <el-table-column
                        prop="MalzemeGrubu1"
                        label="Malzeme Grubu 1"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="MalzemeGrubu2"
                        label="Malzeme Grubu 2">
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
    import StokKontrol_StoklarService from "@/services/StokKontrol/Stoklar";
    import Filter from '@/core/filter';
    import StokArama from '@/components/Aramalar/StokArama'
    import StokKarti from '@/components/StokKontrol/StokKarti'

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
                StokArama,
                StokKarti
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
                stokKartiVisible: false,
                stokAramaVisible: false,
                lastSelectedInputParentName: null,
                lastSelectedInputName: null,
                lastSelectedInputTargetName: null,
            }
        },
        mounted()
        {
            this.getAllDatas();
            this.handleResize();
        },
        methods: {
            findStok(model)
            {
                this.FillModel(model);
                this.stokAramaVisible = true;
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
                this.stokKartiVisible = true;
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

                StokKontrol_StoklarService
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
            'stokAramaVisible': function (newVal, oldVal)
            {
                if (newVal === false && oldVal === true)
                {
                    var inData = this.GetInputData();
                    if (inData == null)
                        return;

                    this.paginateFilter.Kod = inData[1].Kod;
                }
            },
        },
    };
</script>
