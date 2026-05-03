import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = await params;
  
  const productId = id.includes('-') ? id.split('-').pop() : id;
  
  return {
    title: `Shop Now | Khurai Jewels`,
    description: `Browse our exquisite collection of handcrafted jewelry. Adorn Your Everyday with premium rings, necklaces, earrings, and bracelets from Khurai Jewels, .`,
  };
}