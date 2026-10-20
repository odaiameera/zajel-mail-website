# Zajel Mail website

The product site for [Zajel Mail](https://github.com/odaiameera/zajel-mail) (formerly ameera.), a self-hosted webmail client for mail, calendar and contacts, built on JMAP and CalDAV.

It's a static site served by **GitHub Pages**: plain HTML, CSS and a little JavaScript, with no build step and no dependencies.

## What's here

| Path | What it is |
| --- | --- |
| `index.html` | The whole site: hero, a tour of each app, security, install and open source. |
| `assets/site.css` | Styles, with light and dark themes that follow the visitor's system until they pick one. |
| `assets/site.js` | Theme toggle, mobile menu, screenshot tabs, install tabs, copy buttons and the screenshot lightbox. |
| `assets/screenshots/` | Screenshots of the real app, taken against a mock mail server with fictional people and data. They're the same images as the app's README. |
| `404.html` | Shown by GitHub Pages for any missing page. |
| `.nojekyll` | Tells GitHub Pages to serve the files as they are, without Jekyll. |

Icons are inlined from [Lucide](https://lucide.dev), the same set the app uses.

## Run it locally

Any static file server works. From this folder:

```sh
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Publishing

GitHub Pages serves the `main` branch from the repository root (**Settings → Pages → Deploy from a branch → `main` / `/ (root)`**). Every push to `main` is live within a minute or two.

If the site moves to a custom domain:
1. Add a `CNAME` file with the domain.
2. Update the `og:image` URL in `index.html`.
3. Update the `/zajel-mail-website/` links in `404.html`.

## Updating screenshots

The screenshots come from the app repository's `docs/screenshots/`. When they change there, copy the new files into `assets/screenshots/` with the same names.

## License

[MIT](LICENSE)
