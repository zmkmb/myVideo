import Storage from 'react-native-storage';
import {AsyncStorage} from 'react-native';

if(!global.storage){
    const storage = new Storage({
        // 最大容量，默认值1000条数据循环存储
        size: 1000,
        // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
        // 如果不指定则数据只会保存在内存中，重启后即丢失
        storageBackend: AsyncStorage,
        // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
        defaultExpires: null,
        // 读写时在内存中缓存数据。默认启用。
        enableCache: true,
    })
    global.storage = storage;   //全局变量
}

let myStorage = {
    set:(key,val)=>{
        storage.save({key:key,data:val})
    },
    get:(key)=>{
        try{
            return storage.load({key:key})
        }catch(err){
            console.log(err)
        }
    },
    update:(key,val)=>{
        try{
            let oldVal = storage.load({key:key});
            if(oldVal && typeof(oldVal) == 'object'){
                storage.save({key:key,data:{...oldVal,...val}})
            }else{
                storage.save({key:key,data:val})
            }

        }catch(err){
            console.log(err)
        }
    }
}

export default myStorage;

