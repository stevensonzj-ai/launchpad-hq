import { ModerationStatus } from "@prisma/client";
import { prisma } from "@/lib/db";
import type { ListPage, ListParams } from "@/lib/community-lists";

/**
 * The Prisma reads behind the cached community lists. APPROVED rows only,
 * and only public fields (the author display name, never account fields).
 * Nothing here may read the visitor: these run inside the shared cache.
 */

// TODO: reconsider default sort once rating data exists
export async function readApprovedPrompts(slug: string, { page, pageSize }: ListParams) {
  const platform = await prisma.platform.findUnique({
    where: { slug },
    select: { id: true },
  });
  if (!platform) return null;

  const where = { platformId: platform.id, status: ModerationStatus.APPROVED };
  const [rows, totalCount] = await Promise.all([
    prisma.prompt.findMany({
      where,
      include: { user: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.prompt.count({ where }),
  ]);

  const items = rows.map((p) => ({
    id: p.id,
    title: p.title,
    prompt: p.promptText,
    outputUrl: p.outputUrl,
    author: p.user?.name ?? p.author ?? "Anonymous",
    ratingAvg:
      p.ratingCount > 0
        ? Math.round((p.ratingSum / p.ratingCount) * 10) / 10
        : null,
    ratingCount: p.ratingCount,
    createdAt: p.createdAt,
  }));

  return { items, totalCount } satisfies ListPage<unknown>;
}

export async function readApprovedDiscussions(slug: string, { page, pageSize }: ListParams) {
  const platform = await prisma.platform.findUnique({
    where: { slug },
    select: { id: true },
  });
  if (!platform) return null;

  const where = { platformId: platform.id, status: ModerationStatus.APPROVED };
  const [rows, totalCount] = await Promise.all([
    prisma.discussion.findMany({
      where,
      include: {
        user: { select: { name: true } },
        replies: {
          where: { status: ModerationStatus.APPROVED },
          include: { user: { select: { name: true } } },
          orderBy: { createdAt: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.discussion.count({ where }),
  ]);

  const items = rows.map((d) => ({
    id: d.id,
    title: d.title,
    body: d.body,
    solution: d.solution,
    upvotes: d.upvotes,
    author: d.user?.name ?? "Anonymous",
    createdAt: d.createdAt,
    replies: d.replies.map((r) => ({
      id: r.id,
      body: r.body,
      upvotes: r.upvotes,
      author: r.user?.name ?? "Anonymous",
      createdAt: r.createdAt,
    })),
  }));

  return { items, totalCount } satisfies ListPage<unknown>;
}
