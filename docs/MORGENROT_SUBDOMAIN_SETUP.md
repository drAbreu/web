# Morgenrot Subdomain Setup Guide

This guide explains how to set up `morgenrot.datastar.space` as a subdomain for the Morgenrot section of the website.

## Overview

Since this Next.js site uses static export (`output: 'export'`), true server-side subdomain routing isn't possible. However, we can achieve subdomain access through DNS configuration and optional client-side detection.

## Option 1: DNS-Only Setup (Recommended)

This is the simplest approach - just point the subdomain to the same GitHub Pages site.

### DNS Configuration

Add a CNAME record in your domain provider's DNS settings:

```
Type: CNAME
Name: morgenrot
Value: drAbreu.github.io
TTL: 3600 (or your preferred value)
```

### How It Works

- `morgenrot.datastar.space` will resolve to the same GitHub Pages site as `datastar.space`
- Users can access Morgenrot content at `morgenrot.datastar.space/morgenrot`
- The site will work identically to the main domain

### Pros
- ✅ Simple setup
- ✅ No code changes needed
- ✅ Works immediately after DNS propagation

### Cons
- ⚠️ Users still need to navigate to `/morgenrot` path
- ⚠️ No automatic redirect from subdomain root to `/morgenrot`

## Option 2: DNS + Client-Side Detection

This approach detects the subdomain and automatically redirects or customizes the experience.

### Step 1: DNS Configuration

Same as Option 1 - add the CNAME record.

### Step 2: Add Client-Side Detection

Create a middleware component that detects the subdomain:

```typescript
// src/components/SubdomainDetector.tsx
"use client";

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export function SubdomainDetector() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const hostname = window.location.hostname;
    
    // Check if we're on morgenrot subdomain
    if (hostname.startsWith('morgenrot.')) {
      // If on root, redirect to /morgenrot
      if (pathname === '/') {
        router.push('/morgenrot');
      }
    }
  }, [pathname, router]);

  return null;
}
```

Then add it to your root layout:

```typescript
// src/app/layout.tsx
import { SubdomainDetector } from '@/components/SubdomainDetector';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SubdomainDetector />
        {children}
      </body>
    </html>
  );
}
```

### Pros
- ✅ Automatic redirect from subdomain root to `/morgenrot`
- ✅ Can customize experience based on subdomain
- ✅ Better UX for subdomain users

### Cons
- ⚠️ Requires code changes
- ⚠️ Client-side only (no SEO benefit)
- ⚠️ Slight delay before redirect

## Option 3: Separate GitHub Pages Deployment (Advanced)

For a completely separate site experience, you could:

1. Create a separate GitHub repository for Morgenrot
2. Deploy it to a separate GitHub Pages site
3. Point `morgenrot.datastar.space` CNAME to that repository's GitHub Pages

This is overkill for most use cases but provides complete separation.

## Recommended Approach

**Use Option 1 (DNS-Only)** for simplicity, or **Option 2 (DNS + Client-Side)** if you want automatic redirects.

## Testing

After DNS propagation (usually 10-30 minutes, up to 48 hours):

1. Visit `morgenrot.datastar.space`
2. Verify it loads the site
3. Navigate to `morgenrot.datastar.space/morgenrot` to see the Morgenrot page

## Verification Commands

```bash
# Check DNS resolution
nslookup morgenrot.datastar.space

# Check CNAME record
dig morgenrot.datastar.space CNAME

# Test HTTP access
curl -I http://morgenrot.datastar.space
```

## GitHub Pages Configuration

No changes needed in GitHub Pages settings - the CNAME record handles everything. The same site will be accessible via both domains.

## SSL/HTTPS

GitHub Pages will automatically provision an SSL certificate for the subdomain once DNS is configured, similar to the main domain. This usually takes 24-48 hours after DNS propagation.

## Notes

- Both `datastar.space` and `morgenrot.datastar.space` will serve the same content
- The subdomain is primarily for branding/marketing purposes
- All routes work the same on both domains
- SEO: Search engines will treat them as separate domains, so consider canonical URLs if needed

## Canonical URLs (Optional)

If you want to consolidate SEO, you can add canonical URLs to prefer the main domain:

```typescript
// In your page metadata
export const metadata = {
  // ... other metadata
  alternates: {
    canonical: 'https://datastar.space/morgenrot',
  },
};
```

Or prefer the subdomain:

```typescript
export const metadata = {
  alternates: {
    canonical: 'https://morgenrot.datastar.space',
  },
};
```

