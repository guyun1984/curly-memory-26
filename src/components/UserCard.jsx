// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from '@/components/ui';
// @ts-ignore;
import { User, MessageSquare, ChevronRight } from 'lucide-react';

export function UserCard({
  user,
  onViewDetails
}) {
  const getStatusColor = status => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'replied':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  return <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg">{user.name}</CardTitle>
              <p className="text-sm text-muted-foreground">用户ID: {user._id}</p>
            </div>
          </div>
          <Badge variant={user.is_admin ? "default" : "secondary"}>
            {user.is_admin ? '管理员' : '普通用户'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{user.totalSubmissions || 0}</div>
            <div className="text-sm text-muted-foreground">总提交</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{user.pendingReplies || 0}</div>
            <div className="text-sm text-muted-foreground">待回复</div>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <Badge variant="outline" className={getStatusColor('replied')}>
              <MessageSquare className="w-3 h-3 mr-1" />
              已回复: {user.repliedCount || 0}
            </Badge>
            <Badge variant="outline" className={getStatusColor('pending')}>
              待回复: {user.pendingCount || 0}
            </Badge>
          </div>
          <Button onClick={() => onViewDetails(user)} variant="ghost" size="sm">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>;
}