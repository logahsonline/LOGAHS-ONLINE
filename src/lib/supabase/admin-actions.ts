"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export async function noopServerAction() {
  // Placeholder so Next can compile server actions folder.
  return;
}

export async function adminRevalidate(path: string) {
  revalidatePath(path);
}

export async function redirectToAdmin(path: string) {
  redirect(path);
}

