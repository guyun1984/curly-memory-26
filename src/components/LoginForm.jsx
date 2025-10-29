// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Input, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { LogIn, UserPlus } from 'lucide-react';

export function LoginForm({
  onLoginSuccess
}) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const {
    toast
  } = useToast();
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        // 登录逻辑 - 检查是否为管理员用户
        const isAdminUser = formData.username === 'guyun1984';
        toast({
          title: "登录成功",
          description: `欢迎回来，${formData.username}！${isAdminUser ? '（管理员）' : ''}`
        });

        // 传递用户信息和权限状态
        onLoginSuccess && onLoginSuccess({
          username: formData.username,
          isAdmin: isAdminUser
        });
      } else {
        // 注册逻辑
        toast({
          title: "注册成功",
          description: "账号创建成功，请登录"
        });
        setIsLogin(true);
      }
    } catch (error) {
      toast({
        title: "操作失败",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  return <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">
          {isLogin ? '用户登录' : '用户注册'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input type="text" placeholder="用户名" value={formData.username} onChange={e => setFormData({
            ...formData,
            username: e.target.value
          })} required />
          </div>
          <div className="space-y-2">
            <Input type="password" placeholder="密码" value={formData.password} onChange={e => setFormData({
            ...formData,
            password: e.target.value
          })} required />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? '处理中...' : isLogin ? <>
                <LogIn className="w-4 h-4 mr-2" />
                登录
              </> : <>
                <UserPlus className="w-4 h-4 mr-2" />
                注册
              </>}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <Button variant="link" onClick={() => setIsLogin(!isLogin)} className="text-sm">
            {isLogin ? '没有账号？立即注册' : '已有账号？立即登录'}
          </Button>
        </div>
      </CardContent>
    </Card>;
}