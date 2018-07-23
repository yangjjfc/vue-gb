<!-- -&#45;&#45;单选-&#45;&#45;
下拉树插件
用法
<tree-select
        :treeData="treeData" //树数据
        :treeProps="treeProps" //选项
        v-model="some" //默认选中
        :multiple="false" //是否多选
        :clearable="true" //是否可清空
        placeholder="请选择部门"
        defaultExpandAll="true" //展开全部
        size="small" //不传为默认，small为小号
        @errorCallback="showTreeError"
       >
-->
<template>
    <div class="ats-tree" v-clickoutside="handleCloseTree" ref="atsTree" :class="[size]">
        <div class="ats-input el-select" @mouseenter="hovering=true" @mouseleave="hovering=false">
            <!--//单选-->
            <div class="ats-input-single el-input" v-if="!this.multiple">
                <span class="el-input__suffix">
                    <span class="el-input__suffix-inner">
                    <i class="el-select__caret el-icon-arrow-up" :class="{'is-reverse':treeVisible}"></i>
                    </span>
                </span>

                <i class="el-icon-close ats-input-close" v-if="clearable && filterString" @click="resetValue"></i>
                <input type="text" class="el-input__inner" v-model="filterString" :placeholder="placetext" @input="handleFilter" @focus="treeVisible=true"
                       @blur="handleAutoComplete" :readonly="readonly">
            </div>
            <!--//多选-->
            <div class="ats-input-multiple el-input" v-if="this.multiple">
                <span class="el-input__suffix">
                    <span class="el-input__suffix-inner">
                    <i class="el-select__caret el-icon-arrow-up" :class="{'is-reverse':treeVisible}" @click="handleCloseTree(!treeVisible)"></i>
                    </span>
                </span>

                <div class="ats-labels">
                    <div class="el-select__tags" @click.prevent="handleCloseTree(true)">
                        <el-tag v-for="item in checkedItems" size="small" :key="item.id" :closable="true" type="primary" class="el-tag--primary" @close="handleDelItem(item,$event)"
                                :title="handleTitleVisible(item[treeProps.label])">
                            {{item[treeProps.label] | showEllips}}
                        </el-tag>
                    </div>
                    <input ref="multipleInput" type="text" :placeholder="placetext" v-model="filterString" @input="handleFilter" @focus="treeVisible=true"
                           @blur="handleAutoComplete">
                </div>
            </div>
        </div>

        <!--<SelectDropdown>

        </SelectDropdown>-->
        <el-scrollbar class="ats-tree-scrollbar" ref="treeScrollbar" v-show="treeVisible">
            <div class="ats-tree-wrapper">
                <ul class="ats-tree-nodes">
                    <tree-node :defaultExpandAll="defaultExpandAll" v-for="child in treeNodes[treeProps.children]" :node="child" :key="child.id" :multiple="multiple"
                               :currentNodeId="currentNodeId" :treeProps="treeProps" :eventHub="eventHub" :query="query" :isQuering="isQuering"></tree-node>
                </ul>
            </div>
        </el-scrollbar>
    </div>
</template>

<script>
    import Vue from 'vue';
    import emitter from '~/emitter';
    import {Tag, Scrollbar} from 'element-ui';
    import treeNode from './tree-node.vue';
    import Clickoutside from '../../utils/custom/clickoutside.js';
    import throttle from 'throttle-debounce/throttle';
    import {dispatch, objArrDeepCopy} from '../../utils/custom/global.common.js';
    Vue.component(Scrollbar.name, Scrollbar);
    // Vue.component(SelectDropdown.name, SelectDropdown);
    Vue.component(Tag.name, Tag);
    export default {
        name: 'tree-select',
        mixins: [emitter],
        data () {
            return {
                treeNodes: null,
                placetext: this.placeholder,
                currentNodeId: '',
                currentSelected: '',
                filterString: '', //查询关键字
                treeVisible: false, // 是否显示树
                eventHub: new Vue(),
                isQuering: false, // 是否搜索
                query: '',
                checkedItems: [], //选中的nodes
                checkedKeys: [],
                isDefault: true,
                error: {
                    message: '',
                    data: ''
                },
                hovering: false
            };
        },
        props: {
            treeData: {
                type: Array,
                default: []
            },
            currentId: {
                type: [String, Array],
                default: ''
            },
            defaultExpandAll: {
                type: Boolean,
                default: false
            },
            treeProps: {
                type: Object,
                default () {
                    return {
                        label: 'label',
                        val: 'no',
                        children: 'children'
                    };
                }
            },
            placeholder: {
                type: String,
                default: '请选择'
            },
            size: {
                type: String
            },
            value: {},
            multiple: {
                type: Boolean,
                default: false
            },
            validateEvent: {
                type: Boolean,
                default: true
            },
            clearable: {
                type: Boolean,
                default: false
            },
            readonly: {
                type: Boolean,
                default: false
            }
        },
        created () {
            this.initData(this.treeData);
            this.eventHub.$on('node-click', this.handleNodeClick);
        },
        updated(){
            this.isDefault = true;
        },
        computed: {
            showCloseIcon: {
                get () {
                    return this.hovering && this.value !== undefined && this.value !== '' && !this.multiple;
                }
            }
        },
        watch: {
            value (val) {
                if (val !== this.checkedKeys) {
                    this.setDefaultValue();
                }
            },
            treeData (val) {
                if (val) {
                    this.initData(val);
                    this.isDefault && this.setDefaultValue();
                }
            },
            checkedKeys (val) {
                if (val.length) {
                    this.placetext = '';
                } else {
                    this.placetext = this.placeholder;
                }
                if (this.multiple) {
                    !this.isDefault && this.setInputFocus();
                }
            }
        },
        mounted () {
            if (this.isDefault) {
                this.setDefaultValue();
            }
        },
        methods: {
            initData(val){
                this.reverseData(val);
                this.treeNodes = {
                    [this.treeProps.children]: objArrDeepCopy(val, {visible: true, expanded: this.defaultExpandAll}),
                    visible: false
                };
            },
            // 给数据加层级
            reverseData (list, leval = 0){
                list.forEach(item => {
                    item.leval = leval;
                    item.id = item[this.treeProps.val] || '';//{id: item.no, label: item.label};
                    let child = item[this.treeProps.children];
                    child && this.reverseData(child, leval + 1);
                });
            },
            //重置数据
            resetValue () {
                if (this.multiple) {
                    this.checkedItems = [];
                    this.checkedKeys = [];
                } else {
                    this.currentSelected = '';
                    this.currentNodeId = '';
                }
                this.filterString = '';
                this.initData(this.treeData);
                this.$emit('input', '');
            },
            handleCloseTree (val) {
                if (this.showCloseIcon) {
                    this.resetValue();
                } else {
                    if (val === undefined) {
                        this.treeVisible = false;
                    } else {
                        this.treeVisible = val;
                    }
                    if (this.multiple) {
                        this.filterString = '';
                        if (val) {
                            this.setInputFocus();
                        }
                    }
                }
            },
            // 选中标签
            handleNodeClick (node, event) {
                if (event) {
                    this.isDefault = false;
                }
                if (this.multiple) { // todo 多选没加验证
                    if (!this.hasSameItem(this.checkedItems, node)) {
                        this.handleAddItem(node);
                    } else {
                        this.handleDelItem(node, event);
                    }
                    this.filterString = '';
                    this.$emit('input', this.checkedKeys);
                } else {
                    if (!String(node.id)) {
                        throw new Error('没有' + this.treeProps.val);
                    }
                    this.currentNodeId = node.id;
                    this.filterString = node[this.treeProps.label];
                    this.treeVisible = false;
                    this.currentSelected = node;
                    this.$emit('input', this.currentNodeId);
                    if (this.validateEvent) {
                        this.dispatch('ElFormItem', 'el.form.change', [this.currentNodeId]);
                    }
                }
            },
            handleAddItem (item) {
                this.checkedItems.push(item);
                this.checkedKeys.push(item.id);
                this.$set(item, 'checked', true);
            },
            handleDelItem (item, event) {
                this.checkedKeys.splice(this.checkedKeys.indexOf(item.id), 1);
                this.checkedItems.splice(this.checkedItems.indexOf(item), 1);
                this.$set(item, 'checked', false);
            },
            hasSameItem (obj, item) {
                return obj.indexOf(item) > -1;
            },
            setDefaultValue () {
                if (!this.multiple) {
                    this.setSelected(this.value);
                } else {
                    this.setCheckedKeys(this.value);
                }
            },
            // 单选设置初始值
            setSelected (val) {
                let self = this;
                let treeNodes = self.treeNodes;

                self.resetValue();
                self.findTreeItem(val, treeNodes);
                if (!this.currentNodeId) {
                    this.setErrorMessage(val);
                }
            },
            // 多选设置初始值
            setCheckedKeys (val) {
                let treeNodes = this.treeNodes;
                this.resetValue();
                if (val instanceof Array && val.length) {
                    val.forEach(id => {
                        this.findTreeItem(id, treeNodes);
                    });
                    this.getNotExistedItem(val, this.checkedKeys);
                }
            },
            findTreeItem (id, treeNodes) {
                let childNodes = treeNodes[this.treeProps.children] || [];
                for (let i = 0; i < childNodes.length; i++) {
                    if (childNodes[i].id === id) {
                        if (this.multiple) {
                            this.handleAddItem(childNodes[i]);
                        } else {
                            this.handleNodeClick(childNodes[i]);
                        }
                        break;
                    } else {
                        this.findTreeItem(id, childNodes[i]);
                    }
                }
            },
            handleFilter: throttle(1000, function () {
                this.isQuering = true;
                this.query = this.filterString;
                this.treeFilterMethod(this.treeNodes);
            }),
            // 过滤树
            treeFilterMethod (node) {
                let childNodes = node[this.treeProps.children] || [];
                childNodes.forEach((child) => {
                    child.visible = child[this.treeProps.label].toLowerCase().indexOf(this.query.toLowerCase()) > -1;
                    this.treeFilterMethod(child);
                });
                if (!node.visible && childNodes.length) {
                    let allHidden = true;
                    childNodes.forEach((child) => {
                        child.visible && (allHidden = false);
                    });
                    node.visible = allHidden === false;
                }
                if (!this.filterString) {
                    return;
                }
                if (node.visible) {
                    node.expanded = true;
                }
            },
            handleAutoComplete () {
                setTimeout(function () {
                    this.query = '';
                    if (this.currentNodeId !== '' || this.currentNodeId !== undefined) {
                        this.filterString = this.currentSelected[this.treeProps.label];
                    } else if (!this.multiple) {
                        this.filterString = '';
                        this.handleFilter();
                    }
                    if (this.isQuering) {
                        this.treeVisible = false;
                    }
                    this.isQuering = false;
                }.bind(this), 250);
            },
            getNotExistedItem (all, part) {
                let notExisted = [];

                all.forEach((item) => {
                    if (!(part.indexOf(item) > -1)) {
                        notExisted.push(item);
                    }
                });
                this.setErrorMessage(notExisted);
            },
            setErrorMessage (data) {
                if (!data || !data.toString()) return;
                let errorText = (data instanceof Array) ? data.toString() : data;

                // this.error.message = '发现不存在的部门id:' + errorText;
                this.error.data = data;
                this.$emit('errorCallback', this.error);
            },
            setInputFocus () {
                let multipleInput = this.$refs.multipleInput;
                multipleInput.focus();
            },
            handleTitleVisible (str) {
                if (!str) return '';
                let tempLen = 0;

                for (let i = 0; i < str.length; i++) {
                    if (str.charCodeAt(i) > 255) {
                        tempLen += 2;
                    } else {
                        tempLen += 1;
                    }
                }
                if (tempLen >= 15) {
                    return str;
                } else {
                    return '';
                }
            },
            //得到选中的nodes
            getCheckedNodes(){
                if (this.multiple) {
                    return this.checkedItems;
                } else {
                    return this.currentSelected;
                }
            }
        },
        filters: {
            // 截取前18个字节
            showEllips (str) {
                if (!str) return '';
                let tempLen = 0;

                for (let i = 0; i < str.length; i++) {
                    if (str.charCodeAt(i) > 255) {
                        tempLen += 2;
                    } else {
                        tempLen += 1;
                    }
                    if (tempLen >= 15) {
                        str = str.substring(0, i) + '...';
                        break;
                    }
                }
                return str;
            }
        },
        directives: {Clickoutside},
        components: {
            treeNode
        }
    };
</script>

<style lang="scss">
    $width: 100px;
    .ats-tree {
        display: block;
        position: relative;
        //min-width:150px;
        .ats-input {
            position: relative;
        }
        .ats-input-close {
            position: absolute;
            right: 17px;
            top: 8px;
        }
        .el-input-clear {
            position: absolute;
            right: 22px;
            top: 2px;
            font-size: 12px;
            color: #dcdcdc;
            cursor: pointer;
        }
        .el-input__inner {
            min-width: $width;
        }
        .ats-input-multiple {
            background-color: #fff;
            border-radius: 4px;
            border: 1px solid #d8dce5;
            box-sizing: border-box;
            color: #5a5e66;
            display: inline-block;
            font-size: inherit;
            line-height: 1;
            outline: 0;
            padding: 3px 15px;
            transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
            width: 100%;
            input {
                height: 32px;
                box-sizing: border-box;
                outline: none;
                width: 100%;
            }
            input:focus {
                outline: none;
            }
            .el-input__suffix {
                line-height: 32px;
            }
            .el-select__tags {
                width: $width - 30;
                position: inherit;
                transform: none;
                .el-tag {
                    margin: 5px;
                    max-width: 150px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                &:hover {
                    cursor: pointer;
                }
            }
        }

        .ats-tree-scrollbar {
            width: 100%;
            position: absolute;
            border: 1px solid #dfe4ed;
            border-radius: 4px;
            background-color: #fff;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
            z-index: 1000;
            box-sizing: border-box;
            margin: 5px 0;
            .el-scrollbar__wrap {
                max-height: 274px;
            }
            transition: all 0.1s linear;
        }
        .ats-tree-wrapper {
            background-color: #fff;
        }
        &.small {
            font-size: 12px;
            .el-input__inner {
                height: 32px;
            }
            .ats-input-multiple {
                input {
                    height: 26px;
                    font-size: 12px;
                }
            }
        }
    }
</style>
