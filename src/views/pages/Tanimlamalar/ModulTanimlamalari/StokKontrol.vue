<template>
    <div class="page-table column scrollable only-y" id="content" :class="{'flex':!isMobile, 'overflow':isMobile}">

        <resize-observer @notify="handleResize"/>

        <el-tabs :tab-position="tabPosition" @tab-click="handleTabClick">

            <el-tab-pane label="Malzeme Grupları">
                <div v-show="activeTab == 0">

                    <el-dialog
                            title="Malzeme Grubu"
                            :visible.sync="dialogData[0]"
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

                                        <el-col :xs="24" :lg="12">
                                            <el-form-item label="Grup Kodu">
                                                <el-input prefix-icon="el-icon-search" placeholder="Grup Kodu"
                                                          v-model="item.GrupKod" :disabled="item.is_used"></el-input>
                                            </el-form-item>
                                        </el-col>

                                        <el-col :xs="24" :lg="12">
                                            <el-form-item label="Açıklama">
                                                <el-input prefix-icon="el-icon-search" placeholder="Açıklama"
                                                          v-model="item.Aciklama"></el-input>
                                            </el-form-item>
                                        </el-col>

                                        <el-col :xs="24" :lg="24">
                                            <el-form-item>
                                                <el-col :xs="12" :lg="12">
                                                    <span>Malzeme Grubu 1'e Dahil </span>
                                                    <el-switch v-model="item.Grup1" :active-value="1"
                                                               @change="checkChange(1)"
                                                               :inactive-value="0" :disabled="item.is_used"></el-switch>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item>
                                                <el-col :xs="12" :lg="12">
                                                    <span>Malzeme Grubu 2'e Dahil </span>
                                                    <el-switch v-model="item.Grup2" :active-value="1"
                                                               @change="checkChange(2)"
                                                               :inactive-value="0" :disabled="item.is_used"></el-switch>
                                                </el-col>
                                                <el-col :xs="12" :lg="12" v-if="item.Grup2 == 1">

                                                    <MalzemeGrubu v-model="item.Grup2UstKod" :level="1"></MalzemeGrubu>

                                                </el-col>
                                            </el-form-item>
                                            <el-form-item>
                                                <el-col :xs="12" :lg="12">
                                                    <span>Malzeme Grubu 3'e Dahil </span>
                                                    <el-switch v-model="item.Grup3" :active-value="1"
                                                               @change="checkChange(3)"
                                                               :inactive-value="0" :disabled="item.is_used"></el-switch>
                                                </el-col>
                                                <el-col :xs="12" :lg="12" v-if="item.Grup3 == 1">
                                                    <MalzemeGrubu v-model="item.Grup2UstKod" :level="2"></MalzemeGrubu>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item>
                                                <el-col :xs="12" :lg="12">
                                                    <span>Malzeme Grubu 4'e Dahil </span>
                                                    <el-switch v-model="item.Grup4" :active-value="1"
                                                               @change="checkChange(4)"
                                                               :inactive-value="0" :disabled="item.is_used"></el-switch>
                                                </el-col>
                                                <el-col :xs="12" :lg="12" v-if="item.Grup4 == 1">
                                                    <MalzemeGrubu v-model="item.Grup2UstKod" :level="3"></MalzemeGrubu>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item>
                                                <el-col :xs="12" :lg="12">
                                                    <span>Malzeme Grubu 5'e Dahil </span>
                                                    <el-switch v-model="item.Grup5" :active-value="1"
                                                               @change="checkChange(5)"
                                                               :inactive-value="0" :disabled="item.is_used"></el-switch>
                                                </el-col>
                                                <el-col :xs="12" :lg="12" v-if="item.Grup5 == 1">
                                                    <MalzemeGrubu v-model="item.Grup2UstKod" :level="4"></MalzemeGrubu>
                                                </el-col>
                                            </el-form-item>

                                        </el-col>

                                        <el-col :xs="24" :lg="24" class="mt-20">
                                            <el-button style="float:left;" type="info"
                                                       @click="item = {}; dialogData[0] = false">Vazgeç
                                            </el-button>
                                            <el-button style="float:right;" type="success"
                                                       @click="saveMalzemeGrubu()">
                                                Malzeme Grubu Kaydet
                                            </el-button>
                                        </el-col>

                                    </div>
                                </el-col>

                            </el-row>
                        </el-form>
                    </el-dialog>


                    <el-row>
                        <el-col :lg="24">
                            <div class="page-header header-primary card-base">
                                <el-row>
                                    <el-col :lg="18">
                                        <el-button type="success"
                                                   style="margin-right:10px;"
                                                   @click="openDialog({})" size="mini"
                                        ><i class="mdi mdi-plus-circle"/>Yeni Malzeme Grubu Ekle
                                        </el-button>
                                    </el-col>

                                    <el-col :lg="6">
                                        <div style="float:right;">
                                            <h1>Malzeme Grupları</h1>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :lg="24">

                            <div id="tMalzemeGrubu"
                                 class="tableDiv bg-white card-shadow--small b-rad-4 box grow scrollable only-y"
                                 v-loading="resizing || isLoading"
                                 :style="{ 'height': tableHeight + 'px' }">
                                <el-table :data="dataMalzemeGrubu" @cell-click="this.selectTableElement"
                                          @row-dblclick="selectItem" size="small" resizable border>
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
                                            prop="GrupKod"
                                            label="Grup Kodu"
                                            width="150"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                            prop="Aciklama"
                                            label="Açıklama"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                            prop="Grup1"
                                            label="Grup 1"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                            prop="Grup2"
                                            label="Grup 2"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                            prop="Grup2UstKod"
                                            label="Grup 2 Üst Kodu"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                            prop="Grup3"
                                            label="Grup 3"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                            prop="Grup3UstKod"
                                            label="Grup 3 Üst Kodu"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                            prop="Grup4"
                                            label="Grup 4"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                            prop="Grup4UstKod"
                                            label="Grup 4 Üst Kodu"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                            prop="Grup5"
                                            label="Grup 5"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                            prop="Grup5UstKod"
                                            label="Grup 5 Üst Kodu"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                            label="İşlem"
                                            width="200"
                                    >
                                        <template slot-scope="scope">
                                            <el-button size="mini" @click="openItem(scope.row.id)" type="primary"
                                                       icon="el-icon-edit" circle></el-button>
                                            <el-button size="mini" @click="deleteItem(scope.row)" type="danger"
                                                       icon="el-icon-delete" circle></el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>

                            <div class="block" v-if="!resizing">
                                <el-pagination
                                        v-if="paginateFilter.pageTotal > 0"
                                        @size-change="handleSizeChange"
                                        @current-change="fetchData"
                                        :current-page.sync="paginateFilter.page"
                                        :page-sizes="paginateFilter.sizes"
                                        :page-size="paginateFilter.size"
                                        layout="sizes, prev, pager, next"
                                        :total="paginateFilter.pageTotal"
                                        class="custom-pagination"
                                >
                                </el-pagination>
                            </div>

                        </el-col>
                    </el-row>

                </div>
            </el-tab-pane>

            <el-tab-pane label="Depolar">
                <div v-show="activeTab == 1">
                    <el-dialog
                            title="Depo"
                            :visible.sync="dialogData[1]"
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

                                        <el-col :xs="24" :lg="12">
                                            <el-form-item label="Depo Kodu">
                                                <el-input prefix-icon="el-icon-search" placeholder="Depo Kodu"
                                                          v-model="item.DepoKod" :disabled="item.is_used"></el-input>
                                            </el-form-item>
                                        </el-col>

                                        <el-col :xs="24" :lg="12">
                                            <el-form-item label="Depo Adı">
                                                <el-input prefix-icon="el-icon-search" placeholder="Depo Adı"
                                                          v-model="item.DepoAdi"></el-input>
                                            </el-form-item>
                                        </el-col>

                                        <el-col :xs="24" :lg="12">
                                            <el-form-item label="Depo Yeri">
                                                <DepoYeri v-model="item.DepoYeri" :disabled="item.is_used"></DepoYeri>
                                            </el-form-item>
                                        </el-col>

                                        <el-col :xs="24" :lg="12">
                                            <el-form-item>
                                                <span>Eksi Bakiye Kontrolü Yap </span>
                                                <el-switch v-model="item.EksiBakiyeKontroluYap" :active-value="1"
                                                           :inactive-value="0"></el-switch>
                                            </el-form-item>

                                        </el-col>

                                        <el-col :xs="24" :lg="12">
                                            <el-form-item>
                                                <span>Bakiyede Göster </span>
                                                <el-switch v-model="item.BakiyedeVarYok" active-value="Var"
                                                           inactive-value="Yok"></el-switch>
                                            </el-form-item>
                                        </el-col>


                                        <el-col :xs="24" :lg="24" class="mt-20">
                                            <el-button style="float:left;" type="info"
                                                       @click="item = {}; dialogData[1] = false">Vazgeç
                                            </el-button>
                                            <el-button style="float:right;" type="success"
                                                       @click="saveDepo()">
                                                Depo Kaydet
                                            </el-button>
                                        </el-col>

                                    </div>
                                </el-col>

                            </el-row>
                        </el-form>
                    </el-dialog>


                    <el-row>
                        <el-col :lg="24">
                            <div class="page-header header-primary card-base">
                                <el-row>
                                    <el-col :lg="18">
                                        <el-button type="success"
                                                   style="margin-right:10px;"
                                                   @click="openDialog({})" size="mini"
                                        ><i class="mdi mdi-plus-circle"/>Yeni Depo Ekle
                                        </el-button>
                                    </el-col>

                                    <el-col :lg="6">
                                        <div style="float:right;">
                                            <h1>Depolar</h1>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :lg="24">

                            <div id="tDepolar"
                                 class="tableDiv bg-white card-shadow--small b-rad-4 box grow scrollable only-y"
                                 v-loading="resizing || isLoading"
                                 :style="{ 'height': tableHeight + 'px' }">
                                <el-table :data="dataDepolar" @cell-click="this.selectTableElement"
                                          @row-dblclick="selectItem" size="small" resizable border>
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
                                            prop="DepoKod"
                                            label="Depo Kodu"
                                            width="150"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                            prop="DepoAdi"
                                            label="Depo Adı"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                            prop="DepoYeri"
                                            label="Depo Tipi"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                            prop="BakiyedeVarYok"
                                            label="Bakiyede Göster"
                                    >
                                        <template slot-scope="scope">
                                            <el-switch v-model="scope.row.BakiyedeVarYok" active-value="Var"
                                                       inactive-value="Yok" :disabled="true"></el-switch>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            prop="EksiBakiyeKontroluYap"
                                            label="Eksi Bakiye Kontrolü"
                                    >
                                        <template slot-scope="scope">
                                            <el-switch v-model="scope.row.EksiBakiyeKontroluYap" :active-value="1"
                                                       :inactive-value="0" :disabled="true"></el-switch>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            label="İşlem"
                                            width="200"
                                    >
                                        <template slot-scope="scope">
                                            <el-button size="mini" @click="openItem(scope.row.id)" type="primary"
                                                       icon="el-icon-edit" circle></el-button>
                                            <el-button size="mini" @click="deleteItem(scope.row)" type="danger"
                                                       icon="el-icon-delete" circle></el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>

                            <div class="block" v-if="!resizing">
                                <el-pagination
                                        v-if="paginateFilter.pageTotal > 0"
                                        @size-change="handleSizeChange"
                                        @current-change="fetchData"
                                        :current-page.sync="paginateFilter.page"
                                        :page-sizes="paginateFilter.sizes"
                                        :page-size="paginateFilter.size"
                                        layout="sizes, prev, pager, next"
                                        :total="paginateFilter.pageTotal"
                                        class="custom-pagination"
                                >
                                </el-pagination>
                            </div>

                        </el-col>
                    </el-row>
                </div>
            </el-tab-pane>

            <el-tab-pane label="Birimler">
                <div v-show="activeTab == 2">

                    <el-dialog
                            title="Birim"
                            :visible.sync="dialogData[2]"
                            width="15%"
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
                                            <el-form-item label="Birim Adı">
                                                <el-input prefix-icon="el-icon-search" placeholder="Birim Adı"
                                                          v-model="item.aciklama" :disabled="item.is_used"></el-input>
                                            </el-form-item>
                                        </el-col>

                                        <el-col :xs="24" :lg="24" class="mt-20">
                                            <el-button style="float:left;" type="info"
                                                       @click="item = {}; dialogData[2] = false">Vazgeç
                                            </el-button>
                                            <el-button style="float:right;" type="success"
                                                       @click="saveBirim()">
                                                Birim Kaydet
                                            </el-button>
                                        </el-col>

                                    </div>
                                </el-col>

                            </el-row>
                        </el-form>
                    </el-dialog>


                    <el-row>
                        <el-col :lg="24">
                            <div class="page-header header-primary card-base">
                                <el-row>
                                    <el-col :lg="18">
                                        <el-button type="success"
                                                   style="margin-right:10px;"
                                                   @click="openDialog({})" size="mini"
                                        ><i class="mdi mdi-plus-circle"/>Yeni Birim Ekle
                                        </el-button>
                                    </el-col>

                                    <el-col :lg="6">
                                        <div style="float:right;">
                                            <h1>Birimler</h1>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :lg="24">

                            <div id="tBirimler"
                                 class="tableDiv bg-white card-shadow--small b-rad-4 box grow scrollable only-y"
                                 v-loading="resizing || isLoading"
                                 :style="{ 'height': tableHeight + 'px' }">
                                <el-table :data="dataBirimler" @cell-click="this.selectTableElement"
                                          @row-dblclick="selectItem" size="small" resizable border>
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
                                            prop="aciklama"
                                            label="Açıklama"
                                            width="150"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                            label="İşlem"
                                            width="200"
                                    >
                                        <template slot-scope="scope">
                                            <el-button size="mini" @click="openItem(scope.row.id)" type="primary"
                                                       icon="el-icon-edit" circle></el-button>
                                            <el-button size="mini" @click="deleteItem(scope.row)" type="danger"
                                                       icon="el-icon-delete" circle></el-button>
                                        </template>
                                    </el-table-column>

                                </el-table>
                            </div>

                            <div class="block" v-if="!resizing">
                                <el-pagination
                                        v-if="paginateFilter.pageTotal > 0"
                                        @size-change="handleSizeChange"
                                        @current-change="fetchData"
                                        :current-page.sync="paginateFilter.page"
                                        :page-sizes="paginateFilter.sizes"
                                        :page-size="paginateFilter.size"
                                        layout="sizes, prev, pager, next"
                                        :total="paginateFilter.pageTotal"
                                        class="custom-pagination"
                                >
                                </el-pagination>
                            </div>

                        </el-col>
                    </el-row>
                </div>
            </el-tab-pane>

        </el-tabs>
    </div>
</template>

<script>
    import MalzemeGrubuService from "@/services/Tanimlamalar/ModulTanimlamalari/StokKontrol/MalzemeGrubu";
    import DepolarService from "@/services/Tanimlamalar/ModulTanimlamalari/StokKontrol/Depolar";
    import BirimlerService from "@/services/Tanimlamalar/ModulTanimlamalari/StokKontrol/Birimler";
    import DepoYeri from '@/components/Tanimlamalar/DepoYeri'
    import MalzemeGrubu from '@/components/Tanimlamalar/MalzemeGrubu'
    import {store} from "../../../../store";

    const paginateFilter = {
        pageTotal: 0,
        size: 20,
        page: 1,
        sizes: [10, 20, 50, 100, 500, 1000],
    };

    export default {
        components:
            {
                DepoYeri,
                MalzemeGrubu
            },
        data()
        {
            return {
                paginateFilter,
                //isLoading: true,
                resizing: false,
                tabPosition: 'left',
                activeTab: 0,
                dialogData: [],
                item: {},

                dataMalzemeGruplari: [],

                dataMalzemeGrubu: [],
                dataDepolar: [],
                dataBirimler: [],
            };
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
                this.fetchDataTumGruplar();

            },

            save(servis, item)
            {
                servis.Save(item)
                      .then(response =>
                      {
                          if (response && response.data)
                          {
                              if (response.data.status)
                              {
                                  this.getAllDatas(false);
                                  this.dialogData[this.activeTab] = false;
                                  this.ShowMsg('success', response.data.message, response.data.title);
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

            saveBirim()
            {
                this.save(BirimlerService, this.item);
            },

            saveDepo()
            {
                this.save(DepolarService, this.item);
            },

            saveMalzemeGrubu()
            {
                if (this.item.Grup1 != 1
                    && this.item.Grup2 != 1
                    && this.item.Grup3 != 1
                    && this.item.Grup4 != 1
                    && this.item.Grup5 != 1)
                {
                    this.ShowMsg('error', 'Malzeme grubu bir gruba dahil olmalıdır!', 'Hata');
                    return;
                }

                this.save(MalzemeGrubuService, this.item);
            },

            checkChange(val)
            {
                let checkCount = 0;
                if (this.item.Grup1 == 1) checkCount++;
                if (this.item.Grup2 == 1) checkCount++;
                if (this.item.Grup3 == 1) checkCount++;
                if (this.item.Grup4 == 1) checkCount++;
                if (this.item.Grup5 == 1) checkCount++;

                if (checkCount > 1)
                {
                    this.ShowMsg('error', 'Malzeme grubu sadece 1 gruba dahil olabilir, çoklu seçim yapamazsınız!', 'Hata');

                    if (val == 1) this.item.Grup1 = 0;
                    if (val == 2) this.item.Grup2 = 0;
                    if (val == 3) this.item.Grup3 = 0;
                    if (val == 4) this.item.Grup4 = 0;
                    if (val == 5) this.item.Grup5 = 0;
                }
            },

            openItem(id)
            {
                let service = null;

                if (this.activeTab == 0)
                    service = MalzemeGrubuService;
                else if (this.activeTab == 1)
                    service = DepolarService;
                else if (this.activeTab == 2)
                    service = BirimlerService;

                if (service == null)
                    return;

                service
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

            deleteItem(row)
            {
                let title = '';
                let service = null;

                if (this.activeTab == 0)
                {
                    service = MalzemeGrubuService;
                    title = row.Aciklama;
                }
                else if (this.activeTab == 1)
                {
                    service = DepolarService;
                    title = row.DepoAdi;
                }
                else if (this.activeTab == 2)
                {
                    service = BirimlerService;
                    title = row.aciklama;
                }

                if (service == null)
                    return;

                this.$dialog.confirm('<span class="dg-icon"></span>' + ' (' + title + ') ' + ' Silmek istediğinizden emin misiniz?', {
                    okText: 'Evet',
                    cancelText: 'Hayır'
                })
                    .then((dialog) =>
                    {
                        service
                            .DeleteById(row.id)
                            .then(response =>
                            {
                                if (response && response.data)
                                {
                                    if (response.data.status)
                                    {
                                        this.ShowMsg('success', response.data.message, response.data.title);
                                        this.fetchData(-1);
                                    }
                                    else
                                        this.ShowMsg('error', response.data.message, response.data.title);

                                    dialog.close();
                                }
                            })
                            .catch(error =>
                            {
                                console.log(error);
                            });
                    });
            },

            handleTabClick(tab, event)
            {
                //if (tab.index != this.activeTab)
                {
                    this.activeTab = tab.index;
                    this.paginateFilter = paginateFilter;
                    this.dialogData[0] = false;
                    this.dialogData[1] = false;
                    this.dialogData[2] = false;
                    this.fetchData();
                }
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

            selectItem(row, column, event)
            {
                this.openItem(row.id);
            },

            openDialog(item)
            {
                this.item = item;
                this.dialogData[this.activeTab] = true;
            },

            calcRowNum(index)
            {
                return index + 1 + ((paginateFilter.page - 1) * paginateFilter.size);
            },

            fetchDataTumGruplar()
            {
                MalzemeGrubuService
                    .GetByLevel(0)
                    .then(response =>
                    {
                        if (response && response.data)
                        {
                            this.dataMalzemeGruplari = response.data.data;
                            this.isLoading = false;
                        }
                    })
                    .catch(error =>
                    {
                        this.ShowMsg('error', error.errors, 'Hata');
                    });
            },


            fetchData(page = 0, size = this.paginateFilter.size)
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

                if (this.activeTab == 0)
                {
                    MalzemeGrubuService
                        .GetByPage(this.paginateFilter)
                        .then(response =>
                        {
                            if (response && response.data)
                            {
                                this.dataMalzemeGrubu = response.data.data.data;
                                this.paginateFilter.pageTotal = response.data.data.total;
                                this.isLoading = false;
                            }
                        })
                        .catch(error =>
                        {
                            alert(error);
                        });
                }

                else if (this.activeTab == 1)
                {
                    DepolarService
                        .GetByPage(this.paginateFilter)
                        .then(response =>
                        {
                            if (response && response.data)
                            {
                                this.dataDepolar = response.data.data.data;
                                this.paginateFilter.pageTotal = response.data.data.total;
                                this.isLoading = false;
                            }
                        })
                        .catch(error =>
                        {
                            alert(error);
                        });
                }

                else if (this.activeTab == 2)
                {
                    BirimlerService
                        .GetByPage(this.paginateFilter)
                        .then(response =>
                        {
                            if (response && response.data)
                            {
                                this.dataBirimler = response.data.data.data;
                                this.paginateFilter.pageTotal = response.data.data.total;
                                this.isLoading = false;
                            }
                        })
                        .catch(error =>
                        {
                            alert(error);
                        });
                }
            }
        },
    };
</script>
