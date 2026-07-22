import { prisma } from "@repo/prisma/client";
import roles from "./data/roles.json";

export async function seedRoles() {
  await prisma.role.createMany({
    data: roles,
    skipDuplicates: true,
  });

  console.log(`✅ Seeded ${roles.length} roles.`);
}