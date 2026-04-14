import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/products-service';
import { Product } from '@/types/products';

export const dynamic = 'force-static';
export const revalidate = 3600; // Regenerate every hour

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://weridealong.com';
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || '';
const BRAND = 'WE RIDE ALONG';
const CURRENCY = 'AED';
// Google product taxonomy ID for Electric Bicycles
// https://www.google.com/basepages/producttype/taxonomy-with-ids.en-US.txt
const GOOGLE_PRODUCT_CATEGORY = '3564'; // Sporting Goods > Cycling > Bicycles

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildImageUrl(url: string): string {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}

function buildProductItem(product: Product): string {
  const productUrl = `${SITE_URL}/models/${product.slug}`;
  const imageUrl = buildImageUrl(product.cover_image?.url ?? '');
  const additionalImages = (product.preview_images ?? [])
    .slice(0, 9) // Google allows up to 10 images total
    .map((img) => buildImageUrl(img.url))
    .filter(Boolean);

  const description = escapeXml(
    (product.short_description || product.long_description || product.name)
      .replace(/[#*_`]/g, '')
      .substring(0, 5000)
  );

  const price = product.price?.toFixed(2) ?? '0.00';

  const baseId = product.sku || product.documentId || String(product.id);
  const hasSku = Boolean(product.sku);

  // Build color variants if available
  const colors = product.colors ?? [];
  if (colors.length > 1) {
    // Emit one item per color variant
    return colors
      .map((color) => {
        const variantId = `${baseId}-${color.name.toLowerCase().replace(/\s+/g, '-')}`;
        const inStock =
          color.quantity === undefined || color.quantity > 0
            ? 'in stock'
            : 'out of stock';

        return `
    <item>
      <g:id>${escapeXml(variantId)}</g:id>
      <g:item_group_id>${escapeXml(baseId)}</g:item_group_id>
      <g:title>${escapeXml(`${product.name} - ${color.name}`)}</g:title>
      <g:description>${description}</g:description>
      <g:link>${escapeXml(productUrl)}</g:link>
      ${imageUrl ? `<g:image_link>${escapeXml(imageUrl)}</g:image_link>` : ''}
      ${additionalImages.map((url) => `<g:additional_image_link>${escapeXml(url)}</g:additional_image_link>`).join('\n      ')}
      <g:condition>new</g:condition>
      <g:availability>${inStock}</g:availability>
      <g:price>${price} ${CURRENCY}</g:price>
      <g:brand>${escapeXml(BRAND)}</g:brand>
      <g:google_product_category>${GOOGLE_PRODUCT_CATEGORY}</g:google_product_category>
      <g:color>${escapeXml(color.name)}</g:color>
      ${hasSku ? `<g:mpn>${escapeXml(product.sku)}-${escapeXml(color.name.toLowerCase().replace(/\s+/g, '-'))}</g:mpn>` : ''}
      <g:identifier_exists>${hasSku ? 'yes' : 'no'}</g:identifier_exists>
      <g:shipping>
        <g:country>AE</g:country>
        <g:price>0 ${CURRENCY}</g:price>
      </g:shipping>
    </item>`;
      })
      .join('');
  }

  // Single item (no color variants or only one color)
  const singleColor = colors.length === 1 ? colors[0] : null;
  const inStock =
    singleColor !== null &&
    singleColor.quantity !== undefined &&
    singleColor.quantity <= 0
      ? 'out of stock'
      : 'in stock';
  const colorTag =
    colors.length === 1
      ? `<g:color>${escapeXml(colors[0].name)}</g:color>`
      : '';

  return `
    <item>
      <g:id>${escapeXml(baseId)}</g:id>
      <g:title>${escapeXml(product.name)}</g:title>
      <g:description>${description}</g:description>
      <g:link>${escapeXml(productUrl)}</g:link>
      ${imageUrl ? `<g:image_link>${escapeXml(imageUrl)}</g:image_link>` : ''}
      ${additionalImages.map((url) => `<g:additional_image_link>${escapeXml(url)}</g:additional_image_link>`).join('\n      ')}
      <g:condition>new</g:condition>
      <g:availability>${inStock}</g:availability>
      <g:price>${price} ${CURRENCY}</g:price>
      <g:brand>${escapeXml(BRAND)}</g:brand>
      <g:google_product_category>${GOOGLE_PRODUCT_CATEGORY}</g:google_product_category>
      ${colorTag}
      ${hasSku ? `<g:mpn>${escapeXml(product.sku)}</g:mpn>` : ''}
      <g:identifier_exists>${hasSku ? 'yes' : 'no'}</g:identifier_exists>
      <g:shipping>
        <g:country>AE</g:country>
        <g:price>0 ${CURRENCY}</g:price>
      </g:shipping>
    </item>`;
}

export async function GET() {
  const productsData = await getProducts({ pageSize: 200 });
  const products = productsData?.data ?? [];

  const items = products.map(buildProductItem).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${escapeXml(BRAND)}</title>
    <link>${SITE_URL}</link>
    <description>Cargo bikes and electric bikes in UAE — ${escapeXml(BRAND)}</description>
    ${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
