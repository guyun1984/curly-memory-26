// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Input, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Search, LogOut, Users, BarChart3 } from 'lucide-react';

import { UserCard } from '@/components/UserCard';
export default function Admin(props) {
  const {
    $w
  } = props;
  const [userInfo, setUserInfo] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const {
    toast
  } = useToast();
  useEffect(() => {
    // 从页面参数获取用户信息
    const params = $w.page.dataset.params;
    if (params && params.username && params.isAdmin === 'true') {
      setUserInfo({
        username: params.username,
        isAdmin: true
      });
      loadUsers();
    } else {
      // 非管理员或未登录，跳转到登录页
      $w.utils.redirectTo({
        pageId: 'login'
      });
    }
  }, [$w]);
  const loadUsers = async () => {
    try {
      // 模拟从数据源加载用户数据
      const mockUsers = [{
        _id: '1983262149294698498',
        name: 'administrator',
        is_admin: true,
        totalSubmissions: 15,
        pendingReplies: 2,
        repliedCount: 13,
        pendingCount: 2,
        lastSubmission: Date.now() - 86400000
      }, {
        _id: '1983262149294698499',
        name: 'guyun1984',
        is_admin: true,
        totalSubmissions: 8,
        pendingReplies: 1,
        repliedCount: 7,
        pendingCount: 1,
        lastSubmission: Date.now() - 172800000
      }, {
        _id: 'user001',
        name: '用户A',
        is_admin: false,
        totalSubmissions: 5,
        pendingReplies: 3,
        repliedCount: 2,
        pendingCount: 3,
        lastSubmission: Date.now() - 43200000
      }, {
        _id: 'user002',
        name: '用户B',
        is_admin: false,
        totalSubmissions: 12,
        pendingReplies: 0,
        repliedCount: 12,
        pendingCount: 0,
        lastSubmission: Date.now() - 86400000
      }, {
        _id: 'user003',
        name: '用户C',
        is_admin: false,
        totalSubmissions: 3,
        pendingReplies: 3,
        repliedCount: 0,
        pendingCount: 3,
        lastSubmission: Date.now() - 259200000
      }];
      setUsers(mockUsers);
    } catch (error) {
      toast({
        title: "加载失败",
        description: error.message,
        variant: "destructive"
      });
    }
  };
  const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user._id.toLowerCase().includes(searchTerm.toLowerCase())).filter(user => {
    if (activeTab === 'pending') return user.pendingReplies > 0;
    if (activeTab === 'replied') return user.repliedCount > 0;
    return true;
  });
  const handleViewUserDetails = user => {
    $w.utils.navigateTo({
      pageId: 'user-details',
      params: {
        userId: user._id,
        username: user.name
      }
    });
  };
  const handleLogout = () => {
    $w.utils.redirectTo({
      pageId: 'login'
    });
  };
  const stats = {
    totalUsers: users.length,
    totalSubmissions: users.reduce((sum, user) => sum + user.totalSubmissions, 0),
    pendingReplies: users.reduce((sum, user) => sum + user.pendingReplies, 0)
  };
  if (!userInfo) {
    return <div className="p-4">加载中...</div>;
  }
  return <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div>
                <h1 className="text-xl font-semibold">信息收集系统 - 管理后台</h1>
                <p className="text-sm text-gray-600">管理员：{userInfo.username}</p>
              </div>
            </div>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-1" />
              退出登录
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-blue-600 mr-4" />
                <div>
                  <div className="text-2xl font-bold">{stats.totalUsers}</div>
                  <div className="text-sm text-muted-foreground">总用户数</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BarChart3 className="w-8 h-8 text-green-600 mr-4" />
                <div>
                  <div className="text-2xl font-bold">{stats.totalSubmissions}</div>
                  <div className="text-sm text-muted-foreground">总提交数</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                  <BarChart3 className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats.pendingReplies}</div>
                  <div className="text-sm text-muted-foreground">待回复数</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 搜索和筛选 */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="搜索用户名或ID..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
              </div>
              <div className="flex space-x-2">
                <Button variant={activeTab === 'all' ? 'default' : 'outline'} onClick={() => setActiveTab('all')} size="sm">
                  全部用户
                </Button>
                <Button variant={activeTab === 'pending' ? 'default' : 'outline'} onClick={() => setActiveTab('pending')} size="sm">
                  待回复
                </Button>
                <Button variant={activeTab === 'replied' ? 'default' : 'outline'} onClick={() => setActiveTab('replied')} size="sm">
                  已回复
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 用户列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map(user => <UserCard key={user._id} user={user} onViewDetails={handleViewUserDetails} />)}
        </div>

        {filteredUsers.length === 0 && <Card>
            <CardContent className="p-12 text-center">
              <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500">暂无匹配的用户</p>
            </CardContent>
          </Card>}
      </div>
    </div>;
}