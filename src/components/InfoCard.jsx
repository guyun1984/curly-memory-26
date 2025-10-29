// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from '@/components/ui';
// @ts-ignore;
import { MessageSquare, Clock } from 'lucide-react';

export function InfoCard({
  info,
  isAdmin = false,
  onReply
}) {
  const formatTime = timestamp => {
    return new Date(timestamp).toLocaleString('zh-CN');
  };
  return <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{info.title || '信息提交'}</CardTitle>
          <Badge variant={info.reply ? "default" : "secondary"}>
            {info.reply ? '已回复' : '待回复'}
          </Badge>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="w-3 h-3 mr-1" />
          {formatTime(info.createdAt)}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">提交内容：</p>
          <p className="mt-1">{info.content}</p>
        </div>
        
        {info.reply && <div className="bg-muted p-3 rounded-lg">
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <MessageSquare className="w-3 h-3 mr-1" />
              管理员回复：
            </div>
            <p className="text-foreground">{info.reply}</p>
            <div className="text-xs text-muted-foreground mt-2">
              回复时间：{formatTime(info.replyTime)}
            </div>
          </div>}
        
        {isAdmin && !info.reply && <div className="flex justify-end">
            <Button onClick={() => onReply(info)} variant="outline" size="sm">
              回复
            </Button>
          </div>}
      </CardContent>
    </Card>;
}