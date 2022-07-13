# 前端常用代码片段

一些项目中常用的代码片段，提高开发效率

**vue 模板**

```json
{
	"Print to console": {
        "prefix": "vue",
        "body": [
            "<template>",
            "  <div class=\"view\">",
			"    <div class=\"table-box\">",
			"      <Table class=\"table\" :data=\"tableData\" :columns=\"columns\">",
			"        <template slot=\"action\" slot-scope=\"{ row }\">",
			"          <Button type=\"primary\" size=\"small\" style=\"margin-right: 5px\">编辑</Button>",
            "          <Button size=\"small\">详情</Button>",
			"        </template>",
			"      </Table>",
			"    </div>",
			"    <VModal v-model=\"showDetail\" />",
			"  </div>",
            "</template>",
            "",
            "<script>",
			"  import VModal from '@/components/v-modal'",
			"  export default {",
			"    name: '',",
			"    components: {",
			"      VModal,",
			"    },",
			"    props: {",
			"    },",
			"    data() {",
			"      return {",
			"        page: {",
			"          index: 1,",
			"          size: 10,",
			"          total: 0,",
			"        },",
			"        loading: false,",
			"        empty: false,",
			"        tableData: [],",
			"        columns: [",
			"          { type: 'selection', width: 60, align: 'center' },",
			"          { type: 'index', width: 60, align: 'center' },",
			"          { title: '姓名', key: 'userName', width: 120, align: 'center' },",
			"          { title: '操作', slot: 'action', width: 120, align: 'center' },",
			"        ],",
			"        showDetail: false,",
			"        curRow: {},",
			"      }",
			"    },",
			"    computed: {",
			"    },",
			"    watch: {",
			"    },",
			"    filters: {",
			"    },",
			"    created() {",
			"      this.init()",
			"    },",
			"    methods: {",
			"      init() {",
			"        this.getList()",
			"      },",
			"      async getList() {",
			"        let params = {",
			"          page: this.page.index,",
			"          size: this.page.size,",
			"        }",
			"        this.loading = true",
			"        const res = await this.\$api.getList(params)",
			"        this.loading = false",
			"        if (res.code === '200') {",
			"          let data = res.data || {}",
			"          let list = data.records || []",
			"          this.tableData = list",
			"          this.page.total = data.total",
			"          this.empty = !list.length",
			"        } else {",
			"          this.\$Message.error(res.msg)",
			"        }",
			"      },",
			"    },",
			"  }",
			"</script>",
            "<style lang='stylus' scoped>",
            "@import '~@/styles/var'",
			"",
			".view",
            "  width 100%",
            "  height 100%",
            "",
            "</style>"
        ],
        "description": "vue 模板"
    }
}
```

**代码备注 模板**

```json
{
  "Print to console": {
		"prefix": "mark",
		"body": [
		   "/**",
		   "*  判断取值范围",
		   "*",
		   "*  @param {*} x 当前值",
		   "*  @param {string} arr 数据列表",
		   "*/",
		],
		"description": "Log output to console"
	}
}
```

