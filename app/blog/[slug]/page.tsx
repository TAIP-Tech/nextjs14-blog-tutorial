import { fullBlog } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import { PortableText } from "next-sanity";
import Image from "next/image";

async function getData(slug: string) {
  // URL 디코딩 추가
  const decodedSlug = decodeURIComponent(slug);
  
  const query = `
  *[_type == "blog" && slug.current == $slug][0]{
    "currentSlug": slug.current,
    title,
    content,
    titleImage
  }`;

  try {
    const data = await client.fetch(query, { slug: decodedSlug });
    if (!data) {
      console.log(`No data found for slug: ${decodedSlug}`);
      return null;
    }
    return data;
  } catch (error) {
    console.error(`Error fetching data for slug ${decodedSlug}:`, error);
    throw error;
  }
}

export default async function BlogArticle({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const data: fullBlog | null = await getData(params.slug);

    if (!data) {
      return <div className="text-center mt-8">블로그 포스트를 찾을 수 없습니다.</div>;
    }

    return (
      <div className="mt-8">
        <h1>
          <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
            Jjan Marshal - Blog
          </span>
          <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
            {data.title}
          </span>
        </h1>

        {data.titleImage && (
          <Image
            src={urlFor(data.titleImage).url()}
            width={800}
            height={800}
            alt="Title Image"
            priority
            className="rounded-lg mt-8 border"
          />
        )}
        
        <div className="mt-16 prose prose-blue prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary">
          <PortableText value={data.content} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in BlogArticle:", error);
    return <div className="text-center mt-8">블로그 포스트를 불러오는 중 오류가 발생했습니다.</div>;
  }
}