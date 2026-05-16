import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, ChevronRight } from "lucide-react";

const categories = ["すべて", "前菜", "メイン", "ドリンク", "デザート"];

const menuItems = [
  { id: 1, name: "看板料理 A", price: 980, category: "メイン", emoji: "🍱" },
  { id: 2, name: "季節の前菜", price: 580, category: "前菜", emoji: "🥗" },
  { id: 3, name: "特製スープ", price: 480, category: "前菜", emoji: "🍲" },
  { id: 4, name: "本日のメイン", price: 1280, category: "メイン", emoji: "🍛" },
  { id: 5, name: "クラフトビール", price: 680, category: "ドリンク", emoji: "🍺" },
  { id: 6, name: "抹茶パフェ", price: 580, category: "デザート", emoji: "🍨" },
];

export default function Home() {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 flex flex-col">
      {/* ヘッダー */}
      <header className="bg-stone-800 text-white px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-wide">OSAKI 亭</h1>
            <p className="text-xs text-stone-300">テーブル 3番</p>
          </div>
          <button className="relative p-2">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              2
            </span>
          </button>
        </div>
      </header>

      {/* カテゴリタブ */}
      <div className="bg-white border-b overflow-x-auto">
        <div className="flex px-4 py-2 gap-2 w-max">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${
                cat === "すべて"
                  ? "bg-stone-800 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* メニューエリア */}
      <main className="flex-1 px-4 py-4 space-y-3 pb-28">
        <h2 className="text-sm font-semibold text-gray-500">全メニュー</h2>
        {menuItems.map((item) => (
          <Card key={item.id} className="shadow-sm">
            <CardContent className="p-3 flex items-center gap-3">
              <div className="text-4xl w-14 h-14 bg-stone-100 rounded-xl flex items-center justify-center">
                {item.emoji}
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{item.name}</p>
                <p className="text-xs text-gray-400">{item.category}</p>
                <p className="text-base font-bold text-stone-800 mt-1">
                  ¥{item.price.toLocaleString()}
                </p>
              </div>
              <button className="w-8 h-8 bg-stone-800 text-white rounded-full flex items-center justify-center text-xl font-bold">
                +
              </button>
            </CardContent>
          </Card>
        ))}
      </main>

      {/* 注文リストボタン（固定フッター） */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md px-4 pb-6 bg-gradient-to-t from-gray-50 pt-4">
        <Button className="w-full bg-stone-800 hover:bg-stone-700 h-14 text-base rounded-2xl flex items-center justify-between px-6">
          <span className="bg-white text-stone-800 text-sm font-bold rounded-full w-7 h-7 flex items-center justify-center">
            2
          </span>
          <span>注文リストを見る</span>
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}