// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Textarea, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Send } from 'lucide-react';

export function SubmitForm({
  onSubmit
}) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    toast
  } = useToast();
  const handleSubmit = async e => {
    e.preventDefault();
    if (!content.trim()) {
      toast({
        title: "提交失败",
        description: "请输入内容",
        variant: "destructive"
      });
      return;
    }
    setLoading(true);
    try {
      await onSubmit(content);
      setContent('');
      toast({
        title: "提交成功",
        description: "信息已提交，等待管理员回复"
      });
    } catch (error) {
      toast({
        title: "提交失败",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  return <Card>
      <CardHeader>
        <CardTitle>提交信息</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea placeholder="请输入您要提交的信息内容..." value={content} onChange={e => setContent(e.target.value)} rows={4} />
          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? '提交中...' : <>
                  <Send className="w-4 h-4 mr-2" />
                  提交信息
                </>}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>;
}