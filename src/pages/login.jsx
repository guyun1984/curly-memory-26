// @ts-ignore;
import React from 'react';

import { LoginForm } from '@/components/LoginForm';
export default function Login(props) {
  const {
    $w
  } = props;
  const handleLoginSuccess = userInfo => {
    // 根据用户权限决定跳转页面
    const targetPage = userInfo.isAdmin ? 'admin' : 'home';
    $w.utils.redirectTo({
      pageId: targetPage,
      params: {
        username: userInfo.username,
        isAdmin: userInfo.isAdmin
      }
    });
  };
  return <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">信息收集系统</h1>
          <p className="text-gray-600">请登录或注册账号</p>
        </div>
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </div>
    </div>;
}