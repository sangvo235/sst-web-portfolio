import { withAuth } from '@kinde-oss/kinde-auth-nextjs/middleware';

export default withAuth({
    // add public routes later for portofolio aspect
    publicPaths: ["/"]
});

export const config = {
matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};