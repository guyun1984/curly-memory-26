// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, useToast } from '@/components/ui';
// @ts-ignore;
import { LogOut, User } from 'lucide-react';

import { SubmitForm } from '@/components/SubmitForm';
import { ProcessInfo } from '@/components/ProcessInfo';
import { SubmissionHistory } from '@/components/SubmissionHistory';
export default function Home(props) {
  const {
    $w
  } = props;
  const [userInfo, setUserInfo] = useState(null);
  const [submittedInfos, setSubmittedInfos] = useState([]);
  const [processContent, setProcessContent] = useState('1. 登录账号\n2. 提交信息\n3. 等待管理员回复\n4. 查看回复内容');
  const [purchaseContent, setPurchaseContent] = useState('专业快递地址服务，安全可靠');
  const [showHistory, setShowHistory] = useState(false);
  const {
    toast
  } = useToast();
  useEffect(() => {
    // 从页面参数获取用户信息
    const params = $w.page.dataset.params;
    if (params && params.username) {
      setUserInfo({
        username: params.username,
        isAdmin: params.isAdmin === 'true'
      });

      // 模拟加载用户提交的信息
      loadUserInfos();
    } else {
      // 未登录，跳转到登录页
      $w.utils.redirectTo({
        pageId: 'login'
      });
    }
  }, [$w]);
  const loadUserInfos = () => {
    // 模拟数据
    const mockInfos = [{
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
    }];
    setSubmittedInfos(mockInfos);
  };
  const handleSubmitInfo = async content => {
    // 模拟提交信息
    const newInfo = {
      id: Date.now(),
      title: '信息提交',
      content,
      createdAt: Date.now(),
      reply: null,
      replyTime: null
    };
    setSubmittedInfos(prev => [newInfo, ...prev]);
    // 提交后自动展开历史记录
    setShowHistory(true);
  };
  const handleLogout = () => {
    // 模拟登出
    $w.utils.redirectTo({
      pageId: 'login'
    });
  };
  const handleEditContent = type => {
    if (userInfo.isAdmin) {
      $w.utils.navigateTo({
        pageId: 'settings',
        params: {
          editType: type
        }
      });
    }
  };
  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };
  if (!userInfo) {
    return <div className="p-4">加载中...</div>;
  }
  return <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <User className="w-6 h-6 mr-2 text-blue-600" />
              <div>
                <h1 className="text-xl font-semibold">信息收集系统</h1>
                <p className="text-sm text-gray-600">欢迎，{userInfo.username}</p>
              </div>
            </div>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-1" />
              退出登录
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <ProcessInfo processContent={processContent} purchaseContent={purchaseContent} isAdmin={userInfo.isAdmin} onEdit={handleEditContent} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <SubmitForm onSubmit={handleSubmitInfo} />
              
              <SubmissionHistory submissions={submittedInfos} isOpen={showHistory} onToggle={toggleHistory} />
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <h3 className="font-semibold mb-3">系统说明</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• 登录后可提交信息</p>
                <p>• 管理员会在24小时内回复</p>
                <p>• 可多次提交不同问题</p>
                <p>• 点击"我的提交记录"查看历史</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
}