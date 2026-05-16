import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <main className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">shadcn/ui サンプル</h1>
      <div className="space-x-2">
        <Button>デフォルト</Button>
        <Button variant="outline">アウトライン</Button>
        <Button variant="destructive">削除</Button>
      </div>
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle>カードサンプル</CardTitle>
        </CardHeader>
        <CardContent>
          <Input placeholder="テキストを入力..." />
        </CardContent>
      </Card>
    </main>
  );
}