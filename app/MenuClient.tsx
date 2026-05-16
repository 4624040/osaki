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
    <div className="max-w-md mx-auto h-screen bg-gray-50 flex flex-col fixed inset-x-0 top-0 bottom-0">
      {/* ヘッダー */}
      <header className="bg-stone-800 text-white px-4 py-4 shrink-0">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-wide">OSAKI 食堂</h1>
          <button className="relative p-2" onClick={() => setShowCart(!showCart)}>
            <ShoppingCart className="w-6 h-6" />
            {totalQty > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalQty}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* 注文カート（展開パネル） */}
      {showCart && (
        <div className="bg-white border-b shadow-md px-4 py-4 space-y-3 shrink-0">
          <h2 className="font-bold text-stone-800">注文リスト</h2>
          {orders.length === 0 ? (
            <p className="text-sm text-gray-400">まだ何も追加されていません</p>
          ) : (
            <>
              {orders.map((o) => (
                <div key={o.id} className="flex items-center justify-between text-sm">
                  <span className="flex-1">{o.name}</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => removeFromOrder(o.id)} className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-4 text-center">{o.qty}</span>
                    <button onClick={() => addToOrder(menus.find((m) => m.id === o.id)!)} className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                      <Plus className="w-3 h-3" />
                    </button>
                    <span className="w-16 text-right">¥{(o.price * o.qty).toLocaleString()}</span>
                    <button onClick={() => setOrders((prev) => prev.filter((item) => item.id !== o.id))}>
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              ))}
              <div className="border-t pt-2 space-y-2">
                <div className="flex justify-between font-bold text-stone-800">
                  <span>合計</span>
                  <span>¥{total.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span>割り勘：</span>
                  <input
                    type="number"
                    min={1}
                    value={people}
                    onChange={(e) => setPeople(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-14 border rounded px-2 py-1 text-center"
                  />
                  <span>人 → 1人あたり</span>
                  <span className="font-bold text-stone-800">¥{perPerson.toLocaleString()}</span>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* カテゴリタブ */}
      <div className="bg-white border-b overflow-x-auto shrink-0">
        <div className="flex px-4 py-2 gap-2 w-max">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${
                cat === selectedCategory ? "bg-stone-800 text-white" : "bg-gray-100 text-gray-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* メニューエリア */}
      <main className="flex-1 overflow-y-auto px-4 py-4 space-y-3 pb-28">
        <h2 className="text-sm font-semibold text-gray-500">
          {selectedCategory === "すべて" ? "全メニュー" : selectedCategory}
        </h2>
        {filteredMenus.map((item) => (
          <Card key={item.id} className={`shadow-sm ${item.is_sold_out ? "opacity-50" : ""}`}>
            <CardContent className="p-3 flex items-center gap-3">
              <div className="w-20 h-20 bg-stone-100 shrink-0 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{item.name}</p>
                <p className="text-xs text-gray-400">{item.category}</p>
                <p className="text-base font-bold text-stone-800 mt-1">¥{item.price.toLocaleString()}</p>
                {item.is_sold_out && <p className="text-xs text-red-500 font-medium">品切れ</p>}
                {errorId === item.id && (
                  <p className="text-xs text-red-500 font-medium">品切れのため追加できません</p>
                )}
              </div>
              <button
                onClick={() => addToOrder(item)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xl font-bold ${
                  item.is_sold_out ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-stone-800 text-white"
                }`}
              >
                +
              </button>
            </CardContent>
          </Card>
        ))}
      </main>

      {/* 注文リストボタン（固定フッター） */}
      <div className="shrink-0 px-4 pb-6 pt-4 bg-gradient-to-t from-gray-50">
        <Button
          onClick={() => setShowCart(!showCart)}
          className="w-full bg-stone-800 hover:bg-stone-700 h-14 text-base rounded-2xl flex items-center justify-between px-6"
        >
          <span className="bg-white text-stone-800 text-sm font-bold rounded-full w-7 h-7 flex items-center justify-center">
            {totalQty}
          </span>
          <span>注文カゴを確認する</span>
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}