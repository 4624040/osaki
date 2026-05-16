import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";

type OrderItemInput = {
  id: number;
  name: string;
  price: number;
  qty: number;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const items: OrderItemInput[] = body.items;

    // バリデーション
    if (!items || items.length === 0) {
      return NextResponse.json({ error: "注文が空です" }, { status: 400 });
    }

    const sql = neon(process.env.DATABASE_URL!);

    // 注文ヘッダーを作成
    const orderResult = await sql`
      INSERT INTO orders (created_at) VALUES (NOW()) RETURNING id
    `;
    const orderId = orderResult[0].id;

    // 注文明細を保存
    for (const item of items) {
      await sql`
        INSERT INTO order_items (order_id, menu_id, name, price, qty)
        VALUES (${orderId}, ${item.id}, ${item.name}, ${item.price}, ${item.qty})
      `;
    }

    return NextResponse.json({ success: true, orderId });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "注文の保存に失敗しました" }, { status: 500 });
  }
}