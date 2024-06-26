import "server-only";

import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { images } from "./db/schema";
import { and, eq } from "drizzle-orm";

export async function getMyImages() {
  const user = auth();

  if (!user.userId) {
    notFound();
  }

  const images = await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });
  return images;
}

export async function getImage(id: number) {
  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!image) {
    notFound();
  }

  return image;
}

export async function deleteImage(id: number) {
  const user = auth();

  if (!user.userId) {
    throw new Error("Unauthorized");
  }

  await db
    .delete(images)
    .where(and(eq(images.id, id), eq(images.userId, user.userId)));

  redirect("/");
}
