import { neon } from "@neondatabase/serverless";
import MenuClient from "./MenuClient";

export type MenuItem = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  is_sold_out: boolean;
};

async function getMenus(): Promise<MenuItem[]> {
  const sql = neon(process.env.DATABASE_URL!);
  const rows = await sql`SELECT * FROM menus ORDER BY id`;
  return rows as MenuItem[];
}

export default async function Home() {
  const menus = await getMenus();
  return <MenuClient menus={menus} />;
}