import Vue from 'vue';
import IconSvg from '@/components/Icon-svg';// svg组件
Vue.component('svg-icon', IconSvg);// register globally

const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('./svg', false, /\.svg$/);
requireAll(req);
