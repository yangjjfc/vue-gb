<template>
    <div class="loginpage">
        <section>
            <div class="loginForm">
                <div class="showinfo">
                    <h4 v-show="!errorMsg.length">用户账号登录</h4>
                    <div class="errorMsg" v-show="errorMsg.length">
                        <i class="iconfont icon-tongyong-"></i>
                        <p class="error" v-text="errorMsg"></p>
                    </div>
                </div>
                <el-form ref="form" :model="form">
                    <el-form-item>
                        <el-input placeholder="请输入用户名" v-model.trim="form.account" @keyup.enter.native="login">
                            <icon-svg icon-class="icon-denglu-1" slot="prefix" class="icons"></icon-svg>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="请输入密码" v-model.trim="form.password" type="password" @keyup.enter.native="login">
                            <icon-svg icon-class="icon-denglu-" slot="prefix" class="icons"></icon-svg>
                        </el-input>
                    </el-form-item>
                    <el-form-item class="mgb10">
                        <el-col :span="12">
                            <el-checkbox @change="rememberUser">记住用户名</el-checkbox>
                        </el-col>
                        <el-col :span="12" class="fg-passwd">
                            <el-button type="text" @click="showForget = true">忘记密码</el-button>
                        </el-col>
                    </el-form-item>
                    <el-form-item class="submit">
                        <el-button type="primary" @click="login">立即登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </section>
        <update-browder v-if="showUpdatebrowser"></update-browder>
    </div>
</template>
<script type="text/javascript">
    import {mapGetters, mapActions} from 'vuex';
    import {encryption} from '~/global.common.js';
    import UpdateBrowder from './mods/browserVersion';
    export default {
        data () {
            return {
                showUpdatebrowser: false,
                showForget: false,
                errorMsg: '',
                form: {
                    account: '',
                    password: ''
                }
            };
        },
        computed: {
            ...mapGetters(['userInfo'])
        },
        methods: {
            ...mapActions({
                'userLogin': 'login',
                'currentUser': 'currentUser'
            }),
            // 检测浏览器的版本
            checkBrowserVersion () {
                let ua = navigator.userAgent;
                let isIE = ua.indexOf('compatible') > -1 && ua.indexOf('MSIE') > -1; // 判断是否ie浏览器 除(ie11和edge)
                if (isIE) {
                    let reIE = new RegExp('MSIE (\\d+\\.\\d+);');
                    reIE.test(ua);
                    let fIEVersion = parseFloat(RegExp.$1);
                    if (fIEVersion < 10) {
                        this.showUpdatebrowser = true;
                    }
                }
            },
            // 记住用户名
            rememberUser (val) {
                if (val && this.form.account) {
                    localStorage.setItem('name', this.form.account);
                }
            },
            // 获取用户名
            getUser () {
                let name = localStorage.getItem('name');
                name && (this.form.account = name.trim());
            },
            // 获取用户信息
            refreshCode () {
                if (!this.userInfo.token) {
                    this.currentUser();
                }
            },
            // 登录
            login () {
                let xflag = false;
                let clientid = this.userInfo.clientId || null;
                let token = this.userInfo.token || null;
                let password = this.form.password;
                if (!/^[a-zA-Z0-9_-]{4,20}$/.test(this.form.account)) {
                    xflag = true;
                    this.errorMsg = this.form.account === '' ? '请输入用户名' : '用户名格式不正确';
                    return;
                }

                if (!/^[a-zA-Z0-9_-]{6,20}$/.test(this.form.password)) {
                    xflag = true;
                    this.errorMsg = this.form.password === '' ? '请输入密码' : '密码长度6-20个字符';
                    return;
                }
                let param = Object.assign({}, this.form, {
                    password: encryption(password, clientid, token)
                });
                if (!xflag) {
                    let defaultPath = '/oms/index/index';
                    this.userLogin(param).then(msg => {
                        if (msg.data.userType === '1') {
                            defaultPath = '/app/hello';
                        }
                        this.$router.push(defaultPath);
                    }, err => {
                        this.$router.push({ path: '/' })
                        // 记录错误信息
                        this.errorMsg = err.msg;
                        this.refreshCode();
                    });
                }
            }
        },
        mounted () {
            this.checkBrowserVersion(); // 检测浏览器版本
            this.getUser();
            this.refreshCode();
        },
        components: {
            UpdateBrowder
        }
    };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .loginpage {
        position: absolute;
        width: 100%;
        height: 100%;
        background: url(img/bg-login.jpg) no-repeat 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        section {
            width: 366px;
            height: auto;
            .loginForm {
                width: 366px;
                box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
                background: #fff;
                border: 1px #a5b7c9 solid;
                padding: 28px 32px 16px 32px;
                .showinfo {
                    height: 35px;
                    overflow: hidden;
                    margin-bottom: 10px;
                    h4 {
                        color: #44667f;
                        font-size: 15px;
                    }
                    .errorMsg {
                        background-color: #fef2f2;
                        color: #6C6C6C;
                        line-height: 16px;
                        padding: 6px 10px;
                        border: #ffb4a8 1px solid;
                        clear: both;
                        overflow: hidden;
                        i {
                            color: #f40;
                            padding-right: 10px;
                            float: left;
                            font-size: 16px;
                        }
                        .error {
                            float: left;
                            white-space: normal;
                            word-wrap: break-word;
                            word-break: break-all;
                            width: 250px;
                        }
                    }
                }
                .icons {
                    width: 15px;
                    height: 15px;
                    padding-left: 2px;
                }
                .el-form-item {
                    margin-bottom: 15px;
                }
                .fg-passwd {
                    display: flex;
                    justify-content: flex-end;
                    padding-right: 3px;
                }
                .submit {
                    button {
                        width: 100%;
                    }
                }
            }
        }
    }
</style>
