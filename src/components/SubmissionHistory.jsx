// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui';
// @ts-ignore;
import { ChevronDown, ChevronUp, MessageSquare, Clock } from 'lucide-react';

export function SubmissionHistory({
  submissions,
  isOpen,
  onToggle
}) {
  const formatTime = timestamp => {
    return new Date(timestamp).toLocaleString('zh-CN');
  };
  const stats = {
    total: submissions.length,
    replied: submissions.filter(s => s.reply).length,
    pending: submissions.filter(s => !s.reply).length
  };
  return <Card>
      <Collapsible open={isOpen} onOpenChange={onToggle}>
        <CardHeader className="pb-3 cursor-pointer">
          <CollapsibleTrigger className="flex justify-between items-center w-full">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg">我的提交记录</CardTitle>
                <div className="flex space-x-4 text-sm text-muted-foreground">
                  <span>总计: {stats.total}</span>
                  <span className="text-green-600">已回复: {stats.replied}</span>
                  <span className="text-yellow-600">待回复: {stats.pending}</span>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </CollapsibleTrigger>
        </CardHeader>
        
        <CollapsibleContent>
          <CardContent className="pt-0">
            {submissions.length > 0 ? <div className="space-y-4">
                {submissions.map((info, index) => <div key={info.id} className="border-l-4 border-l-blue-200 pl-4 py-2">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {info.title || `提交 #${submissions.length - index}`}
                        </h4>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <Clock className="w-3 h-3 mr-1" />
                          {formatTime(info.createdAt)}
                        </div>
                      </div>
                      <Badge variant={info.reply ? "default" : "secondary"} className="text-xs">
                        {info.reply ? '已回复' : '待回复'}
                      </Badge>
                    </div>
                    
                    <div className="text-sm text-gray-700 mb-2">
                      <span className="font-medium">内容：</span>
                      {info.content}
                    </div>
                    
                    {info.reply && <div className="bg-green-50 border border-green-200 rounded p-3 mt-2">
                        <div className="flex items-center text-sm text-green-700 mb-1">
                          <MessageSquare className="w-3 h-3 mr-1" />
                          <span className="font-medium">管理员回复：</span>
                        </div>
                        <p className="text-green-800">{info.reply}</p>
                        <div className="text-xs text-green-600 mt-1">
                          回复时间：{formatTime(info.replyTime)}
                        </div>
                      </div>}
                  </div>)}
              </div> : <div className="text-center py-8 text-gray-500">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>暂无提交记录</p>
              </div>}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>;
}