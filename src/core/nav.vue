<template>
    <el-menu
            :router="true"
            :default-active.sync="activeLink"
            :mode="mode"
            @select="goto"
            :collapse="isCollapse"
            :unique-opened="true"
            background-color="transparent"
            class="main-navigation-menu"
            :class="{'nav-collapsed':isCollapse}"
    >
        <div class="el-menu-item-group__title" style="padding-top: 4px;"><span>Anasayfa</span></div>

        <el-menu-item index="Dashboard" :route="{name:'Dashboard'}">
            <i class="mdi mdi-home"></i><span slot="title">Bilgi Paneli</span>
        </el-menu-item>

		<el-submenu index="stok_kontrol" popper-class="main-navigation-submenu">
			<template slot="title">
				<i class="mdi mdi-stocking"></i><span>Stok Kontrol</span>
			</template>
			<el-menu-item index="stok_kontrol.stoklar.list" :route="{name:'stok_kontrol.stoklar.list'}">
				<span slot="title">Stoklar</span>
			</el-menu-item>
			<el-menu-item index="stok_kontrol.stok_hareketleri.list" :route="{name:'stok_kontrol.stok_hareketleri.list'}">
				<span slot="title">Stok Hareketleri</span>
			</el-menu-item>
			<el-menu-item index="stok_kontrol.stok_transferleri.list" :route="{name:'stok_kontrol.stok_transferleri.list'}">
				<span slot="title">Stok Transferleri</span>
			</el-menu-item>
			<el-menu-item index="stok_kontrol.envanter_sayimi.list" :route="{name:'stok_kontrol.envanter_sayimi.list'}">
				<span slot="title">Envanter Sayımı</span>
			</el-menu-item>
		</el-submenu>

		<el-submenu index="muhasebefinans" popper-class="main-navigation-submenu">
			<template slot="title">
				<i class="mdi mdi-monitor"></i><span>Muhasebe & Finans</span>
			</template>
			<el-menu-item index="muhasebefinans.muhasebe.list" :route="{name:'muhasebefinans.muhasebe.list'}">
				<span slot="title">Muhasebe</span>
			</el-menu-item>
			<el-menu-item index="muhasebefinans.banka.list" :route="{name:'muhasebefinans.banka.list'}">
				<span slot="title">Banka</span>
			</el-menu-item>
			<el-menu-item index="muhasebe.mcariler.list" :route="{name:'muhasebe.mcariler.list'}">
				<span slot="title">Cariler</span>
			</el-menu-item>
			<el-menu-item index="muhasebefinans.kasa.list" :route="{name:'muhasebefinans.kasa.list'}">
				<span slot="title">Kasa</span>
			</el-menu-item>
			<el-menu-item index="muhasebefinans.cek_senet.list" :route="{name:'muhasebefinans.cek_senet.list'}">
				<span slot="title">Çek & Senet</span>
			</el-menu-item>
			<el-menu-item index="muhasebefinans.irsaliye.list" :route="{name:'muhasebefinans.irsaliye.list'}">
				<span slot="title">İrsaliye</span>
			</el-menu-item>
			<el-menu-item index="muhasebefinans.fatura.list" :route="{name:'muhasebefinans.fatura.list'}">
				<span slot="title">Fatura</span>
			</el-menu-item>
			<el-menu-item index="muhasebefinans.devir.list" :route="{name:'muhasebefinans.devir.list'}">
				<span slot="title">Devir</span>
			</el-menu-item>
			<el-menu-item index="muhasebefinans.mizan.list" :route="{name:'muhasebefinans.mizan.list'}">
				<span slot="title">Mizan</span>
			</el-menu-item>
		</el-submenu>

		<el-submenu index="satiscrm" popper-class="main-navigation-submenu">
			<template slot="title">
				<i class="mdi mdi-account"></i><span>Satış & CRM</span>
			</template>
			<el-menu-item index="satiscrm.musteriler.list" :route="{name:'satiscrm.musteriler.list'}">
				<span slot="title">Müşteriler</span>
			</el-menu-item>
			<el-menu-item index="satiscrm.teklifler.list" :route="{name:'satiscrm.teklifler.list'}">
				<span slot="title">Teklifler</span>
			</el-menu-item>
			<el-menu-item index="satiscrm.siparisler.list" :route="{name:'satiscrm.siparisler.list'}">
				<span slot="title">Siparişler</span>
			</el-menu-item>
			<el-menu-item index="satiscrm.sevkiyat_irsaliye.list" :route="{name:'satiscrm.sevkiyat_irsaliye.list'}">
				<span slot="title">Sevkiyat & İrsaliye</span>
			</el-menu-item>
			<el-menu-item index="satiscrm.satis_iade_irsaliyeleri.list" :route="{name:'satiscrm.satis_iade_irsaliyeleri.list'}">
				<span slot="title">Satış - İade İrsaliyeleri</span>
			</el-menu-item>
		</el-submenu>

		<el-submenu index="satinalma" popper-class="main-navigation-submenu">
			<template slot="title">
				<i class="mdi mdi-buffer"></i><span>Satınalma</span>
			</template>
			<el-menu-item index="satinalma.tedarikciler.list" :route="{name:'satinalma.tedarikciler.list'}">
				<span slot="title">Tedarikçiler</span>
			</el-menu-item>
			<el-menu-item index="satinalma.teklifler.list" :route="{name:'satinalma.teklifler.list'}">
				<span slot="title">Teklifler</span>
			</el-menu-item>
			<el-menu-item index="satinalma.siparis_kabul.list" :route="{name:'satinalma.siparis_kabul.list'}">
				<span slot="title">Sipariş Kabul</span>
			</el-menu-item>
			<el-menu-item index="satinalma.iade_islemleri.list" :route="{name:'satinalma.iade_islemleri.list'}">
				<span slot="title">İade İşlemleri</span>
			</el-menu-item>
		</el-submenu>

		<el-submenu index="tanimlamalar" popper-class="main-navigation-submenu">
			<template slot="title">
				<i class="mdi mdi-desktop-classic"></i><span>Tanımlamalar</span>
			</template>
			<el-menu-item index="tanimlamalar.parametreler.list" :route="{name:'tanimlamalar.parametreler.list'}">
				<span slot="title">Parametreler</span>
			</el-menu-item>
			<el-menu-item index="tanimlamalar.kullanicilar" :route="{name:'tanimlamalar.kullanicilar.list'}">
				<span slot="title">Kullanıcılar</span>
			</el-menu-item>
			<el-menu-item index="tanimlamalar.yetkiler" :route="{name:'tanimlamalar.yetkiler.list'}">
				<span slot="title">Yetkiler</span>
			</el-menu-item>


			<el-submenu index="modul_tanimlamalari" popper-class="main-navigation-submenu">
				<template slot="title">
					<i class="mdi mdi-view-module"></i><span>Modül Tanımlamaları</span>
				</template>
				<el-menu-item index="tanimlamalar.modul_tanimlamalari.stok_kontrol.list" :route="{name:'tanimlamalar.modul_tanimlamalari.stok_kontrol.list'}">
					<span slot="title">Stok Kontrol</span>
				</el-menu-item>
				<el-menu-item index="tanimlamalar.modul_tanimlamalari.muhasebe_finans" :route="{name:'tanimlamalar.modul_tanimlamalari.muhasebe_finans.list'}">
					<span slot="title">Muhasebe & Finans</span>
				</el-menu-item>
				<el-menu-item index="tanimlamalar.modul_tanimlamalari.satiscrm" :route="{name:'tanimlamalar.modul_tanimlamalari.satiscrm.list'}">
					<span slot="title">Satış/CRM</span>
				</el-menu-item>
				<el-menu-item index="tanimlamalar.modul_tanimlamalari.satinalma" :route="{name:'tanimlamalar.modul_tanimlamalari.satinalma.list'}">
					<span slot="title">Satınalma</span>
				</el-menu-item>
			</el-submenu>


		</el-submenu>

    </el-menu>
</template>


<script>
    import {detect} from 'detect-browser'

    const browser = detect();

    export default {
        name: 'Nav',
        props: ['mode', 'isCollapse'],
        data()
        {
            return {
                isIe: true,
                isEdge: true,
                activeLink: null
            }
        },
        methods: {
            goto(index, indexPath)
            {
                if (index.charAt(0) === '/')
                {
                    this.$router.push(index);
                    this.$emit('push-page', {page: index})
                }

            },
            setLink(path)
            {
                this.activeLink = path
            }
        },
        created()
        {
            if (browser.name !== 'ie') this.isIe = false;
            if (browser.name !== 'edge') this.isEdge = false;

            this.setLink(this.$router.currentRoute.name);
            //this.$router.afterEach((to, from) =>
            //{
            //    this.setLink(this.$router.currentRoute.name)
            //    //console.log('afterEach', to, from)
            //})
            //console.log('this.$router.currentRoute.path', this.$router.currentRoute.path)
        },
        mounted()
        {
            //console.log('nav component mounted')
        }
    }
</script>

<style lang="scss" scoped>
    @import '../assets/scss/_variables';

    .el-menu {
        border: none;
    }

    .el-menu::before, .el-menu::after {
        display: none;
    }

    .el-submenu, .el-menu-item {
        .mdi {
            vertical-align: middle;
            margin-right: 5px;
            display: inline-block;
            width: 24px;
            text-align: center;
            font-size: 18px;
        }
    }
</style>

<style lang="scss">
    @import '../assets/scss/_variables';

    .main-navigation-menu {
        transition: width .5s;

        &:not(.el-menu--collapse) {
            .el-submenu__title, .el-menu-item {
                height: 40px;
                line-height: 40px;
                background-color: transparent !important;
            }

            &:not(.el-menu--horizontal) {
                .el-menu-item, .el-submenu {
                    position: relative;

                    &::before {
                        content: '';
                        display: block;
                        width: 0px;
                        height: 1px;
                        position: absolute;
                        bottom: 10px;
                        left: 30px;
                        background: $text-color;
                        z-index: 1;
                        opacity: 0;
                        transition: all .7s cubic-bezier(.55, 0, .1, 1);
                    }

                    &:hover {
                        &::before {
                            width: 100px;
                            opacity: 1;
                            //left: 50px;
                            transform: translate(20px, 0);
                        }
                    }

                    &.is-active {
                        &::before {
                            background: $text-color-accent;
                        }
                    }
                }
            }

            .el-submenu.is-opened {
                //background: #edf1f6 !important;
                //background: rgba(223, 228, 234, 0.38) !important;
                position: relative;

                &::after {
                    content: '';
                    display: block;
                    width: 2px;
                    position: absolute;
                    top: 40px;
                    bottom: 10px;
                    left: 31px;
                    background: $text-color;
                    z-index: 1;
                }

                &::before {
                    display: none;
                }

                .el-menu-item, .el-submenu {
                    &::before, &::after {
                        display: none;
                    }
                }
            }

            .el-menu-item-group__title {
                padding: 15px 0 0px 20px;
                color: transparentize($text-color, 0.65);
            }
        }

        .el-submenu__title, .el-menu-item:not(.is-active) {
            color: $text-color;

            i {
                color: $text-color;
            }
        }

        &.el-menu--collapse {
            .el-menu-item-group__title {
                padding: 15px 0 0px 0px;
                width: 100%;
                text-align: center;
            }

            .el-submenu__title:hover, .el-menu-item:hover {
                background-color: rgba(0, 0, 0, 0.05) !important;
            }
        }

        &.el-menu--horizontal {
            white-space: nowrap;
            /*width: fit-content;
            width: max-content;*/
            overflow: hidden;
            display: table;

            & > * {
                float: inherit !important;
                display: inline-block;
            }
        }

        &.nav-collapsed {
            .el-menu-item, .el-submenu__title {
                & > span {
                    display: none;
                }
            }
        }
    }

    .main-navigation-submenu {
        .el-menu {
            background: #fff !important;

            .el-menu-item:not(.is-active) {
                color: $text-color;
            }

            .el-menu-item:hover {
                background-color: transparentize($background-color, 0.3) !important;
            }
        }
    }
</style>
