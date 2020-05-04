<template>
	<div class="page-tui-grid flex column">
		<div class="page-header card-base header-accent">
			<h1>TUI Grid</h1>
			<h4><a href="http://ui.toast.com/tui-grid/" target="_blank" class="white-text" style="text-decoration-color: white;">TOAST UI Grid</a> is a powerful widget which allows you to visualize and edit data via its table representation</h4>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }"><i class="mdi mdi-home-outline"></i></el-breadcrumb-item>
				<el-breadcrumb-item>Components</el-breadcrumb-item>
				<el-breadcrumb-item>Tables</el-breadcrumb-item>
				<el-breadcrumb-item>TUI Grid</el-breadcrumb-item>
			</el-breadcrumb>
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
	name: 'TuiGrid',
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
		initGrid() {
			this.height = document.getElementById('table-box').clientHeight - 71
			let frozenCount = window.innerWidth <= 768 ? 0 : 2
			
			this.grid = new tuiGrid({
				el: document.getElementById('grid'),
				//scrollX: false,
				virtualScrolling: true,
				bodyHeight: this.height,
				pagination: false,
				rowHeaders: ['checkbox','rowNum'],
				columnOptions: {
					//minWidth: 100,
					frozenCount: frozenCount
				},
				columns: [
					{
						title: '',
						name: 'photo',
						align: 'center',
						width: 40,
						formatter: function(value) {
							var url = value.toString();
							return '<img src="' + url + '" width="40" height="40" />';
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
						title: 'Age',
						name: 'age',
						sortable: true,
						width: 180
					},
					{
						title: 'Gender',
						name: 'gender',
						minWidth: 100,
						sortable: true,
						editOptions: {
							type: 'select',
							listItems: [
								{ text: 'Female', value: 'Female' },
								{ text: 'Male', value: 'Male' }
							],
							useViewMode: true
						}
					},
					{
						title: 'City',
						name: 'city',
						sortable: true,
						minWidth: 200,
						editOptions: {
							type: 'text',
							//maxLength: 10,
							useViewMode: false
						}
					},
					{
						title: 'Email',
						name: 'email',
						minWidth: 200,
						formatter: function(value, rowData) {
							return '<a href="mailto:' + value + '" target="_blank">' + value + '</a>';
						}
					},
					{
						title: 'Phone',
						name: 'phone',
						minWidth: 200
					},
					{
						title: 'Company',
						name: 'company',
						minWidth: 300
					},
					{
						title: 'Profession',
						name: 'profession',
						minWidth: 300
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
						age: {
							template: function(valueMap) {
								return '<small>MAX: <strong>' + valueMap.max + '</strong>, MIN: <strong>' + valueMap.min + '</strong>, AVG: <strong>' + valueMap.avg.toFixed(2) + '</strong></small>';
							}
						}
					}
				}
			});

			this.grid.setData(this.gridData)
		},
		initGridData() {
			_.times(500, (number) => {
				this.gridData.push({
					name: chance.name(),
					photo: '/static/images/users/user-'+chance.integer({ min: 0, max: 30 })+'.jpg',
					age: chance.age(),
					gender: chance.gender(),
					city: chance.city(),
					email: chance.email(),
					guid: chance.guid(),
					phone: chance.phone(),
					company: chance.company(),
					profession: chance.profession(),
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

.page-tui-grid {
	.page-header {
		margin-bottom: 20px;
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
	}
}
</style>

