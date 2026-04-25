-- Password reset OTPs should only be handled by backend functions using elevated access
DROP POLICY IF EXISTS "No direct access to password reset OTPs" ON public.password_reset_otps;
CREATE POLICY "No direct access to password reset OTPs"
ON public.password_reset_otps
FOR ALL
TO public
USING (false)
WITH CHECK (false);

-- Restrict blog post management to authenticated admins
DROP POLICY IF EXISTS "Service role can manage blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can manage blog posts" ON public.blog_posts;
CREATE POLICY "Admins can manage blog posts"
ON public.blog_posts
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Tighten public cleaner application submissions
DROP POLICY IF EXISTS "Anyone can submit an application" ON public.cleaner_applications;
CREATE POLICY "Anyone can submit an application"
ON public.cleaner_applications
FOR INSERT
TO public
WITH CHECK (
  btrim(name) <> '' AND
  btrim(email) <> '' AND
  years_experience >= 0 AND
  status = 'pending'
);