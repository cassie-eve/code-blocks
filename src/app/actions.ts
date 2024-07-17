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

export async function login(formData: FormData) {

    try{
      const user = await db.user.findFirstOrThrow({
        where: {
          username: formData.get("username") as string,
          password: formData.get("password") as string
        }
      })
      // cookies().set("user_id", String(user.id));
    } catch (error) {
      console.log("User not found)")
      redirect("/login?error=USER_NOT_FOUND");
    }
    redirect("/blocks")
}