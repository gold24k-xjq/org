
import axios from './axios'

const success = (msg) => {
	
	layer.msg(msg, {
		anim: 1,
	})

}


const error = (msg) => {
	
	layer.msg(msg, {
		anim: 6,
	})

}


const tips = (msg, id) => {
    
    layer.tips(msg, '#'+id)

}


const load = () => {
    
    layer.load()

}


const confirm = (msg, btn = ['确定', '取消']) => {

    return new Promise(function(resolve, reject) {

        layer.confirm(msg, {icon: 3, title: '提示', btn: btn}, function(index) {
            layer.close(index)
            resolve()
        }, function() {
            reject()
        })

    })

}


const open = (id, title, area = ['700px', '450px']) => {

    let dom = $('#'+id)

    let tf = title ? true : false

    return new Promise(function(resolve, reject) {
        layer.open({
            type: 1,
            title: title,
            area: area,
            fixed: tf,
            maxmin: tf,
            content: dom,
            success: function(layero, index){ 
                resolve(index, layero)
            },
            cancel: function(index, layero){ 
                dom.hide()
                reject(index, layero)
            },
            end: function(){
                dom.hide()
            }  
        })
    })
    
}


const eject = (id, title, area = ['700px', '450px'], btn = ['确认', '取消']) => {

    let dom = $('#'+id)

    return new Promise(function(resolve, reject) {
        layer.open({
            type: 1,
            title: title,
            area: area,
            btn: btn,
            fixed: true,
            maxmin: true,
            content: dom,
            yes: function(index){ 
                resolve(index)
            },
            end: function(index){ 
                reject(index)
            }
        })
    })
    
}


const setCookie = (name, value) => {

    let domain = process.env.VUE_APP_DOMAIN
    
    var exdate = new Date(), expiredays = 14;
    exdate.setDate(exdate.getDate() + expiredays);
    
    document.cookie = name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString())+";path=/;domain="+domain;//zn1v1.com

}

const sortBykey = (ary, key, sort) => {
    return ary.sort(function (a, b) {
        let x, y
        if (sort)
            x = a[key], y = b[key]
        else
            y = a[key], x = b[key]
        return ((x < y) ? -1 : (x > y) ? 1 : 0)
    })
}



const isPhone = (phone) => {
    let reg = /^1(3|4|5|6|7|8|9)\d{9}$/
    if (!reg.test(phone)) {
        return false
    }
    return true
}



const find = (target, array) => {
    for (let item in array) {
        if (array[item].username == target) {
            return [item, array[item].uid, array[item].username]
        }
    }
    return false;
}


let access
access = true
//此方法与下面方法一致，可以统一，但这里是获取普通pdf，即不需要temp_code，php文件都在public下
const getPdf = (data) => {

    if (!access) return
    access = false
    load()

    axios.post('/getCheckPdf', data).then(res=>{

        access = true
        layer.closeAll('loading');
        downloads(res.data)
    }).catch(res=>{
        access = true
        layer.closeAll('loading');
    })

}


//调文涛接口
const setStreng = (url, data) => {

    if (!access) return
    access = false
    load()

    axios.post(url, data).then(res=>{
        access = true
        layer.closeAll('loading');
        downloads(res.data)
    }).catch(res=>{
        access = true
        layer.closeAll('loading');
    })

}



const downloads = (res) => {

    const link = document.createElement('a')

    link.href = res.path

    link.target = '_blank'
    
    document.body.appendChild(link)

    link.click()

}


const formatDate = (timestamp) => {

    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y + M + D;

}


const clearCache = () => {

    localStorage.removeItem('userinfo')
    localStorage.removeItem('token')

}


const setMath = () => {

    MathJax.typeset();

}



const getLetters = (data) => {

    let letters = []
    data.forEach((item) => {
        letters.push(item.letter)
    })
    letters = [...new Set(letters)].sort()
    return letters

}



var clone = function(obj){
    var construct = Object.prototype.toString.call(obj).slice(8,-1);
    var res;
    if(construct === 'Array'){
        res = [];
    }else if(construct === 'Object'){
        res = {}
    }
    for(var item in obj){
        if(typeof obj[item] === 'object'){
            res[item] = clone(obj[item]);
        }else{
            res[item] = obj[item];
        }
    }
    return res;
}



const string_order = (data) => {

    data = data.split('')
    data.sort()
    data = data.join('')
    return data

}



/*window.MathJax.Hub.Config({
    showProcessingMessages: false, //关闭js加载过程信息
    messageStyle: "none", //不显示信息
    // "HTML-CSS": {
    //     availableFonts: ["STIX", "TeX"], //可选字体
    //     showMathMenu: false //关闭右击菜单显示
    // }
    CommonHTML: {
        showMathMenu: false,
        styles: { ".mjx-chtml":{ "padding": "5px 2px", "font-size":"100% !important" },".mjx-sup":{"font-size":"80% !important"},".mjx-root":{"font-size":"80% !important"}},
        scale:100
    }
})*/



export default {

    success,
    error,
    tips,
    load,
    confirm,
    open,
    eject,
    setCookie,
    sortBykey,
    clearCache,
    downloads,
    find,
    formatDate,
    isPhone,
    getPdf,
    setStreng,
    setMath,
    getLetters,
    clone,
    string_order,

}