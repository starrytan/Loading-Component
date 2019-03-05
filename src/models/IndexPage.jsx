import request from '../utils/request'

export default {

  namespace:'newdata',

  state: {
    testdata:false,
    curredata:false,
    page:1
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      if(history){
        if(history.location.pathname=='/'){               
          dispatch({
            type:'getdata',
          })
        }       
      }
    },
  },

  effects: {
    *getdata({}, {put}){  // eslint-disable-line
        let res=yield request('/getdata')       
        yield put({
          type:'save',
          data:res.data.data
        })
        yield put({
          type:'getmoredata',
          page:1
        }) 
    },
    *getmoredata({page,callback},{put,select}){
      //一次加载10条
      const testdata=yield select(state=>state.newdata.testdata)  
      if(page>Math.ceil(testdata.length/10)){
        callback(true)
      }else{
        let newd=testdata.slice(10*page-10,10*page); 
        yield put({
          type:'loader',
          data:newd,
          page:page
        })
      }
    }
  },

  reducers: {
    save(state, {data}) {
      return { ...state,testdata:data};
    },
    loader(state,{data,page}){ 
      return{
        ...state,curredata:state.curredata?state.curredata.concat(data):data,page:page 
      }
    }
  },
};
