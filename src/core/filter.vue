<template>
    <div>
        <el-tag v-if="mode == 'tag' && !_.isNull(variable)" closable @close="variable = null; alert('tagggg');">
            <strong>{{ label }}: </strong> {{ variable }}
        </el-tag>

		<el-col v-if="mode == 'form'"  :xs="xs" :sm="sm" :md="md" :lg="lg">
			<el-form-item :label="label">
				<el-input :prefix-icon="el-icon-search" :placeholder="label" :v-model="variable"></el-input>
			</el-form-item>
		</el-col>
    </div>
</template>


<script>
    export default {
        name: 'Filter',
        props: ['mode', 'variable', 'label', 'xs', 'sm', 'md', 'lg']
    }
</script>


