# Security Best Practices Guide

## XSS Prevention

### Always Sanitize User Input

```typescript
// ❌ UNSAFE
div.innerHTML = `<p>${userData.name}</p>`;

// ✅ SAFE
import { sanitizeHTML } from '../../lib/security/sanitize';
div.innerHTML = `<p>${sanitizeHTML(userData.name)}</p>`;
```

### URL Sanitization

```typescript
// ❌ UNSAFE
link.href = userInput;

// ✅ SAFE
import { sanitizeURL } from '../../lib/security/sanitize';
link.href = sanitizeURL(userInput);
```

## Safe HTML Rendering

### Prefer textContent Over innerHTML

```typescript
// ✅ BEST
element.textContent = userInput;

// ✅ GOOD
element.innerHTML = sanitizeHTML(userInput);

// ❌ UNSAFE
element.innerHTML = userInput;
```

## Testing for XSS

Test these inputs:

1. `<script>alert('XSS')</script>`
2. `<img src=x onerror=alert('XSS')>`
3. `javascript:alert('XSS')`

**Expected**: All escaped/blocked, not executed.

## Security Checklist

- [ ] All `innerHTML` usage reviewed
- [ ] User input sanitized
- [ ] URLs validated
- [ ] XSS tests passed
- [ ] Firebase security rules configured

## Files Using Sanitization

1. `src/pages/admin/gallery.astro`
2. `src/pages/admin/content/social.astro`
3. `src/pages/admin/content/how-to-buy.astro`
4. `src/pages/admin/content/hero.astro`
5. `src/pages/admin/animals/_index.ts`

## Resources

- [OWASP XSS Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)
