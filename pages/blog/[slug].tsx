import { GetStaticProps, NextPage } from "next";
import { readdirSync } from 'fs';
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse/lib";
import remarkHtml from "remark-html";

const PostDetail: NextPage<{post:string}> = ({post}) => {
    return (
        <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: post }}>
        </div>
    )
}

export function getStaticPaths() {



    return {
        paths: [],
        fallback: "blocking"
    }
}

export const getStaticProps:GetStaticProps = async (ctx) => {
    const { content } = matter.read(`./posts/${ctx.params?.slug}.md`);
    const { value } = await unified().use(remarkParse).use(remarkHtml).process(content);

    return {
        props: {
            post: value
        }
    }
}

export default PostDetail;

