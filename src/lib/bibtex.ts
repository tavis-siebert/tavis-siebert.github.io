// A small BibTeX parser: enough for entries exported from arXiv / Scholar.

export interface Publication {
  key: string;
  type: string;
  title: string;
  authors: string[];
  year: number;
  venue: string;
  url?: string;
  pdf?: string;
  code?: string;
  project?: string;
  note?: string;
}

type Fields = Record<string, string>;

function parseEntries(src: string): { type: string; key: string; fields: Fields }[] {
  const entries = [];
  let i = 0;
  while ((i = src.indexOf('@', i)) !== -1) {
    const open = src.indexOf('{', i);
    if (open === -1) break;
    const type = src.slice(i + 1, open).trim().toLowerCase();

    // Find the matching closing brace of the entry.
    let depth = 0;
    let end = open;
    for (; end < src.length; end++) {
      if (src[end] === '{') depth++;
      else if (src[end] === '}' && --depth === 0) break;
    }
    const body = src.slice(open + 1, end);
    i = end + 1;
    if (type === 'comment' || type === 'string' || type === 'preamble') continue;

    const comma = body.indexOf(',');
    const key = body.slice(0, comma).trim();
    entries.push({ type, key, fields: parseFields(body.slice(comma + 1)) });
  }
  return entries;
}

function parseFields(body: string): Fields {
  const fields: Fields = {};
  let i = 0;
  while (i < body.length) {
    const eq = body.indexOf('=', i);
    if (eq === -1) break;
    const name = body.slice(i, eq).replace(/[,\s]/g, '').toLowerCase();
    let j = eq + 1;
    while (/\s/.test(body[j])) j++;

    let value = '';
    if (body[j] === '{') {
      let depth = 0;
      const start = j;
      for (; j < body.length; j++) {
        if (body[j] === '{') depth++;
        else if (body[j] === '}' && --depth === 0) break;
      }
      value = body.slice(start + 1, j);
      j++;
    } else if (body[j] === '"') {
      const start = ++j;
      while (j < body.length && body[j] !== '"') j++;
      value = body.slice(start, j);
      j++;
    } else {
      const start = j;
      while (j < body.length && body[j] !== ',') j++;
      value = body.slice(start, j).trim();
    }
    fields[name] = clean(value);
    i = j;
  }
  return fields;
}

const clean = (s: string) => s.replace(/[{}]/g, '').replace(/\s+/g, ' ').trim();

// "Last, First" -> "First Last"
function formatAuthor(a: string): string {
  const parts = a.split(',').map((p) => p.trim());
  return parts.length === 2 ? `${parts[1]} ${parts[0]}` : a.trim();
}

function venueOf(f: Fields): string {
  if (f.journal && !/arxiv/i.test(f.journal)) return f.journal;
  if (f.booktitle) return f.booktitle;
  if (/arxiv/i.test(f.archiveprefix ?? f.journal ?? '') || f.eprint) return 'arXiv preprint';
  return f.publisher ?? f.howpublished ?? '';
}

export function parseBibtex(src: string): Publication[] {
  return parseEntries(src)
    .map(({ type, key, fields: f }) => ({
      key,
      type,
      title: f.title ?? '',
      authors: (f.author ?? '').split(/\s+and\s+/).map(formatAuthor).filter(Boolean),
      year: Number(f.year) || 0,
      venue: venueOf(f),
      url: f.url ?? (f.doi ? `https://doi.org/${f.doi}` : undefined),
      pdf: f.pdf,
      code: f.code,
      project: f.project,
      note: f.note,
    }))
    .sort((a, b) => b.year - a.year);
}
