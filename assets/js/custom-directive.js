import Vue from 'vue'
import {scrollFixPosition} from '@/assets/js/utils.js'

Vue.directive('scrollFix', function(el, binding) {
    window.onscroll = function(){
        scrollFixPosition(binding.value[0], binding.value[1])
    }
})