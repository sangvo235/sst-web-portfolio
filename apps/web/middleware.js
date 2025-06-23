import { withAuth } from '@kinde-oss/kinde-auth-nextjs/middleware';

export default withAuth({
    publicPaths: ["/"]
});

export const config = {
matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};