import { withAuth } from "next-auth/middleware";

export default withAuth();

export const config = {
  matcher: ["/properties/add", "/profile", "/properties/saved", "/messages"],
};
