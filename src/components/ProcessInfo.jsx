// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui';
// @ts-ignore;
import { ExternalLink, Info } from 'lucide-react';

export function ProcessInfo({
  processContent,
  purchaseContent,
  isAdmin = false,
  onEdit
}) {
  const openExternalLink = url => {
    window.open(url, '_blank');
  };
  return <div className="space-y-4 mb-6">
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader className="pb-3">
          <div className="flex items-center">
            <Info className="w-5 h-5 mr-2 text-blue-600" />
            <CardTitle className="text-blue-800 text-lg">使用流程说明</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-blue-700 whitespace-pre-wrap">
            {processContent || '暂无流程说明'}
          </div>
          {isAdmin && <div className="mt-3">
              <Button onClick={() => onEdit('process')} variant="outline" size="sm">
                编辑说明
              </Button>
            </div>}
        </CardContent>
      </Card>

      <Card className="bg-green-50 border-green-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-green-800 text-lg">快递地址购买</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-green-700 mb-3">
            {purchaseContent || '点击下方按钮购买快递地址服务'}
          </div>
          <Button onClick={() => openExternalLink('http://aceyun.cn/shop/007')} className="bg-green-600 hover:bg-green-700">
            <ExternalLink className="w-4 h-4 mr-2" />
            前往购买
          </Button>
          {isAdmin && <div className="mt-3">
              <Button onClick={() => onEdit('purchase')} variant="outline" size="sm">
                编辑说明
              </Button>
            </div>}
        </CardContent>
      </Card>
    </div>;
}