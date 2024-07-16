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

export async function deleteBlock(formData: FormData) {
  const id = Number(formData.get("id"));

  await db.block.delete({
    where: { id },
  });

  redirect('/');
}

export async function editBlock(formData: FormData) {
  const id = Number(formData.get("id"));
  const title = formData.get("title") as string;
  const code = formData.get("code") as string;

  await db.block.update({
    where: { id },
    data: { title, code },
  });

  redirect(`/blocks/${id}`);
}
