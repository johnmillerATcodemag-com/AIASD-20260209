---
slice_id: VS-17
phase: 4
priority: Medium
dependencies: VS-01
---

# Prompt: Implement VS-17 - Progressive Web App (PWA)

## Goal

Convert the calculator to a Progressive Web App (PWA) for offline functionality and installability. This enables users to install the calculator as a standalone app on their devices and use it without an internet connection.

## User Story

As a user, I want to install the calculator as an app so that I can use it offline and access it quickly from my home screen.

## Overview

**Effort**: 10 hours
**Risk**: Medium (service worker complexity, cross-browser testing)
**Impact**: Transforms web calculator into app-like experience

PWA features provide:
- **Offline functionality** - Works without internet after first visit
- **Installability** - Add to home screen on mobile/desktop
- **App-like experience** - Standalone window, no browser UI
- **Fast loading** - Assets cached locally
- **Auto-updates** - Service worker manages updates

## Implementation Steps

### 1. Create Web App Manifest (`manifest.json`)

Create a manifest file that defines how the app appears when installed:

```json
{
  "name": "Web Calculator",
  "short_name": "Calculator",
  "description": "A fast, accessible web calculator with offline support",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "orientation": "portrait-primary",
  "background_color": "#ffffff",
  "theme_color": "#2196F3",
  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
  "categories": ["utilities", "productivity"],
  "shortcuts": [
    {
      "name": "Open Calculator",
      "short_name": "Calculate",
      "description": "Open the calculator",
      "url": "/",
      "icons": [
        {
          "src": "/icons/icon-96x96.png",
          "sizes": "96x96"
        }
      ]
    }
  ]
}
```

### 2. Link Manifest in HTML (`index.html`)

Add manifest link and PWA meta tags to `<head>`:

```html
<!-- PWA Manifest -->
<link rel="manifest" href="/manifest.json">

<!-- Theme Color -->
<meta name="theme-color" content="#2196F3">

<!-- Apple Touch Icons -->
<link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png">
<link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png">
<link rel="apple-touch-icon" sizes="144x144" href="/icons/icon-144x144.png">

<!-- Apple Specific -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="Calculator">

<!-- Microsoft Specific -->
<meta name="msapplication-TileImage" content="/icons/icon-144x144.png">
<meta name="msapplication-TileColor" content="#2196F3">
```

### 3. Create App Icons

Generate icons in required sizes:
- **72×72** - Small tile
- **96×96** - Android
- **128×128** - Chrome Web Store
- **144×144** - Microsoft
- **152×152** - iOS
- **192×192** - Android standard
- **384×384** - Android
- **512×512** - Android splash screen (also maskable)
- **180×180** - Apple touch icon

**Icon Design Tips:**
- Use simple, recognizable calculator icon
- Ensure icon works at small sizes
- Provide maskable version (512×512 with safe zone)
- Use brand colors matching theme
- Test on light and dark backgrounds

### 4. Implement Service Worker (`sw.js`)

Create service worker to handle caching and offline functionality:

```javascript
const CACHE_NAME = 'calculator-v1';
const CACHE_VERSION = '1.0.0';

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/calculator.js',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[Service Worker] Installation complete');
        return self.skipWaiting(); // Activate immediately
      })
      .catch((error) => {
        console.error('[Service Worker] Installation failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('[Service Worker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[Service Worker] Activation complete');
        return self.clients.claim(); // Take control immediately
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Return cached response if found
        if (cachedResponse) {
          console.log('[Service Worker] Serving from cache:', event.request.url);
          return cachedResponse;
        }

        // Otherwise fetch from network
        console.log('[Service Worker] Fetching from network:', event.request.url);
        return fetch(event.request)
          .then((networkResponse) => {
            // Cache successful GET requests
            if (event.request.method === 'GET' && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseClone);
                });
            }
            return networkResponse;
          })
          .catch((error) => {
            console.error('[Service Worker] Fetch failed:', error);

            // Return offline fallback for HTML requests
            if (event.request.destination === 'document') {
              return caches.match('/index.html');
            }

            throw error;
          });
      })
  );
});

// Message event - handle messages from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
```

### 5. Register Service Worker (`app.js`)

Add service worker registration code to your main JavaScript:

```javascript
// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('Service Worker registered:', registration.scope);

        // Check for updates periodically
        setInterval(() => {
          registration.update();
        }, 60000); // Check every minute

        // Handle updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;

          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New service worker available
              showUpdateNotification();
            }
          });
        });
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

// Show update notification
function showUpdateNotification() {
  // Option 1: Auto-update (reload page)
  if (confirm('A new version is available. Reload to update?')) {
    window.location.reload();
  }

  // Option 2: Show banner with update button
  // const banner = document.createElement('div');
  // banner.className = 'update-banner';
  // banner.innerHTML = `
  //   <p>New version available!</p>
  //   <button onclick="window.location.reload()">Update</button>
  // `;
  // document.body.appendChild(banner);
}
```

### 6. Implement Install Prompt (Optional Enhancement)

Add custom install button for better UX:

```javascript
let deferredPrompt;

// Capture install prompt
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent Chrome <= 67 from automatically showing prompt
  event.preventDefault();

  // Save event for later use
  deferredPrompt = event;

  // Show custom install button
  const installButton = document.getElementById('install-button');
  if (installButton) {
    installButton.style.display = 'block';

    installButton.addEventListener('click', async () => {
      // Show install prompt
      deferredPrompt.prompt();

      // Wait for user response
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User ${outcome} the install prompt`);

      // Clear prompt
      deferredPrompt = null;
      installButton.style.display = 'none';
    });
  }
});

// Track successful install
window.addEventListener('appinstalled', () => {
  console.log('PWA installed successfully');
  deferredPrompt = null;
});
```

### 7. Test Offline Functionality

**Chrome DevTools Testing:**
1. Open DevTools → Application tab
2. Navigate to Service Workers
3. Check "Offline" checkbox
4. Reload page - should work without network
5. Check "Update on reload" for development

**Real Device Testing:**
1. Deploy to test server (HTTPS required)
2. Visit on mobile device
3. Enable airplane mode
4. Verify calculator still works

### 8. Run Lighthouse PWA Audit

**Criteria for PWA:**
- ✅ Installable (manifest + service worker)
- ✅ Works offline
- ✅ HTTPS served
- ✅ Responsive design
- ✅ Fast load time (<3s)
- ✅ PWA optimized

**Target Scores:**
- PWA: ≥90
- Performance: ≥90
- Accessibility: 100
- Best Practices: ≥90
- SEO: ≥90

## Acceptance Criteria

- [ ] Manifest.json configured with all required fields
- [ ] Service worker implemented with cache-first strategy
- [ ] All static assets cached on install
- [ ] Works offline after first visit
- [ ] "Add to Home Screen" prompt appears on eligible devices
- [ ] App icons display correctly on all platforms (iOS, Android, desktop)
- [ ] Installed app opens in standalone mode (no browser UI)
- [ ] Lighthouse PWA score ≥90
- [ ] Service worker updates handled gracefully
- [ ] HTTPS served (required for service workers)

## Verification Steps

### Manual Tests

1. **First Visit**:
   - Visit calculator URL (HTTPS)
   - Open DevTools → Application → Service Workers
   - Verify service worker installed
   - Check Application → Cache Storage
   - Verify all assets cached

2. **Offline Test**:
   - Enable offline mode (DevTools or airplane mode)
   - Reload page
   - Verify calculator fully functional
   - Test all calculator functions work offline

3. **Install Test (Android)**:
   - Visit on Chrome Android
   - Look for "Add to Home Screen" prompt
   - Tap "Install"
   - Verify icon added to home screen
   - Open from home screen
   - Verify opens in standalone mode (no browser UI)

4. **Install Test (iOS)**:
   - Visit on Safari iOS
   - Tap share button
   - Tap "Add to Home Screen"
   - Verify icon added
   - Open from home screen

5. **Install Test (Desktop)**:
   - Visit on Chrome/Edge desktop
   - Look for install icon in address bar
   - Click install
   - Verify desktop app created

6. **Update Test**:
   - Make change to service worker version
   - Deploy update
   - Visit calculator
   - Verify update notification/prompt

### Automated Tests

**Lighthouse Audit:**
```bash
# CLI
npm install -g lighthouse
lighthouse https://your-calculator-url.com --view

# Or use Chrome DevTools Lighthouse tab
```

**Expected Results:**
- PWA installable: Yes
- Works offline: Yes
- PWA optimized: Yes
- All PWA checks passing

## Showcase (5 min)

**Setup**: Deploy calculator to HTTPS URL, have mobile device ready

**Script**:

1. **Show online calculator**: "Here's our calculator running in the browser."

2. **Install prompt**: On mobile, trigger install prompt → "See the 'Add to Home Screen' banner? Let's install it."

3. **Install**: Tap install → "Now it's on my home screen, just like a native app."

4. **Open installed**: Tap icon → "Opens instantly in its own window—no browser UI!"

5. **Go offline**: Enable airplane mode → "Now watch—I'm completely offline..."

6. **Still works**: Use calculator → "It works perfectly! All functionality available offline."

7. **Lighthouse**: Show Lighthouse score → "95+ PWA score. Meets all Progressive Web App standards."

**Key Message**: "From web page to installed app in seconds. Works anywhere, anytime—internet optional."

## Files to Create

- `manifest.json` - Web app manifest
- `sw.js` - Service worker
- `icons/` - Directory with all icon sizes
  - icon-72x72.png
  - icon-96x96.png
  - icon-128x128.png
  - icon-144x144.png
  - icon-152x152.png
  - icon-192x192.png
  - icon-384x384.png
  - icon-512x512.png
  - apple-touch-icon.png (180×180)

## Files to Modify

- `index.html` - Add manifest link and PWA meta tags
- `app.js` - Add service worker registration

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Manifest.json complete with all fields
- [ ] Service worker implemented and tested
- [ ] All required icons created and optimized
- [ ] Offline functionality verified
- [ ] Install tested on Android, iOS, and desktop
- [ ] Lighthouse PWA audit passing (≥90)
- [ ] Works in standalone mode
- [ ] Update mechanism tested
- [ ] HTTPS deployment verified
- [ ] Manual verification completed
- [ ] Cross-platform testing complete
- [ ] Showcase script executed successfully

## Important Notes

### HTTPS Requirement
**Service workers ONLY work on HTTPS.** For development:
- Use `localhost` (works without HTTPS)
- Or use tools like ngrok for HTTPS tunnel
- Production MUST be HTTPS

### Browser Support
- **Chrome/Edge**: Full PWA support
- **Firefox**: Service worker support, limited install
- **Safari**: Service worker support, add to home screen via share button
- **iOS Safari**: Limited features, no install banner

### Caching Strategies
This prompt uses **cache-first** strategy:
- Fast offline performance
- Requires service worker update for changes

Alternative strategies:
- **Network-first**: Fresh content, slower
- **Stale-while-revalidate**: Balance of both

### Testing Tips
- Use Chrome DevTools "Application" tab
- Test on real devices when possible
- Clear cache between tests
- Monitor console for service worker logs
- Use "Update on reload" during development

## Common Issues & Solutions

**Issue**: Service worker not updating
**Solution**: Increment CACHE_VERSION, clear cache, or use skipWaiting()

**Issue**: Install prompt not showing
**Solution**: Check HTTPS, manifest valid, service worker registered

**Issue**: Icons not displaying
**Solution**: Verify icon paths, sizes match manifest, icons optimized

**Issue**: Works online but not offline
**Solution**: Check all assets in STATIC_ASSETS array, verify caching

## Resources

- [PWA Checklist](https://web.dev/pwa-checklist/)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web App Manifest](https://web.dev/add-manifest/)
- [Workbox](https://developers.google.com/web/tools/workbox) - Advanced service worker library
