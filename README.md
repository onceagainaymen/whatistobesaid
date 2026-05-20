### How to run:
On a linux terminal run `make`
### Makefile rules:
- `make build` to build the project.
- `make down` to shutdown containers.
- `make restart` to restart the project container.
### Milestone:
As of 13/05/2026 the project consists of an infrastructure that powers a frontend website build in Nextjs.
The website has 2 pages.
**Page 1** is the home page, it either shows a hero page asking the user to sign up, or an index page consisting of posts. To open the latter you may set the `index` argument to `true` in the URL.
**Page 2** is the `auth` page that can either shows the SignUp page or the SignIn page. The user can switch between them.

As of 20/05/2026 the website now has a shows a post page, has a profile page that shows a user profile panel and lists some posts.
Buttons have been redesigned as well.
