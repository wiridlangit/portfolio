import { useEffect } from 'react';
import { site } from '../constants';

function upsertMeta(keyAttribute, keyValue, content) {
  let tag = document.head.querySelector(`[${keyAttribute}="${keyValue}"]`);

  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(keyAttribute, keyValue);
    document.head.appendChild(tag);
  }

  tag.setAttribute('content', content);
}

export default function useSeo({ title, description, image, type = 'website' } = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${site.name}` : `${site.name} — ${site.tagline}`;

    document.title = fullTitle;

    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:type', type);
    upsertMeta('name', 'twitter:title', fullTitle);

    if (description) {
      upsertMeta('name', 'description', description);
      upsertMeta('property', 'og:description', description);
      upsertMeta('name', 'twitter:description', description);
    }

    if (image) {
      upsertMeta('property', 'og:image', image);
      upsertMeta('name', 'twitter:image', image);
    }
  }, [title, description, image, type]);
}
