export async function generateStaticParams() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pages`);
    const data = await res.json();
  
    return data.docs.map((page: any) => ({
      slug: page.slug,
    }));
  }
  