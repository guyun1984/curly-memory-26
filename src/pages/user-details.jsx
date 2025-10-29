// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Textarea, Card, CardContent, CardHeader, CardTitle, useToast, Badge } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, User, MessageSquare, Clock, Send } from 'lucide-react';

import { InfoCard } from '@/components/InfoCard';
export default function UserDetails(props) {
  const {
    $w
  } = props;
  const [userInfo, setUserInfo] = useState(null);
  const [userSubmissions, setUserSubmissions] = useState([]);
  const [replyingInfo, setReplyingInfo] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    toast
  } = useToast();
  useEffect(() => {
    // 从页面参数获取用户信息
    const params = $w.page.dataset.params;
    if (params && params.userId) {
      setUserInfo({
        userId: params.userId,
        username: params.username || '用户'
      });
      loadUserSubmissions(params.userId);
    } else {
      // 缺少参数，返回管理后台
      $w.utils.navigateBack();
    }
  }, [$w]);
  const loadUserSubmissions = async userId => {
    setLoading(true);
    try {
      // 模拟加载用户提交的数据
      const mockSubmissions = [{
        id: 1,
        title: '问题咨询',
        content: '请问这个服务的具体流程是怎样的？需要准备哪些材料？',
        createdAt: Date.now() - 86400000,
        reply: '具体流程请参考首页的使用说明，需要准备身份证复印件和相关证明材料。',
        replyTime: Date.now() - 43200000
      }, {
        id: 2,
        title: '服务反馈',
        content: '上次的服务体验很好，工作人员态度专业，希望能增加更多服务网点。',
        createdAt: Date.now() - 172800000,
        reply: '感谢您的反馈，我们会考虑增加服务网点来提升用户体验。',
        replyTime: Date.now() - 129600000
      }, {
        id: 3,
        title: '技术支持',
        content: '遇到系统登录问题，提示密码错误，但确认密码是正确的。',
        createdAt: Date.now() - 43200000,
        reply: null,
        replyTime: null
      }, {
        id: 4,
        title: '功能建议',
        content: '建议增加在线预约功能，方便提前安排时间。',
        createdAt: Date.now() - 86400000,
        reply: '您的建议已收到，我们正在开发在线预约功能。',
        replyTime: Date.now() - 43200000
      }, {
        id: 5,
        title: '投诉建议',
        content: '上次服务等待时间较长，希望能优化排队系统。',
        createdAt: Date.now() - 259200000,
        reply: null,
        replyTime: null
      }];
      setUserSubmissions(mockSubmissions);
    } catch (error) {
      toast({
        title: "加载失败",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  const handleReply = info => {
    setReplyingInfo(info);
    setReplyContent(info.reply || '');
  };
  const handleSubmitReply = async () => {
    if (!replyContent.trim()) {
      toast({
        title: "回复失败",
        description: "请输入回复内容",
        variant: "destructive"
      });
      return;
    }
    try {
      // 模拟回复提交
      setUserSubmissions(prev => prev.map(info => info.id === replyingInfo.id ? {
        ...info,
        reply: replyContent,
        replyTime: Date.now()
      } : info));
      toast({
        title: "回复成功",
        description: "回复已提交给用户"
      });
      setReplyingInfo(null);
      setReplyContent('');
    } catch (error) {
      toast({
        title: "回复失败",
        description: error.message,
        variant: "destructive"
      });
    }
  };
  const handleBack = () => {
    $w.utils.navigateBack();
  };
  const stats = {
    total: userSubmissions.length,
    replied: userSubmissions.filter(s => s.reply).length,
    pending: userSubmissions.filter(s => !s.reply).length
  };
  if (!userInfo) {
    return <div className="p-4">加载中...</div>;
  }
  return <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={handleBack} className="mr-2">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">{userInfo.username} - 提交记录</h1>
                <p className="text-sm text-gray-600">用户ID: {userInfo.userId}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* 统计信息 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-muted-foreground">总提交数</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.replied}</div>
              <div className="text-sm text-muted-foreground">已回复</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              <div className="text-sm text-muted-foreground">待回复</div>
            </CardContent>
          </Card>
        </div>

        {/* 提交记录列表 */}
        <div className="space-y-4">
          {userSubmissions.map(info => <div key={info.id}>
              <InfoCard info={info} isAdmin={true} onReply={handleReply} />
              
              {/* 回复表单 */}
              {replyingInfo && replyingInfo.id === info.id && <Card className="mt-2 border-l-4 border-l-blue-500">
                  <CardContent className="pt-4">
                    <div className="mb-3">
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        回复内容：
                      </div>
                      <Textarea placeholder="请输入回复内容..." value={replyContent} onChange={e => setReplyContent(e.target.value)} rows={4} />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setReplyingInfo(null)}>
                        取消
                      </Button>
                      <Button onClick={handleSubmitReply}>
                        <Send className="w-4 h-4 mr-2" />
                        提交回复
                      </Button>
                    </div>
                  </CardContent>
                </Card>}
            </div>)}
        </div>

        {userSubmissions.length === 0 && !loading && <Card>
            <CardContent className="p-12 text-center">
              <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500">该用户暂无提交记录</p>
            </CardContent>
          </Card>}

        {loading && <Card>
            <CardContent className="p-12 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-500 mt-4">加载中...</p>
            </CardContent>
          </Card>}
      </div>
    </div>;
}