import Layout from "@components/Common/Layout";
import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { NextPage } from "next";
import Link from "next/link";

interface Post {
    title:string,
    date: string,
    category: string
    slug:string
}

const Blog:NextPage<{posts:Post[]}> = ({posts}) => {

    return (
        <Layout title="Blog" seoTitle="Blog | Carrot Market">
            <h1 className="font-semibold text-lg mb-10 mt-5 text-center">Latest Posts</h1>
            <div className="mx-4">
                {posts.map((post, index) => (
                    <div key={index} className="mb-5">
                        <Link href={`/blog/${post.slug}`}>
                            <a>
                                <span className="text-lg text-red-500">{post.title}</span>
                                <div><span className="text-sm">{post.date} / {post.category} </span></div>
                            </a>
                        </Link>
                    </div>
                ))}
            </div>
        </Layout>
    )
}

export async function getStaticProps() {

    const blogPosts = readdirSync("./posts").map((file) => {
        const content = readFileSync(`./posts/${file}`, "utf-8");
        const [slug, _] = file.split(".");
        return {...matter(content).data, slug};
    })

    return {
        props: {
            posts: blogPosts
        }
    }
}

export default Blog;