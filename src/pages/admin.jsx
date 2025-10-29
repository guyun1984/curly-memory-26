// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Input, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Search, LogOut, Users, BarChart3, RefreshCw, Filter } from 'lucide-react';

import { UserCard } from '@/components/UserCard';
export default function Admin(props) {
  const {
    $w
  } = props;
  const [userInfo, setUserInfo] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(false);
  const [statsFilter, setStatsFilter] = useState(null);
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
    setLoading(true);
    try {
      // 从数据源加载用户数据 - 使用正确的数据源名称
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'sys_user',
        methodName: 'wedaGetRecordsV2',
        params: {
          select: {
            $master: true
          },
          getCount: true,
          pageSize: 100,
          pageNumber: 1
        }
      });

      // 处理用户数据，添加统计信息
      const processedUsers = result.records.map(user => ({
        _id: user._id,
        name: user.name,
        is_admin: user.is_admin || false,
        totalSubmissions: Math.floor(Math.random() * 20) + 1,
        // 模拟提交数量
        pendingReplies: Math.floor(Math.random() * 5),
        // 模拟待回复数量
        repliedCount: Math.floor(Math.random() * 15),
        // 模拟已回复数量
        pendingCount: Math.floor(Math.random() * 5),
        // 模拟待回复数量
        lastSubmission: Date.now() - Math.floor(Math.random() * 86400000 * 7) // 模拟最后提交时间
      }));
      setUsers(processedUsers);
      toast({
        title: "加载成功",
        description: `已加载 ${processedUsers.length} 个用户`
      });
    } catch (error) {
      console.error('加载用户失败:', error);
      // 如果数据源调用失败，使用模拟数据作为备选方案
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
      toast({
        title: "使用模拟数据",
        description: "数据源连接失败，使用模拟用户数据",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  const handleStatsClick = filterType => {
    setStatsFilter(filterType);
    switch (filterType) {
      case 'totalSubmissions':
        setActiveTab('all');
        break;
      case 'pendingReplies':
        setActiveTab('pending');
        break;
      default:
        setActiveTab('all');
    }
  };
  const clearStatsFilter = () => {
    setStatsFilter(null);
    setActiveTab('all');
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
  const handleRefresh = () => {
    loadUsers();
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
            <div className="flex space-x-2">
              <Button onClick={handleRefresh} variant="outline" size="sm" disabled={loading}>
                <RefreshCw className={`w-4 h-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
                刷新
              </Button>
              <Button onClick={handleLogout} variant="outline" size="sm">
                <LogOut className="w-4 h-4 mr-1" />
                退出登录
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className={`cursor-pointer transition-all hover:shadow-md ${statsFilter === 'totalUsers' ? 'ring-2 ring-blue-500' : ''}`} onClick={() => handleStatsClick('totalUsers')}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="w-8 h-8 text-blue-600 mr-4" />
                  <div>
                    <div className="text-2xl font-bold">{stats.totalUsers}</div>
                    <div className="text-sm text-muted-foreground">总用户数</div>
                  </div>
                </div>
                {statsFilter === 'totalUsers' && <Filter className="w-4 h-4 text-blue-500" />}
              </div>
            </CardContent>
          </Card>
          <Card className={`cursor-pointer transition-all hover:shadow-md ${statsFilter === 'totalSubmissions' ? 'ring-2 ring-green-500' : ''}`} onClick={() => handleStatsClick('totalSubmissions')}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <BarChart3 className="w-8 h-8 text-green-600 mr-4" />
                  <div>
                    <div className="text-2xl font-bold">{stats.totalSubmissions}</div>
                    <div className="text-sm text-muted-foreground">总提交数</div>
                  </div>
                </div>
                {statsFilter === 'totalSubmissions' && <Filter className="w-4 h-4 text-green-500" />}
              </div>
            </CardContent>
          </Card>
          <Card className={`cursor-pointer transition-all hover:shadow-md ${statsFilter === 'pendingReplies' ? 'ring-2 ring-yellow-500' : ''}`} onClick={() => handleStatsClick('pendingReplies')}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                    <BarChart3 className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stats.pendingReplies}</div>
                    <div className="text-sm text-muted-foreground">待回复数</div>
                  </div>
                </div>
                {statsFilter === 'pendingReplies' && <Filter className="w-4 h-4 text-yellow-500" />}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 筛选状态显示 */}
        {statsFilter && <div className="mb-4 flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center">
              <Filter className="w-4 h-4 text-blue-500 mr-2" />
              <span className="text-blue-700">
                当前筛选: 
                {statsFilter === 'totalUsers' && ' 总用户数'}
                {statsFilter === 'totalSubmissions' && ' 总提交数'}
                {statsFilter === 'pendingReplies' && ' 待回复数'}
              </span>
            </div>
            <Button onClick={clearStatsFilter} variant="ghost" size="sm">
              清除筛选
            </Button>
          </div>}

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
        {loading ? <Card>
            <CardContent className="p-12 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-500 mt-4">加载用户中...</p>
            </CardContent>
          </Card> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map(user => <UserCard key={user._id} user={user} onViewDetails={handleViewUserDetails} />)}
          </div>}

        {!loading && filteredUsers.length === 0 && <Card>
            <CardContent className="p-12 text-center">
              <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500">暂无匹配的用户</p>
            </CardContent>
          </Card>}
      </div>
    </div>;
}