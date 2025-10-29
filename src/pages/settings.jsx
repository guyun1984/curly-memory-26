// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Textarea, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Save, ArrowLeft } from 'lucide-react';

export default function Settings(props) {
  const {
    $w
  } = props;
  const [userInfo, setUserInfo] = useState(null);
  const [processContent, setProcessContent] = useState('');
  const [purchaseContent, setPurchaseContent] = useState('');
  const [editType, setEditType] = useState('');
  const {
    toast
  } = useToast();
  useEffect(() => {
    const currentUser = $w.auth.currentUser;
    const params = $w.page.dataset.params;
    if (currentUser && currentUser.type === 'admin') {
      setUserInfo({
        username: currentUser.name || '管理员',
        isAdmin: true
      });

      // 设置编辑类型
      if (params.editType) {
        setEditType(params.editType);
      }

      // 加载现有内容
      loadContent();
    } else {
      $w.utils.redirectTo({
        pageId: 'login'
      });
    }
  }, [$w]);
  const loadContent = () => {
    // 模拟加载内容
    setProcessContent('1. 登录账号\n2. 提交信息\n3. 等待管理员回复\n4. 查看回复内容');
    setPurchaseContent('专业快递地址服务，安全可靠');
  };
  const handleSave = async () => {
    try {
      // 模拟保存内容
      toast({
        title: "保存成功",
        description: "内容已更新，用户将看到最新版本"
      });
      $w.utils.navigateBack();
    } catch (error) {
      toast({
        title: "保存失败",
        description: error.message,
        variant: "destructive"
      });
    }
  };
  const handleBack = () => {
    $w.utils.navigateBack();
  };
  if (!userInfo) {
    return <div className="p-4">加载中...</div>;
  }
  const getEditConfig = () => {
    switch (editType) {
      case 'process':
        return {
          title: '编辑使用流程说明',
          content: processContent,
          setContent: setProcessContent,
          placeholder: '请输入使用流程说明...'
        };
      case 'purchase':
        return {
          title: '编辑购买说明',
          content: purchaseContent,
          setContent: setPurchaseContent,
          placeholder: '请输入购买说明...'
        };
      default:
        return null;
    }
  };
  const config = getEditConfig();
  if (!config) {
    return <div className="min-h-screen bg-gray-50 p-4">
        <Card>
          <CardContent className="p-6 text-center">
            <p>无效的编辑类型</p>
            <Button onClick={handleBack} className="mt-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回
            </Button>
          </CardContent>
        </Card>
      </div>;
  }
  return <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <Button variant="ghost" onClick={handleBack} className="mr-4">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold">系统设置</h1>
              <p className="text-sm text-gray-600">管理员：{userInfo.username}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <Card>
          <CardHeader>
            <CardTitle>{config.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea placeholder={config.placeholder} value={config.content} onChange={e => config.setContent(e.target.value)} rows={8} className="mb-4" />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleBack}>
                取消
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                保存内容
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
}