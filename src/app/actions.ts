"use server";
import { db } from "@/db";
import { redirect } from "next/navigation";

export async function createBlock(formData: FormData) {
  const title = formData.get("title") as string;
  const code = formData.get("code") as string;
  
  const newBlock = await db.block.create({ 
    data: { title, code } 
  });

  redirect(`/blocks/${newBlock.id}`);
}

// async function deleteBlock(formData: FormData) {
//   const title = formData.get("title") as string;
//   const code = formData.get("code") as string;
// await db.block.delete({ data: { title, code } });
//   redirect("/blocks");
// }

// async function editBlock(formData: FormData) {
//   const title = formData.get("title") as string;
//   const code = formData.get("code") as string;
//   await db.block.create({ data: { title, code } });
//   redirect("/blocks");
// }