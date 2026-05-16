import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, ChevronRight } from "lucide-react";

const categories = ["すべて", "定食", "一品物", "ドリンク", "デザート"];

const menuItems = [
  { id: 1, name: "唐揚げ定食", price: 700, category: "定食", image: "/images/karaageteisyoku.png" },
  { id: 2, name: "生姜焼き定食", price: 800, category: "定食", image: "/images/syougayakiteisyoku.png" },
  { id: 3, name: "焼き鮭定食", price: 650, category: "定食", image: "/images/yakizyaketeisyoku.png" },
  { id: 4, name: "だし巻き卵", price: 200, category: "一品物", image: "/images/dashimakitamago.png" },
  { id: 5, name: "サラダ", price: 300, category: "一品物", image: "/images/sarada.png" },
  { id: 6, name: "フライドポテト", price: 400, category: "一品物", image: "/images/huraidopoteto.png" },
  { id: 7, name: "ジンジャエール", price: 200, category: "ドリンク", image: "/images/zinzyaeru.png" },
  { id: 8, name: "コカ・コーラ", price: 200, category: "ドリンク", image: "/images/kora.png" },
  { id: 9, name: "生ビール", price: 500, category: "ドリンク", image: "/images/biru.png" },
  { id: 10, name: "バニラアイス", price: 300, category: "デザート", image: "/images/banira.png" },
];

export default function Home() {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 flex flex-col">
      {/* ヘッダー */}
      <header className="bg-stone-800 text-white px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-wide">OSAKI 食堂</h1>
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
              <div className="w-20 h-20 bg-stone-100 shrink-0 overflow-hidden">
  <img
    src={item.image}
    alt={item.name}
    className="w-full h-full object-cover"
  />
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
          <span>注文カゴを確認する</span>
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}