import { db } from "@/db";
import Link from "next/link";

export default async function BlocksPage({ params }: any) {
  const block = await db.block.findUnique({
    where: {
      id: Number(params.id),
    },
  });
  return (
    <div>
      <p>Welcome to the Show Block Page</p>
      <p>{block?.title}</p>
      <Link href="/">Go Home</Link>
    </div>
  );
}
