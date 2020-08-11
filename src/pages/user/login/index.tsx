import {Alert} from 'antd';
import React, {useState} from 'react';
import {connect, Dispatch} from 'umi';
import {StateType} from '@/models/login';
import {LoginParamsType} from '@/services/login';
import {ConnectState} from '@/models/connect';
import LoginForm from './components/Login';

import styles from './style.less';

const {Tab, UserName, Password, Submit} = LoginForm;

interface LoginProps {
  dispatch: Dispatch;
  userLogin: StateType;
  submitting?: boolean;
}

const LoginMessage: React.FC<{
  content: string;
}> = ({content}) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC<LoginProps> = (props) => {
  const {userLogin = {}, submitting} = props;
  const {code, message} = userLogin;
  const [autoLogin, setAutoLogin] = useState(true);
  const [type, setType] = useState<string>('account');
  const handleSubmit = (values: LoginParamsType) => {
    const {dispatch} = props;
    dispatch({
      type: 'login/login',
      payload: {...values, type},
    });
  };
  return (
    <div className={styles.main}>
      <LoginForm activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
        <Tab key="account" tab="账户密码登录">
          {code !== 200 && message !== undefined && !submitting && (
            <LoginMessage content={`${message}`}/>
          )}

          <UserName
            name="userName"
            placeholder="用户名: admin or user"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          />
          <Password
            name="password"
            placeholder="密码: ant.design"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
        </Tab>
        <Submit loading={submitting}>登录</Submit>
      </LoginForm>
    </div>
  );
};

export default connect(({login, loading}: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
