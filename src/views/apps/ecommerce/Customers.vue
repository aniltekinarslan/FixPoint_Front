<template>
	<div class="page-ecommerce-customers flex column">
		
		<div class="page-header card-base header-accent">
			<h1>
				<span>Ecommerce customers</span>
				<button>new customer</button>
			</h1>
			<div class="flex justify-space-between">
				<el-breadcrumb separator="/">
					<el-breadcrumb-item :to="{ path: '/' }"><i class="mdi mdi-home-outline"></i></el-breadcrumb-item>
					<el-breadcrumb-item :to="{ path: '/ecommerce' }">Ecommerce</el-breadcrumb-item>
					<el-breadcrumb-item>Customers</el-breadcrumb-item>
				</el-breadcrumb>
				<input placeholder="Search...">
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
	name: 'EcommerceCustomers',
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
							title: 'CUSTOMER',
							name: 'mergeColumn1',
							childNames: ['photo', 'name']
						},
						{
							title: 'CONTACTS',
							name: 'mergeColumn2',
							childNames: ['email', 'phone']
						},
						{
							title: 'LOCATION',
							name: 'mergeColumn3',
							childNames: ['city', 'address']
						},
						{
							title: 'STATS',
							name: 'mergeColumn4',
							childNames: ['total_spent', 'products', 'start_date', 'avg_session']
						}
					]
				},
				columnOptions: {
					//minWidth: 100,
					frozenCount: frozenCount
				},
				columns: [
					{
						title: 'Photo',
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
						title: 'Email',
						name: 'email',
						minWidth: 200,
						sortable: true,
					},
					{
						title: 'Phone',
						name: 'phone',
						minWidth: 200,
						sortable: true,
					},
					{
						title: 'City',
						name: 'city',
						minWidth: 200,
						sortable: true
					},
					{
						title: 'Address',
						name: 'address',
						minWidth: 200,
						sortable: true
					},
					{
						title: 'Total spent',
						name: 'total_spent',
						minWidth: 150,
						sortable: true,
						formatter: function(value) { return '<strong>$ '+_.replace(value.toString(), '.', ',')+'</strong>'; }
					},
					{
						title: 'Products',
						name: 'products',
						minWidth: 150,
						sortable: true
					},
					{
						title: 'Start date',
						name: 'start_date',
						minWidth: 150,
						sortable: true
					},
					{
						title: 'Avg. Session',
						name: 'avg_session',
						minWidth: 150,
						sortable: true,
						formatter: function(value) { return value.toString()+' min'; }
					}
				],
				summary: {
					height: 30,
					position: 'bottom', // or 'top'
					columnContent: {
						total_spent: {
							template: function(valueMap) {
								return '<small>AVG: <strong>$ ' + valueMap.avg.toFixed(2) + '</strong></small>';
							}
						},
						products: {
							template: function(valueMap) {
								return '<small>AVG: <strong>' + valueMap.avg.toFixed(0) + '</strong></small>';
							}
						},
						avg_session: {
							template: function(valueMap) {
								return '<small>AVG: <strong>' + valueMap.avg.toFixed(0) + ' min</strong></small>';
							}
						}
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
					name: chance.name(),
					photo: '/static/images/users/user-'+chance.integer({ min: 0, max: 30 })+'.jpg',
					city: chance.city(),
					address: chance.address(),
					email: chance.email(),
					phone: chance.phone(),
					total_spent: chance.floating({ min: 10, max: 900, fixed: 2 }).toFixed(2).toString(),
					products: chance.integer({ min: 10, max: 300 }),
					start_date: chance.date({string: true, year: 2008}),
					avg_session: chance.integer({ min: 1, max: 30 }),
					id: number
				})
			})
		}
	},
	mounted() {
		this.initGridData()
		this.initGrid()		
	}
}
</script>

<style lang="scss">
@import '../../../assets/scss/_variables';

.page-ecommerce-customers {
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
					top: 3px;
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
	.page-ecommerce-customers {

		.page-header {
			.el-breadcrumb {
				display: none;
			}
		}
	}
}


@media (max-width: 480px) {
	.page-ecommerce-customers {

		.page-header {
			h1 {
				display: none;
			}
		}
	}
}
</style>


