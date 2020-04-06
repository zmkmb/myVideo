import myStorage from "./storage";
import navUtils from './navigation/NavigationUtils';
global.appConfig = {
    host: 'http://192.168.124.66:8360'
}


function intercept(url, option) {
    return { url, option }
}

const baseUrl = appConfig.host;

async function request(url, option) {
    url = baseUrl + url;

    //请求拦截器
    const a = await intercept(url, option);
    url = a.url
    option = a.option

    console.log(option)
    return fetch(url, { ...option })
        .then(async res => {
            if (res.headers.map && res.headers.map.authtoken) {
                myStorage.set('authtoken', res.headers.map.authtoken);
            }

            try {
                let response = await res.json();
                console.log(response)
                if (!response.result) {
                    console.log(navUtils)
                    navUtils.goLogin();
                }
                return response;
            } catch (err) {
                console.log(err)
            }

        }).catch((err) => {
            console.log(err)
        });
}

// const api = new Proxy(request, {

//     get(trapTarget, key, receiver) {
//         if (!trapTarget.hasOwnProperty(key)) {
//             return function (url, option) {
//                 return trapTarget(url, { ...option, method: key });
//             }
//         }
//     }
// });

const api = {};
const method = ['get', 'post'];
method.forEach(key => {
    api[key] = async (url, data, option) => {
        let authtoken,method;
        try {
            authtoken = await myStorage.get('authtoken');
        } catch (err) {
            authtoken = ''
        }
        option = option ? option : {};
        let defaultOption = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authtoken': authtoken,
            },
            body: JSON.stringify({})
        }
        if(!option.upload){
            data = JSON.stringify(data);
        }else{
           defaultOption.headers['Content-Type'] = 'multipart/form-data;charset=utf-8';
        }

        // option = option ? option : {};
        // if (key == 'upload') {
        //     option = { ...defaultOption };
        //     option.headers['Content-Type'] = 'multipart/form-data;charset=utf-8';
        //     method = 'post';
        // }else{
            
        // }
        option = { ...defaultOption };
        
        

        return request(url, { ...option, body: data, method: key });
    }

})

export default api;