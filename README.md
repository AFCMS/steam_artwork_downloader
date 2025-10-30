# Steam Artwork Downloader

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FAFCMS%2Fsteam_artwork_downloader)

This project allows you to download Steam artwork images from the Steam CDN for any Steam game.

> [!NOTE]
> Images are often "outdated" since Steam static CDN URLs (that can be guessed with the game ID) tend to lag behind what can be seen in the client and obtained via API.
>
> If you have more frequent usage or download from games that tend to update artworks often,
> I would advise you to look at my [SteamFetch](https://github.com/AFCMS/SteamFetch) CLI tool which is based on [SteamKit2](https://github.com/SteamRE/SteamKit)
> and provide very good scripting capabilities as well as allowing you to fetch regional artworks

Built with:

-   [Vite](https://vitejs.dev)
-   [React](https://react.dev)
-   [Tailwind CSS](https://tailwindcss.com)
-   [Vercel](https://vercel.com)
-   [Vercel Analytics](https://github.com/vercel/analytics)

## Usage

```shell
pnpm install
```

```shell
pnpm run dev
```
