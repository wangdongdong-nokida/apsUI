import React from 'react';
import { PageLoading } from '@ant-design/pro-layout';
import { Redirect, connect, ConnectProps } from 'umi';
import { stringify } from 'querystring';
import { ConnectState } from '@/models/connect';
import { CurrentUser } from '@/models/user';

interface SecurityLayoutProps extends ConnectProps {
  loading?: boolean;
  currentUser?: CurrentUser;
}

interface SecurityLayoutState {
  isReady: boolean;
}

class SecurityLayout extends React.Component<SecurityLayoutProps, SecurityLayoutState> {
  state: SecurityLayoutState = {
    isReady: false,
  };

  componentDidMount() {
    this.setState({
      isReady: true,
    });
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }
   getQueryVariable = (variable:string) => {
    let query = window.location.search.substring(1);
     let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
      let pair = vars[i].split("=");
      if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
  }
   setCookie =  (name:string, value:string) => {
    //name相当于key,value为转入的值
    var expdate = new Date();   //初始化时间
    expdate.setTime(expdate.getTime() + 120 * 60 * 1000);   //时间单位毫秒
    document.cookie = name+"="+value+";expires="+expdate.toUTCString()+";path=/";
  }
  getCookie = (c_name:string) => {
    //这里的c_name为setCookie()中name的key值
    if (document.cookie.length > 0) {
      var c_start = document.cookie.indexOf(c_name + "=");
      if (c_start != -1){
        c_start = c_start + c_name.length + 1;
        var c_end = document.cookie.indexOf(";", c_start);
        if (c_end == -1)
          c_end = document.cookie.length;
        return unescape(document.cookie.substring(c_start, c_end));
      }
    }
    return ""
  }

  render() {
    const { isReady } = this.state;
    const { children, loading, currentUser } = this.props;
    // You can replace it to your authentication rule (such as check token exists)
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
    let tokenString = this.getQueryVariable("token");
    //console.info("tokenString",tokenString);

    if(tokenString){
      sessionStorage.setItem("Authorization",tokenString);
    } else if(this.getCookie("token")){
      sessionStorage.setItem("Authorization",this.getCookie("token"));
    }
    const isLogin = currentUser && sessionStorage.getItem("Authorization");
    const queryString = stringify({
      redirect: window.location.href,
    });
    console.info("coook",this.getCookie("token")+"");
    if ((!isLogin && loading) || !isReady) {
      this.setCookie("token",sessionStorage.getItem("Authorization")+"");
      return <PageLoading />;
    }
    if (!isLogin && window.location.pathname !== '/user/login') {
      return <Redirect to={`/user/login?${queryString}`} />;
    }
    return children;
  }
}

export default connect(({ user, loading }: ConnectState) => ({
  currentUser: user.currentUser,
  loading: loading.models.user,
}))(SecurityLayout);
