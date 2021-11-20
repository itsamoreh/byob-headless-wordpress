## Next.js Headless WordPress

Headless WordPress, using Decoupled Architecture with Next.js.

## Setup

First, clone or fork the repo and `cd` into it.

```bash
git clone https://github.com/itsamoreh/nextjs-headless-wordpress.git
cd nextjs-headless-wordpress
```

- Install Docker from [docs.docker.com/get-docker](https://docs.docker.com/get-docker/).

Set up the project with: `./nextwp configure`.

You'll be asked a few questions.

```bash
Would you like to use this project's WordPress backend setup? [y/n]:
```

**Answer**

`y`: If you would like to use this project's WordPress backend setup using Docker.

`n`: If you want to use your own WordPress setup.

```bash
✍️  What is your WordPress URL? (defaults to http://localhost:8080): 
```

This URL will be used to access WordPress.

```bash
✍️  What is your Next.js frontend URL? (defaults to http://localhost:3000):
```

This URL will be used to access the Next.js frontend.

```bash
✍️  What is your Disqus comments shortname? (leave blank if you are not using): 
```

Leave this blank if you are not going to use the Disqus comments, else enter your Disqus comments shortname.

This is going to:

- Create the `.env` file in the frontend directory.
- Setup the WordPress backend with all plugins via composer (if you chose to use this project's WordPress backend setup).
- Install npm packages for Next.js frontend and start the development server.

**WordPress backend** will be available at [http://localhost:8080](http://localhost:8080) by default.
**Next.js frontend** will be available on at [http://localhost:3000](http://localhost:3000) by default.

### After Setup

- Make sure to activate all plugins that were installed via composer by going to "WordPress Admin Panel > Plugins".
- Update the block registry by going to "WordPress Admin Panel > GraphQL Gutenberg".
- Update the permalink by going to "WordPress Admin Panel > Settings > Permalinks". Choose "Post name" under "Common Settings" and hit "Save".
- Set a Homepage and Posts page by going to "WordPress Admin Panel > Settings > Reading".
- See "Debugging" Step 1.

### During development

Useful commands (run these from the project root):

```bash
./nextwp configure       # Run the configuration wizard to set up the backend, frontend and create an .env file.
./nextwp start-all       # Create and start the docker environment for WordPress and run the Next.js development server.
./nextwp start-backend   # Create and start the docker environment for WordPress.
./nextwp start-frontend  # Run Next.js development server.
./nextwp stop            # Stop the docker environment for WordPress.
```

## Debugging

If you get a server error on the frontend, check to see that the `.htaccess` file in `backend/wordpress` has the following rules. They may have been overwritten during setup.

```shell script
# BEGIN WordPress
# The directives (lines) between "BEGIN WordPress" and "END WordPress" are
# dynamically generated, and should only be modified via WordPress filters.
# Any changes to the directives between these markers will be overwritten.
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]
RewriteBase /
RewriteRule ^index\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]
</IfModule>

# END WordPress
```

If you're getting another error on the frontend.

- Check if all the required WordPress plugins form `backend/wordpress/composer.json` are Activated by going to "WordPress Admin Panel > Plugins".
- Ensure you have updated the block registry by going to "WordPress Admin Panel > GraphQL Gutenberg".
- Ensure that `.env` file has the correct env variables and values in `frontend/.env`.

If you need to change `php.ini`'s `upload_max_filesize` directive, add the following to the `.htaccess` file in `backend/wordpress`, customizing limits for your needs.

```shell script

# END WordPress

php_value upload_max_filesize 12M
php_value post_max_size 13M
php_value memory_limit 15M
```

## Credits

[Imran Sayed's Next.js Headless WordPress](https://github.com/imranhsayed/nextjs-headless-wordpress)

[Colby Fayock's Next.js WordPress Starter](https://github.com/colbyfayock/next-wordpress-starter)

[WebDevStudios' Next.js WordPress Starter](https://github.com/WebDevStudios/nextjs-wordpress-starter)
