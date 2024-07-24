"use server";
import { db } from "@/db";
import { redirect } from "next/navigation";
import { cookies } from 'next/headers';

export async function createBlock(formData: FormData) {
  const title = formData.get("title") as string;
  const code = formData.get("code") as string;
  const userId = cookies().get("user_id")?.value || redirect("/login");

  const newBlock = await db.block.create({
    data: { 
      title, 
      code,
      userId: Number(userId),
    }
  });

  redirect(`/blocks/${newBlock.id}`);
}

export async function deleteBlock(formData: FormData) {
  const id = Number(formData.get("id"));
  const userId = cookies().get("user_id")?.value || redirect("/login");

  await db.block.deleteMany({
    where: { 
      id,
      userId: Number(userId),
    },
  });

  redirect('/');
}
export async function editBlock(formData: FormData) {
  const id = Number(formData.get("id"));
  const title = formData.get("title") as string;
  const code = formData.get("code") as string;
  const userId = cookies().get("user_id")?.value || redirect("/login");

  await db.block.updateMany({
    where: { 
      id,
      userId: Number(userId),
    },
    data: { title, code },
  });

  redirect(`/blocks/${id}`);
}

export async function login(formData: FormData) {
  try {
    const user = await db.user.findFirstOrThrow({
      where: {
        username: formData.get("username") as string,
        password: formData.get("password") as string
      }
    });
    cookies().set("user_id", String(user.id));
    redirect("/");
  } catch (error) {
    console.log("User not found or invalid credentials", error);
    redirect("/login?error=USER_NOT_FOUND");
  }
}
