//axios拦截器
const service = axios.create({
  // baseURL: 'http://rap2api.taobao.org/app/mock/289298',
  // baseURL: 'http://192.168.1.104:8080/',
  baseURL: 'http://n9rznm.natappfree.cc/',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  // async:false
});

service.interceptors.request.use(
  (config) => {
    if (config.method == 'get') {
      config.params = config.data
      delete config.data
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code != 200) {
      el.$message({
        title: '提示',
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000,
      });
      return Promise.reject(new Error(res.msg || 'Error'));
    } else {
      if (res.msg) {
        el.$message({
          message: res.msg,
          type: 'success'
        })
      }
      return res;
    }
  },
  (error) => {
    console.log('err' + error);
    el.$message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);