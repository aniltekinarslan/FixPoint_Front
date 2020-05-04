<template>
	<div class="page-ecommerce-product-list flex column">

		<div class="page-header header-primary card-base header-accent">
			<h1>
				<span>{{ $route.meta.title }}</span>
				<el-button type="success"><i class="mdi mdi-plus-circle" /><br/>Yeni Stok Ekle</el-button>
			</h1>
			<div class="flex justify-space-between">
				<el-breadcrumb separator="/">
					<el-breadcrumb-item :to="{ path: '/' }"><i class="mdi mdi-home-outline"></i></el-breadcrumb-item>
					<el-breadcrumb-item>Stok Kontrol</el-breadcrumb-item>
					<el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
		</div>

		<resize-observer @notify="handleResize" />

		<div id="table-box" class="bg-white card-shadow--small b-rad-4 box grow" v-loading="resizing">
			<div id="grid" v-if="!resizing"></div>
		</div>

	</div>
</template>

<script>
import 'tui-grid/dist/tui-grid.min.css'
import tuiGrid from 'tui-grid'
import Chance from 'chance'
const chance = new Chance()

export default {
	name: 'EcommerceProductList',
	data() {
		return {
			grid: null,
			gridData: [],
			resizing: false,
			height: 300
		}
	},
	methods: {
		handleResize: _.throttle(function (e) {
			console.log('resize', this.resizing)
			if(!this.resizing) {
				this.resizing = true
				setTimeout(()=>{this.resizing = false;},1000)
				setTimeout(()=>{this.initGrid()},1500)
			}
		}, 1000),
		gotoNew() {
			this.$router.push({name:'ecommerce-new-product'})
		},
		initGrid() {
			this.height = document.getElementById('table-box').clientHeight - 71
			let frozenCount = window.innerWidth <= 768 ? 0 : 2
			
			this.grid = new tuiGrid({
				el: document.getElementById('grid'),
				//scrollX: false,
				virtualScrolling: true,
				bodyHeight: this.height,
				minRowHeight: 60,
				pagination: false,
				rowHeaders: ['rowNum'],
				header: {
					height: 50,
					complexColumns: [
						{
							title: 'PRODUCT',
							name: 'mergeColumn1',
							childNames: ['photo', 'name']
						},
						{
							title: 'NYC OUTLET',
							name: 'mergeColumn2',
							childNames: ['nyc_price', 'nyc_stock']
						},
						{
							title: 'MANHATTAN 77',
							name: 'mergeColumn3',
							childNames: ['mht_price', 'mht_stock']
						},
						{
							title: 'ROME BOUTIQUE',
							name: 'mergeColumn4',
							childNames: ['rom_price', 'rom_stock']
						},
						{
							title: 'MOBILIER PARISIEN',
							name: 'mergeColumn5',
							childNames: ['par_price', 'par_stock']
						},
						{
							title: 'BERLINER LADEN',
							name: 'mergeColumn6',
							childNames: ['ber_price', 'ber_stock']
						}
					]
				},
				columnOptions: {
					//minWidth: 100,
					frozenCount: frozenCount
				},
				columns: [
					{
						title: 'Image',
						name: 'photo',
						align: 'center',
						width: 60,
						formatter: function(value) {
							var url = value.toString();
							return '<img src="' + url + '" width="50" height="50" />';
						}
					},
					{
						title: 'Name',
						name: 'name',
						minWidth: 200,
						sortable: true,
						editOptions: {
							type: 'text',
							useViewMode: true
						}
					},
					{
						title: 'Status',
						name: 'stock',
						minWidth: 150,
						sortable: true,
						formatter: function(value) {
							var value = value.toString();
							return '<span class="' + _.kebabCase(value) + '">'+value+'</span>';
						}
					},
					{
						title: 'Category',
						name: 'category',
						minWidth: 150,
						sortable: true
					},
					{
						title: 'Price',
						name: 'nyc_price',
						sortable: true,
						minWidth: 100,
						align: 'center',
						formatter: function(value) { return '<strong>$ '+_.replace(value.toString(), '.', ',')+'</strong>'; }
					},
					{
						title: 'Stock',
						name: 'nyc_stock',
						sortable: true,
						minWidth: 100,
						align: 'center',
						formatter: function(value) { return '<strong>'+value.toString()+'</strong>'; }
					},
					{
						title: 'Price',
						name: 'mht_price',
						sortable: true,
						minWidth: 100,
						align: 'center',
						formatter: function(value) { return '<strong>$ '+_.replace(value.toString(), '.', ',')+'</strong>'; }
					},
					{
						title: 'Stock',
						name: 'mht_stock',
						sortable: true,
						minWidth: 100,
						align: 'center',
						formatter: function(value) { return '<strong>'+value.toString()+'</strong>'; }
					},
					{
						title: 'Price',
						name: 'rom_price',
						sortable: true,
						minWidth: 100,
						align: 'center',
						formatter: function(value) { return '<strong>$ '+_.replace(value.toString(), '.', ',')+'</strong>'; }
					},
					{
						title: 'Stock',
						name: 'rom_stock',
						sortable: true,
						minWidth: 100,
						align: 'center',
						formatter: function(value) { return '<strong>'+value.toString()+'</strong>'; }
					},
					{
						title: 'Price',
						name: 'par_price',
						sortable: true,
						minWidth: 100,
						align: 'center',
						formatter: function(value) { return '<strong>$ '+_.replace(value.toString(), '.', ',')+'</strong>'; }
					},
					{
						title: 'Stock',
						name: 'par_stock',
						sortable: true,
						minWidth: 100,
						align: 'center',
						formatter: function(value) { return '<strong>'+value.toString()+'</strong>'; }
					},
					{
						title: 'Price',
						name: 'ber_price',
						sortable: true,
						minWidth: 100,
						align: 'center',
						formatter: function(value) { return '<strong>$ '+_.replace(value.toString(), '.', ',')+'</strong>'; }
					},
					{
						title: 'Stock',
						name: 'ber_stock',
						sortable: true,
						minWidth: 100,
						align: 'center',
						formatter: function(value) { return '<strong>'+value.toString()+'</strong>'; }
					},
					{
						title: 'GUID',
						name: 'guid',
						minWidth: 300
					}
				],
				summary: {
					height: 30,
					position: 'bottom', // or 'top'
					columnContent: {
						nyc_price: {
							template: function(valueMap) {
								return '<small>AVG: <strong>$ ' + valueMap.avg.toFixed(2) + '</strong></small>';
							}
						},
						mht_price: {
							template: function(valueMap) {
								return '<small>AVG: <strong>$ ' + valueMap.avg.toFixed(2) + '</strong></small>';
							}
						},
						rom_price: {
							template: function(valueMap) {
								return '<small>AVG: <strong>$ ' + valueMap.avg.toFixed(2) + '</strong></small>';
							}
						},
						par_price: {
							template: function(valueMap) {
								return '<small>AVG: <strong>$ ' + valueMap.avg.toFixed(2) + '</strong></small>';
							}
						},
						ber_price: {
							template: function(valueMap) {
								return '<small>AVG: <strong>$ ' + valueMap.avg.toFixed(2) + '</strong></small>';
							}
						},
					}
				}
			});

			this.grid.setData(this.gridData)
		},
		initGridData() {
			const stock_list = ['In Stock', 'Out Of Stock', 'Awaiting']
			const cat_list = ['Dining chairs', 'Foldable chairs', 'Bar Stools', 'Garden chairs', 'Step stools', 'Junior chairs', 'High chairs', 'Fabric armchairs', 'Leather armchairs', 'Rattan armchairs', 'Swivel chairs', 'Office chairs']

			_.times(100, (number) => {
				this.gridData.push({
					name: chance.sentence({ words: 3 }),
					photo: '/static/images/shop/'+chance.integer({ min: 0, max: 19 })+'.jpg',
					stock: stock_list[chance.integer({ min: 0, max: stock_list.length-1 })],
					category: cat_list[chance.integer({ min: 0, max: cat_list.length-1 })],
					nyc_price: chance.floating({ min: 10, max: 300, fixed: 2 }).toFixed(2).toString(),
					nyc_stock: chance.integer({ min: 1, max: 500 }),
					mht_price: chance.floating({ min: 10, max: 300, fixed: 2 }).toFixed(2).toString(),
					mht_stock: chance.integer({ min: 1, max: 500 }),
					rom_price: chance.floating({ min: 10, max: 300, fixed: 2 }).toFixed(2).toString(),
					rom_stock: chance.integer({ min: 1, max: 500 }),
					par_price: chance.floating({ min: 10, max: 300, fixed: 2 }).toFixed(2).toString(),
					par_stock: chance.integer({ min: 1, max: 500 }),
					ber_price: chance.floating({ min: 10, max: 300, fixed: 2 }).toFixed(2).toString(),
					ber_stock: chance.integer({ min: 1, max: 500 }),
					guid: chance.guid(),
					id: number
				})
			})
		}
	},
	mounted() {
		this.initGridData();
		this.initGrid();
	}
}
</script>

<style lang="scss">
@import '../../../assets/scss/_variables';

.page-ecommerce-product-list {
	.page-header {
		margin-bottom: 8px;

		h1 {
			button {
				float: right;
				padding: 5px 10px;
				background: rgba(255, 255, 255, .2);
				text-transform: uppercase;
				border: none;
				outline: none;
				cursor: pointer;
				color: white;
				opacity: .8;
				font-family: inherit;

				i {
					position: relative;
					top: 2px;
				}

				&:hover {
					opacity: 1;
				}
			}
		}
		
		input {
			background: rgba(255, 255, 255, .2);
			border: none;
			outline: none;
			height: 20px;
			margin-top: 5px;
			padding: 4px 8px;
			min-width: 200px;
			font-family: inherit;
			color: white;
			font-size: 16px;
		}
	}

	#table-box {
		overflow: hidden;
	}

	#grid {
		.tui-grid-cell[data-column-name="photo"] {
			.tui-grid-cell-content {
				padding: 0; 
			}
		}

		.tui-grid-border-line-top {
			background-color: transparent;
		}
		.tui-grid-cell-head {
			border-top-color: transparent;
		}
	
		.tui-grid-cell-head[data-column-name="mergeColumn1"] ,
		.tui-grid-cell-head[data-column-name="mergeColumn2"] ,
		.tui-grid-cell-head[data-column-name="mergeColumn3"] ,
		.tui-grid-cell-head[data-column-name="mergeColumn4"] ,
		.tui-grid-cell-head[data-column-name="mergeColumn5"] ,
		.tui-grid-cell-head[data-column-name="mergeColumn6"] {
			background: #f4f4f4;
			color: #8e8e8e;
		}

		.tui-grid-cell-content {
			.awaiting {
				color: #9e9e9e;
				font-weight: bold;
			}
			.out-of-stock {
				color: #ff005c;
				font-weight: bold;
			}
			.in-stock {
				color: #1ac367;
				font-weight: bold;
			}
		}
	}
}


@media (max-width: 900px) {
	.page-ecommerce-product-list {

		.page-header {
			.el-breadcrumb {
				display: none;
			}
		}
	}
}

@media (max-width: 480px) {
	.page-ecommerce-product-list {

		.page-header {
			h1 {
				display: none;
			}
		}
	}
}
</style>


