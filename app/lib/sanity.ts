import { createClient } from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";

export const client = createClient({
    apiVersion: '2023-05-03',
    dataset: 'production',
    projectId: 'kkn3lo2l',
    useCdn: false, // 이 부분이 false인지 확인
  });

const builder = ImageUrlBuilder(client)

export function urlFor(source: any) {
    return builder.image(source);
}

