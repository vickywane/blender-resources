import Link from "next/link";
import { useState } from "react";
import Layout from "../components/Layout";
import Resource from "../components/Resource";
import { getAllResources } from "../utils/getAllResources";

export default function Index({ posts }) {
  const [statePosts, setStatePosts] = useState(posts);
  const [freeFilter, setFreeFilter] = useState(false);

  const onlyFree = () => {
    setFreeFilter((free) => !free);
    if (freeFilter) {
      setStatePosts(posts);
    } else {
      setStatePosts(posts.filter((p) => p.data.free));
    }
  };

  return (
    <Layout>
      <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="absolute inset-0">
          <div className="bg-white h-1/3 sm:h-2/3"></div>
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
              All Resources
            </h2>
          </div>
          <button
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              freeFilter
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
            onClick={onlyFree}
          >
            Only Free
          </button>

          <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            {statePosts.map((post) => (
              <Resource key={post.filePath} {...post} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
export async function getStaticProps() {
  const posts = await getAllResources();
  return { props: { posts } };
}
