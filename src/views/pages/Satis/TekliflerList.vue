<template>
    <div class="page-table column scrollable only-y" id="content" :class="{'flex':!isMobile, 'overflow':isMobile}">

        <resize-observer @notify="handleResize"/>

        <el-row>
            <el-col :lg="24">
                <div class="page-header header-primary card-base">
                    <el-row>
                        <el-col :lg="18">
                            <el-button type="success" @click="openDialog({})" icon="mdi mdi-library-plus" size="mini">
                                Yeni Teklif Ekle
                            </el-button>
                            <el-button type="primary" @click="filterOuterVisible = true" icon="mdi mdi-filter"
                                       style="margin-right:10px;" size="mini">
                                Filtrele
                            </el-button>

                            <el-tag v-if="!_.isNull(paginateFilter.Tarih1)">
                                <strong>Tarih 1: </strong> {{ paginateFilter.Tarih1.toLocaleDateString() }}
                            </el-tag>
                            <el-tag v-if="!_.isNull(paginateFilter.Tarih2)">
                                <strong>Tarih 2: </strong> {{ paginateFilter.Tarih2.toLocaleDateString() }}
                            </el-tag>
                            <el-tag v-if="!_.isNull(paginateFilter.MpsTarih1)">
                                <strong>Mps Tarih 1: </strong> {{ paginateFilter.MpsTarih1.toLocaleDateString() }}
                            </el-tag>
                            <el-tag v-if="!_.isNull(paginateFilter.MpsTarih2)">
                                <strong>Mps Tarih 2: </strong> {{ paginateFilter.MpsTarih2.toLocaleDateString() }}
                            </el-tag>
                            <el-tag v-if="!_.isNull(paginateFilter.SevkTarih1)">
                                <strong>Sevk Tarih 1: </strong> {{ paginateFilter.SevkTarih1.toLocaleDateString() }}
                            </el-tag>
                            <el-tag v-if="!_.isNull(paginateFilter.SevkTarih2)">
                                <strong>Sevk Tarih 2: </strong> {{ paginateFilter.SevkTarih2.toLocaleDateString() }}
                            </el-tag>
                            <el-tag v-if="!_.isNull(paginateFilter.TeslimTarih1)">
                                <strong>Teslim Tarih 1: </strong> {{ paginateFilter.TeslimTarih1.toLocaleDateString() }}
                            </el-tag>
                            <el-tag v-if="!_.isNull(paginateFilter.TeslimTarih2)">
                                <strong>Teslim Tarih 2: </strong> {{ paginateFilter.TeslimTarih2.toLocaleDateString() }}
                            </el-tag>

                            <el-tag closable @close="paginateFilter.Nosu = null; fetchData()"
                                    v-if="!_.isEmpty(paginateFilter.Nosu)">
                                <strong>Teklif No: </strong> {{ paginateFilter.Nosu }}
                            </el-tag>
                            <el-tag closable @close="paginateFilter.TeklifAdi = null; fetchData()"
                                    v-if="!_.isEmpty(paginateFilter.TeklifAdi)">
                                <strong>Teklif Adı Soyadı: </strong> {{ paginateFilter.TeklifAdi }}
                            </el-tag>
                            <el-tag closable @close="paginateFilter.KisaTeklifAdi = null; fetchData()"
                                    v-if="!_.isEmpty(paginateFilter.KisaTeklifAdi)">
                                <strong>Kısa Adı: </strong> {{ paginateFilter.KisaTeklifAdi }}
                            </el-tag>
                            <el-tag closable @close="paginateFilter.KaraListe = null; fetchData()"
                                    v-if="!_.isEmpty(paginateFilter.KaraListe)">
                                <strong>Çalışma Durumu: </strong> {{ paginateFilter.KaraListe }}
                            </el-tag>
                        </el-col>

                        <el-col :lg="6">
                            <div style="float:right;">
                                <h1>Tekliflar</h1>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>

        <Teklif visibleModel="teklifVisible" v-if="teklifVisible" :TeklifNo="item.Nosu"></Teklif>

        <el-dialog
                title="Filtrele"
                :visible.sync="filterOuterVisible"
                width="800px"
                align="center"
                append-to-body
                :close-on-click-modal="false"
                :close-on-press-escape="true"
        >
            <el-form label-width="90px" label-position="left" align="center">
                <el-row>
                    <el-col :xs="8" :lg="8">
                        <el-row>
                            <label class="el-form-item__label">Teklif Durumu </label>

                            <el-col :xs="24" :lg="24">
                                <el-col :xs="8" :lg="8">
                                    <el-checkbox v-model="paginateFilter.Aciklar" label="Açık" border size="mini"
                                                 true-label="E" false-label="H">
                                    </el-checkbox>
                                </el-col>
                                <el-col :xs="8" :lg="8">
                                    <el-checkbox v-model="paginateFilter.Kapalilar" label="Kapalı" border size="mini"
                                                 true-label="E" false-label="H">
                                    </el-checkbox>
                                </el-col>
                                <el-col :xs="8" :lg="8">
                                    <el-checkbox v-model="paginateFilter.Iptaller" label="İptal" border size="mini"
                                                 true-label="E" false-label="H">
                                    </el-checkbox>
                                </el-col>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :xs="13" :lg="13">
                                <el-form-item label="Teklif Tarihi">
                                    <el-date-picker
                                            v-model="paginateFilter.Tarih1"
                                            type="date"
                                            placeholder="Başlangıç"
                                            :clearable="false"
                                    >
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="7" :lg="7" :span="2">
                                <el-form-item label="">
                                    <el-date-picker
                                            v-model="paginateFilter.Tarih2"
                                            type="date"
                                            placeholder="Bitiş"
                                            :picker-options="pickerOptions"
                                            :clearable="false"
                                    >
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :xs="13" :lg="13">
                                <el-form-item label="MPS Tarihi">
                                    <el-date-picker
                                            v-model="paginateFilter.MpsTarih1"
                                            type="date"
                                            placeholder="Başlangıç"
                                            :clearable="false"
                                    >
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="7" :lg="7" :span="2">
                                <el-form-item label="">
                                    <el-date-picker
                                            v-model="paginateFilter.MpsTarih2"
                                            type="date"
                                            placeholder="Bitiş"
                                            :picker-options="pickerOptions"
                                            :clearable="false"
                                    >
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :xs="13" :lg="13">
                                <el-form-item label="Sevk Tarihi">
                                    <el-date-picker
                                            v-model="paginateFilter.SevkTarih1"
                                            type="date"
                                            placeholder="Başlangıç"
                                            :clearable="false"
                                    >
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="7" :lg="7" :span="2">
                                <el-form-item label="">
                                    <el-date-picker
                                            v-model="paginateFilter.SevkTarih2"
                                            type="date"
                                            placeholder="Bitiş"
                                            :picker-options="pickerOptions"
                                            :clearable="false"
                                    >
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :xs="13" :lg="13">
                                <el-form-item label="Teslim Tarihi">
                                    <el-date-picker
                                            v-model="paginateFilter.TeslimTarih1"
                                            type="date"
                                            placeholder="Başlangıç"
                                            :clearable="false"
                                    >
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="7" :lg="7" :span="2">
                                <el-form-item label="">
                                    <el-date-picker
                                            v-model="paginateFilter.TeslimTarih2"
                                            type="date"
                                            placeholder="Bitiş"
                                            :picker-options="pickerOptions"
                                            :clearable="false"
                                    >
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>


                    </el-col>
                    <el-col :xs="24" :lg="24" class="mt-20">
                        <el-button type="danger" style="float:left;" @click="filterOuterVisible = false">
                            Vazgeç
                        </el-button>
                        <el-button type="primary" style="float:right;"
                                   @click="fetchData(); filterOuterVisible = false;">Filtrele
                        </el-button>
                    </el-col>
                </el-row>
            </el-form>
        </el-dialog>

        <TeklifArama v-if="teklifAramaVisible" visibleModel='teklifAramaVisible'></TeklifArama>

        <div id="tTeklifler" class="tableDiv bg-white card-shadow--small b-rad-4 box grow scrollable only-y"
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
                        prop="Nosu"
                        label="Teklif No"
                        width="90">
                </el-table-column>
                <el-table-column
                        prop="TeklifNo2"
                        label="Teklif No 2"
                        width="150">
                </el-table-column>

                <el-table-column
                        prop="FirmaKodu"
                        label="Firma Kodu"
                        width="110"
                >
                </el-table-column>
                <el-table-column
                        prop="FirmaAdi"
                        label="Firma Adı"
                        width="220px">
                </el-table-column>
                <el-table-column
                        prop="Tarih"
                        label="Tarih"
                        width="150"
                >
                </el-table-column>
                <el-table-column
                        prop="SevkFirmaAdi"
                        label="Sevk Edilecek Müşteri Adı"
                        width="200"
                >
                </el-table-column>
                <el-table-column
                        prop="AsilCariAdi"
                        label="Asıl Müşteri Adı"
                        width="200"
                >
                </el-table-column>
                <el-table-column
                        prop="VerenYetkili"
                        label="Teklif Veren Yetkili"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="AlanYetkili"
                        label="Teklif Alan Yetkili"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="MFiyatKodu"
                        label="F. Kodu"
                        width="70">
                </el-table-column>
                <el-table-column
                        prop="MKdv"
                        label="Kdv"
                        width="50">
                </el-table-column>

                <el-table-column label="İptal" width="70">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.Iptal" active-value="E" active-color="#ff0000"
                                   inactive-value="H" disabled></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="Kapalı" width="70">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.Kapan" active-value="E" active-color="#a83232"
                                   inactive-value="H" disabled></el-switch>
                    </template>
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
    import TekliflerService from "@/services/Satis/Teklifler";
    import Filter from '@/core/filter';
    import Teklif from '@/components/Satis/Teklif'
    import TeklifArama from '@/components/Aramalar/TeklifArama'

    const paginateFilter = {
        pageTotal: 0,
        size: 20,
        page: 1,
        sizes: [10, 20, 50, 100, 500, 1000],

        Nosu: null,

        Tarih1: new Date((new Date).getFullYear(), (new Date).getMonth() - 1, 1),
        Tarih2: new Date(),
        MpsTarih1: null,
        MpsTarih2: null,
        SevkTarih1: null,
        SevkTarih2: null,
        TeslimTarih1: null,
        TeslimTarih2: null,
        Aciklar: 'E',
        Kapalilar: 'H',
        Iptaller: 'H',
    };

    export default {
        components:
            {
                Teklif,
                TeklifArama
            },
        data()
        {
            return {
                Filter,
                paginateFilter,
                gridData: [],
                resizing: false,
                filterOuterVisible: false,
                teklifVisible: false,
                teklifAramaVisible: false
            }
        },
        mounted()
        {
            this.getAllDatas();
            this.handleResize();
        },
        methods: {
            findTeklif(model)
            {
                this.FillModel(model);
                this.teklifAramaVisible = true;
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
                this.teklifVisible = true;
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

                let func = TekliflerService.GetByPage(this.paginateFilter);
                //if (true)
                //    func = TekliflerService.GetUrunBazliListe(this.paginateFilter);

                func.then(response =>
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
            'teklifAramaVisible': function (newVal, oldVal)
            {
                if (newVal === false && oldVal === true)
                {
                    var inData = this.GetInputData();
                    if (inData == null)
                        return;

                    this.paginateFilter.Nosu = inData[1].Nosu;
                }
            },
        },
    };
</script>
