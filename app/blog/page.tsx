import BlogCard from '@/components/blog-card';
import Footer from '@/components/footer';
import Link from 'next/link';
import { Blog, BlogsResponse } from '@/types/blogs';
import BlogPagination from '@/components/blog-pagination';

async function getBlogs(page: number = 1, pageSize: number = 12): Promise<BlogsResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

  try {
    const response = await fetch(
      `${apiUrl}/api/blogs?pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=featured_image&sort=publishedAt:desc`,
      {
        next: { revalidate: 60 }, // Revalidate every 60 seconds
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch blogs');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return {
      data: [],
      meta: {
        pagination: {
          page: 1,
          pageSize,
          pageCount: 0,
          total: 0,
        },
      },
    };
  }
}

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const pageSize = 12;

  const { data: blogs, meta } = await getBlogs(currentPage, pageSize);
  const totalPages = meta?.pagination?.pageCount || 0;

  return (
    <main className="min-h-screen bg-white">
      <div className="bg-zinc-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-4">
            <Link
              href="/"
              className="text-zinc-400 hover:text-white transition-colors text-sm"
            >
              Home
            </Link>
            <span className="text-zinc-600 mx-2">/</span>
            <span className="text-white">Blog</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-zinc-300 max-w-2xl">
            Discover insights, tips, and stories about bikes, riding techniques,
            and cycling lifestyle.
          </p>
        </div>
      </div>

      <section className="px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {blogs.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {blogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>

              {totalPages > 1 && (
                <BlogPagination currentPage={currentPage} totalPages={totalPages} />
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-zinc-600 text-lg">No blog posts found.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
