"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, ChevronRight, Plus, Minus, X } from "lucide-react";
import { MenuItem } from "./page";

const categories = ["すべて", "定食", "一品物", "ドリンク", "デザート"];

type OrderItem = { id: number; name: string; price: number; qty: number };

function calcTotal(orders: OrderItem[]) {
  return orders.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function calcPerPerson(total: number, people: number) {
  if (!people || people < 1) return 0;
  return Math.ceil(total / people);
}

export default function MenuClient({ menus }: { menus: MenuItem[] }) {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [people, setPeople] = useState(1);
  const [showCart, setShowCart] = useState(false);
  const [errorId, setErrorId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("すべて");

  const addToOrder = (item: MenuItem) => {
    if (item.is_sold_out) {
      setErrorId(item.id);
      setTimeout(() => setErrorId(null), 2000);
      return;
    }
    setOrders((prev) => {
      const existing = prev.find((o) => o.id === item.id);
      if (existing) {
        return prev.map((o) => o.id === item.id ? { ...o, qty: o.qty + 1 } : o);
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, qty: 1 }];
    });
  };

  const removeFromOrder = (id: number) => {
    setOrders((prev) => {
      const existing = prev.find((o) => o.id === id);
      if (existing && existing.qty > 1) {
        return prev.map((o) => o.id === id ? { ...o, qty: o.qty - 1 } : o);
      }
      return prev.filter((o) => o.id !== id);
    });
  };

  const total = calcTotal(orders);
  const perPerson = calcPerPerson(total, people);
  const totalQty = orders.reduce((sum, o) => sum + o.qty, 0);

  const filteredMenus = menus.filter(
    (item) => selectedCategory === "すべて" || item.category === selectedCategory
  );

  return (
    <div className="max-w-md mx-auto h-screen flex flex-col fixed inset-x-0 top-0 bottom-0" style={{background: "#fdf6ee"}}>
      {/* ヘッダー */}
      <header className="text-white px-4 py-4 shrink-0" style={{background: "linear-gradient(135deg, #5c3d2e, #8b5e3c)"}}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-widest">🍱 OSAKI 食堂</h1>
          </div>
          <button className="relative p-2" onClick={() => setShowCart(!showCart)}>
            <ShoppingCart className="w-6 h-6" />
            {totalQty > 0 && (
              <span className="absolute top-0 right-0 bg-red-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {totalQty}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* 注文カート（展開パネル） */}
      {showCart && (
        <div className="border-b shadow-md px-4 py-4 space-y-3 shrink-0" style={{background: "#fff8f0", borderColor: "#d4a96a"}}>
          <h2 className="font-bold text-lg" style={{color: "#5c3d2e"}}>🛒 注文リスト</h2>
          {orders.length === 0 ? (
            <p className="text-sm" style={{color: "#a0856a"}}>まだ何も追加されていません</p>
          ) : (
            <>
              {orders.map((o) => (
                <div key={o.id} className="flex items-center justify-between text-sm py-1 border-b" style={{borderColor: "#f0dcc0"}}>
                  <span className="flex-1 font-medium" style={{color: "#5c3d2e"}}>{o.name}</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => removeFromOrder(o.id)} className="w-6 h-6 rounded-full flex items-center justify-center" style={{background: "#e8d5b7"}}>
                      <Minus className="w-3 h-3" style={{color: "#5c3d2e"}} />
                    </button>
                    <span className="w-4 text-center font-bold" style={{color: "#5c3d2e"}}>{o.qty}</span>
                    <button onClick={() => addToOrder(menus.find((m) => m.id === o.id)!)} className="w-6 h-6 rounded-full flex items-center justify-center" style={{background: "#e8d5b7"}}>
                      <Plus className="w-3 h-3" style={{color: "#5c3d2e"}} />
                    </button>
                    <span className="w-16 text-right font-bold" style={{color: "#8b5e3c"}}>¥{(o.price * o.qty).toLocaleString()}</span>
                    <button onClick={() => setOrders((prev) => prev.filter((item) => item.id !== o.id))}>
                      <X className="w-4 h-4" style={{color: "#c4a882"}} />
                    </button>
                  </div>
                </div>
              ))}
              <div className="pt-2 space-y-3">
                <div className="flex justify-between font-bold text-lg" style={{color: "#5c3d2e"}}>
                  <span>合計金額</span>
                  <span>¥{total.toLocaleString()}</span>
                </div>
                <div className="rounded-xl p-3 flex items-center gap-2 text-sm" style={{background: "#f5e6d0"}}>
                  <span style={{color: "#5c3d2e"}}>割り勘：</span>
                  <input
                    type="number"
                    min={1}
                    value={people}
                    onChange={(e) => setPeople(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-14 border rounded-lg px-2 py-1 text-center font-bold"
                    style={{borderColor: "#d4a96a", color: "#5c3d2e"}}
                  />
                  <span style={{color: "#5c3d2e"}}>人 → 1人あたり</span>
                  <span className="font-bold text-base" style={{color: "#8b5e3c"}}>¥{perPerson.toLocaleString()}</span>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* カテゴリタブ */}
      <div className="border-b overflow-x-auto shrink-0" style={{background: "#fff8f0", borderColor: "#e8d5b7"}}>
        <div className="flex px-4 py-2 gap-2 w-max">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all"
              style={
                cat === selectedCategory
                  ? { background: "#5c3d2e", color: "#fff" }
                  : { background: "#f0dcc0", color: "#8b5e3c" }
              }
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* メニューエリア */}
      <main className="flex-1 overflow-y-auto px-4 py-4 space-y-3 pb-28">
        <h2 className="text-sm font-bold border-l-4 pl-2" style={{color: "#8b5e3c", borderColor: "#8b5e3c"}}>
          {selectedCategory}
        </h2>
        {filteredMenus.map((item) => (
          <Card key={item.id} className={`shadow-sm overflow-hidden border ${item.is_sold_out ? "opacity-50" : ""}`} style={{borderColor: "#e8d5b7", background: "#fffbf5"}}>
            <CardContent className="p-0 flex items-center">
              <div className="w-24 h-24 shrink-0 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 px-3 py-2">
                <p className="font-bold text-sm" style={{color: "#3d2314"}}>{item.name}</p>
                <p className="text-xs mt-0.5" style={{color: "#a0856a"}}>{item.category}</p>
                <p className="text-lg font-bold mt-1" style={{color: "#8b5e3c"}}>¥{item.price.toLocaleString()}</p>
                {item.is_sold_out && <p className="text-xs font-bold mt-0.5" style={{color: "#c0392b"}}>品切れ</p>}
                {errorId === item.id && (
                  <p className="text-xs font-bold mt-0.5" style={{color: "#c0392b"}}>品切れのため追加できません</p>
                )}
              </div>
              <button
                onClick={() => addToOrder(item)}
                className="w-10 h-10 rounded-full flex items-center justify-center mr-3 shrink-0 text-white font-bold text-xl shadow"
                style={item.is_sold_out ? {background: "#ccc", cursor: "not-allowed"} : {background: "#8b5e3c"}}
              >
                +
              </button>
            </CardContent>
          </Card>
        ))}
      </main>

      {/* 注文リストボタン（固定フッター） */}
      <div className="shrink-0 px-4 pb-6 pt-4" style={{background: "linear-gradient(to top, #fdf6ee, transparent)"}}>
        <Button
          onClick={() => setShowCart(!showCart)}
          className="w-full h-14 text-base rounded-2xl flex items-center justify-between px-6 shadow-lg text-white font-bold"
          style={{background: "linear-gradient(135deg, #5c3d2e, #8b5e3c)"}}
        >
          <span className="bg-white text-sm font-bold rounded-full w-7 h-7 flex items-center justify-center" style={{color: "#5c3d2e"}}>
            {totalQty}
          </span>
          <span>注文カゴを確認する</span>
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}