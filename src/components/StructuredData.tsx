import React from 'react';

type StructuredDataType = 'ItemList' | 'Product' | 'WebSite' | 'Article';

interface StructuredDataProps {
  type: StructuredDataType;
  data: Record<string, any>;
}

/**
 * Injects JSON-LD structured data into the page HEAD for SEO.
 * @param type The Schema.org type
 * @param data The JSON data object
 */
export function StructuredData({ type, data }: StructuredDataProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
