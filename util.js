/**
 * 一些公共的实用小工具
 */

function _checkJson(data){
    if(data == null){
        return false;
    }else if(data.constructor == Object){
        return true;
    }else{
        return false;
    }
}


export default {
    /**
     * 数据merge，将source合并到target。与Object.assign不同的点：
     *      1. 进行深度合并
     *      2. 可以指定override参数来指定是否source要覆盖target已存在的属性
     * @param  {Object} *target   [description]
     * @param  {Object} *source   [description]
     * @param  {Boolean} override 是否source要覆盖target已存在的属性。默认为true
     * @param  {Boolean} deap 是否深度遍历，默认为true
     * @return {void}
     */
    merge: function(target,source,override,deap){
        if(arguments.length < 2){
            return;
        }
        if(typeof override != 'boolean'){
            override = true;
        }
        if(typeof deap != 'boolean'){
            deap = true;
        }
        if(source.constructor == Array){
            for(let i = 0, len = source.length; i < len; i++){
                if(override === true || target[i] == undefined){
                    if(deap && _checkJson(source[i])){
                        if(!_checkJson(target[i])){
                            target[i] = source[i].constructor == Array? []: {};
                        }
                        this.merge(target[i],source[i],override);
                    }else{
                        target[i] = source[i];
                    }
                }
            }
        }else{
            for(var name in source){
                if(source.hasOwnProperty(name)){
                    if(override === true || !target.hasOwnProperty(name)){
                        if(deap && _checkJson(source[name])){
                            if(!_checkJson(target[name])){
                                target[name] = source[name].constructor == Array? []: {};
                            }
                            this.merge(target[name],source[name],override);
                        }else{
                            target[name] = source[name];
                        }
                    }
                }
            }
        }
        return target;
    }
};
