import { ImageResponse } from 'next/og';
import { blogPosts, getPostBySlug } from '@/lib/blog';
import { OgCard, loadOgFonts, loadOgLogo, ogContentType, ogSize } from '@/lib/og';

/** Une carte de partage par article du journal. */
export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Article du journal — Les Petits Repères';

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function PostOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return new ImageResponse(
    (
      <OgCard
        logo={await loadOgLogo()}
        eyebrow={post ? `Le journal · ${post.category}` : 'Le journal'}
        title={post?.title ?? 'Le journal'}
        subtitle={post?.excerpt}
        badge={post ? `${post.readingMinutes} min` : undefined}
      />
    ),
    { ...size, fonts: await loadOgFonts() },
  );
}
