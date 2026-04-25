-- Create quote requests table
CREATE TABLE IF NOT EXISTS public.quote_requests (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL DEFAULT 'FL',
  zip text NOT NULL,
  square_feet text NOT NULL,
  bedrooms text NOT NULL,
  bathrooms text NOT NULL,
  frequency text NOT NULL,
  current_clean_level text NOT NULL,
  consent_email boolean NOT NULL DEFAULT false,
  consent_sms boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'new',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can manage quote requests" ON public.quote_requests;
DROP POLICY IF EXISTS "Anyone can submit quote requests" ON public.quote_requests;
CREATE POLICY "Admins can manage quote requests"
ON public.quote_requests
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Anyone can submit quote requests"
ON public.quote_requests
FOR INSERT
TO public
WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_quote_requests_created_at ON public.quote_requests (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quote_requests_status ON public.quote_requests (status);
DROP TRIGGER IF EXISTS update_quote_requests_updated_at ON public.quote_requests;
CREATE TRIGGER update_quote_requests_updated_at
BEFORE UPDATE ON public.quote_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create commercial requests table
CREATE TABLE IF NOT EXISTS public.commercial_requests (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name text NOT NULL,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  property_type text NOT NULL,
  square_feet text,
  frequency text,
  address text,
  city text,
  state text DEFAULT 'FL',
  zip text,
  message text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.commercial_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can manage commercial requests" ON public.commercial_requests;
DROP POLICY IF EXISTS "Anyone can submit commercial requests" ON public.commercial_requests;
CREATE POLICY "Admins can manage commercial requests"
ON public.commercial_requests
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Anyone can submit commercial requests"
ON public.commercial_requests
FOR INSERT
TO public
WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_commercial_requests_created_at ON public.commercial_requests (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_commercial_requests_status ON public.commercial_requests (status);
DROP TRIGGER IF EXISTS update_commercial_requests_updated_at ON public.commercial_requests;
CREATE TRIGGER update_commercial_requests_updated_at
BEFORE UPDATE ON public.commercial_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create service pricing table
CREATE TABLE IF NOT EXISTS public.service_pricing (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_type text NOT NULL,
  tier_index integer NOT NULL DEFAULT 0,
  max_sqft integer NOT NULL,
  label text NOT NULL,
  base_price numeric NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (service_type, tier_index)
);

ALTER TABLE public.service_pricing ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view active service pricing" ON public.service_pricing;
DROP POLICY IF EXISTS "Admins can manage service pricing" ON public.service_pricing;
CREATE POLICY "Anyone can view active service pricing"
ON public.service_pricing
FOR SELECT
TO public
USING (is_active = true);
CREATE POLICY "Admins can manage service pricing"
ON public.service_pricing
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX IF NOT EXISTS idx_service_pricing_lookup ON public.service_pricing (service_type, tier_index);
DROP TRIGGER IF EXISTS update_service_pricing_updated_at ON public.service_pricing;
CREATE TRIGGER update_service_pricing_updated_at
BEFORE UPDATE ON public.service_pricing
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.service_pricing (service_type, tier_index, max_sqft, label, base_price, is_active)
VALUES
  ('standard', 0, 750, 'Up to 750 sf', 115, true),
  ('standard', 1, 1000, '751–1,000 sf', 135, true),
  ('standard', 2, 1500, '1,001–1,500 sf', 165, true),
  ('standard', 3, 2000, '1,501–2,000 sf', 205, true),
  ('standard', 4, 2500, '2,001–2,500 sf', 245, true),
  ('standard', 5, 3000, '2,501–3,000 sf', 285, true),
  ('deep', 0, 750, 'Up to 750 sf', 185, true),
  ('deep', 1, 1000, '751–1,000 sf', 220, true),
  ('deep', 2, 1500, '1,001–1,500 sf', 275, true),
  ('deep', 3, 2000, '1,501–2,000 sf', 345, true),
  ('deep', 4, 2500, '2,001–2,500 sf', 415, true),
  ('deep', 5, 3000, '2,501–3,000 sf', 485, true),
  ('moveinout', 0, 750, 'Up to 750 sf', 205, true),
  ('moveinout', 1, 1000, '751–1,000 sf', 245, true),
  ('moveinout', 2, 1500, '1,001–1,500 sf', 315, true),
  ('moveinout', 3, 2000, '1,501–2,000 sf', 395, true),
  ('moveinout', 4, 2500, '2,001–2,500 sf', 475, true),
  ('moveinout', 5, 3000, '2,501–3,000 sf', 555, true),
  ('construction', 0, 750, 'Up to 750 sf', 240, true),
  ('construction', 1, 1000, '751–1,000 sf', 290, true),
  ('construction', 2, 1500, '1,001–1,500 sf', 380, true),
  ('construction', 3, 2000, '1,501–2,000 sf', 470, true),
  ('construction', 4, 2500, '2,001–2,500 sf', 560, true),
  ('construction', 5, 3000, '2,501–3,000 sf', 650, true),
  ('airbnb', 0, 750, 'Up to 750 sf', 105, true),
  ('airbnb', 1, 1000, '751–1,000 sf', 125, true),
  ('airbnb', 2, 1500, '1,001–1,500 sf', 155, true),
  ('airbnb', 3, 2000, '1,501–2,000 sf', 195, true),
  ('airbnb', 4, 2500, '2,001–2,500 sf', 235, true),
  ('airbnb', 5, 3000, '2,501–3,000 sf', 275, true)
ON CONFLICT (service_type, tier_index) DO NOTHING;

-- Create service areas table
CREATE TABLE IF NOT EXISTS public.service_areas (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  state text NOT NULL DEFAULT 'FL',
  travel_fee numeric NOT NULL DEFAULT 0,
  tier text NOT NULL DEFAULT 'standard',
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.service_areas ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view active service areas" ON public.service_areas;
DROP POLICY IF EXISTS "Admins can manage service areas" ON public.service_areas;
CREATE POLICY "Anyone can view active service areas"
ON public.service_areas
FOR SELECT
TO public
USING (is_active = true);
CREATE POLICY "Admins can manage service areas"
ON public.service_areas
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX IF NOT EXISTS idx_service_areas_sort ON public.service_areas (sort_order);
DROP TRIGGER IF EXISTS update_service_areas_updated_at ON public.service_areas;
CREATE TRIGGER update_service_areas_updated_at
BEFORE UPDATE ON public.service_areas
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.service_areas (slug, name, state, travel_fee, tier, is_active, sort_order)
VALUES
  ('jacksonville-cleaning', 'Jacksonville', 'FL', 0, 'primary', true, 1),
  ('jacksonville-beach-cleaning', 'Jacksonville Beach', 'FL', 0, 'standard', true, 2),
  ('ponte-vedra-beach-cleaning', 'Ponte Vedra Beach', 'FL', 0, 'standard', true, 3),
  ('mandarin-cleaning', 'Mandarin', 'FL', 0, 'standard', true, 4),
  ('riverside-avondale-cleaning', 'Riverside / Avondale', 'FL', 0, 'standard', true, 5),
  ('atlantic-beach-cleaning', 'Atlantic Beach', 'FL', 0, 'standard', true, 6),
  ('neptune-beach-cleaning', 'Neptune Beach', 'FL', 0, 'standard', true, 7),
  ('orange-park-cleaning', 'Orange Park', 'FL', 0, 'standard', true, 8),
  ('fleming-island-cleaning', 'Fleming Island', 'FL', 0, 'standard', true, 9),
  ('san-marco-cleaning', 'San Marco', 'FL', 0, 'standard', true, 10),
  ('arlington-cleaning', 'Arlington', 'FL', 0, 'standard', true, 11),
  ('southside-cleaning', 'Southside', 'FL', 0, 'standard', true, 12),
  ('yulee-cleaning', 'Yulee', 'FL', 0, 'standard', true, 13),
  ('fernandina-beach-cleaning', 'Fernandina Beach', 'FL', 0, 'standard', true, 14)
ON CONFLICT (slug) DO NOTHING;

-- Create reviews table
CREATE TABLE IF NOT EXISTS public.reviews (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name text NOT NULL,
  location text,
  rating integer NOT NULL DEFAULT 5,
  review_text text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view approved reviews" ON public.reviews;
DROP POLICY IF EXISTS "Anyone can submit reviews" ON public.reviews;
DROP POLICY IF EXISTS "Admins can manage reviews" ON public.reviews;
CREATE POLICY "Anyone can view approved reviews"
ON public.reviews
FOR SELECT
TO public
USING (status = 'approved');
CREATE POLICY "Anyone can submit reviews"
ON public.reviews
FOR INSERT
TO public
WITH CHECK (true);
CREATE POLICY "Admins can manage reviews"
ON public.reviews
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON public.reviews (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_status ON public.reviews (status);
DROP TRIGGER IF EXISTS update_reviews_updated_at ON public.reviews;
CREATE TRIGGER update_reviews_updated_at
BEFORE UPDATE ON public.reviews
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create site content table
CREATE TABLE IF NOT EXISTS public.site_content (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key text NOT NULL UNIQUE,
  value text NOT NULL DEFAULT '',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view site content" ON public.site_content;
DROP POLICY IF EXISTS "Admins can manage site content" ON public.site_content;
CREATE POLICY "Anyone can view site content"
ON public.site_content
FOR SELECT
TO public
USING (true);
CREATE POLICY "Admins can manage site content"
ON public.site_content
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

DROP TRIGGER IF EXISTS update_site_content_updated_at ON public.site_content;
CREATE TRIGGER update_site_content_updated_at
BEFORE UPDATE ON public.site_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.site_content (key, value)
VALUES
  ('instagram_handle', '@pointpolishcleaners'),
  ('instagram_url', 'https://www.instagram.com/pointpolishcleaners/'),
  ('tiktok_handle', '@pointpolishcleaners'),
  ('tiktok_url', 'https://www.tiktok.com/@pointpolishcleaners')
ON CONFLICT (key) DO NOTHING;

-- Create work cards table
CREATE TABLE IF NOT EXISTS public.work_cards (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  platform text NOT NULL DEFAULT 'instagram',
  image_url text NOT NULL,
  caption text NOT NULL DEFAULT '',
  post_url text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.work_cards ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view work cards" ON public.work_cards;
DROP POLICY IF EXISTS "Admins can manage work cards" ON public.work_cards;
CREATE POLICY "Anyone can view work cards"
ON public.work_cards
FOR SELECT
TO public
USING (true);
CREATE POLICY "Admins can manage work cards"
ON public.work_cards
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX IF NOT EXISTS idx_work_cards_sort ON public.work_cards (sort_order);
DROP TRIGGER IF EXISTS update_work_cards_updated_at ON public.work_cards;
CREATE TRIGGER update_work_cards_updated_at
BEFORE UPDATE ON public.work_cards
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create chatbot conversations table
CREATE TABLE IF NOT EXISTS public.chatbot_conversations (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  flow_type text NOT NULL DEFAULT 'residential',
  customer_name text,
  customer_email text,
  customer_phone text,
  estimate_amount numeric,
  converted_to_booking boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'new',
  answers jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.chatbot_conversations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can manage chatbot conversations" ON public.chatbot_conversations;
DROP POLICY IF EXISTS "Anyone can create chatbot conversations" ON public.chatbot_conversations;
CREATE POLICY "Admins can manage chatbot conversations"
ON public.chatbot_conversations
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Anyone can create chatbot conversations"
ON public.chatbot_conversations
FOR INSERT
TO public
WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_chatbot_conversations_created_at ON public.chatbot_conversations (created_at DESC);
DROP TRIGGER IF EXISTS update_chatbot_conversations_updated_at ON public.chatbot_conversations;
CREATE TRIGGER update_chatbot_conversations_updated_at
BEFORE UPDATE ON public.chatbot_conversations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create abandoned leads table
CREATE TABLE IF NOT EXISTS public.abandoned_leads (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  flow_type text NOT NULL DEFAULT 'residential',
  customer_name text,
  customer_email text NOT NULL,
  customer_phone text,
  estimate_amount numeric,
  followup_sent boolean NOT NULL DEFAULT false,
  followup_sent_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.abandoned_leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can manage abandoned leads" ON public.abandoned_leads;
DROP POLICY IF EXISTS "Anyone can create abandoned leads" ON public.abandoned_leads;
CREATE POLICY "Admins can manage abandoned leads"
ON public.abandoned_leads
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Anyone can create abandoned leads"
ON public.abandoned_leads
FOR INSERT
TO public
WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_abandoned_leads_created_at ON public.abandoned_leads (created_at DESC);
DROP TRIGGER IF EXISTS update_abandoned_leads_updated_at ON public.abandoned_leads;
CREATE TRIGGER update_abandoned_leads_updated_at
BEFORE UPDATE ON public.abandoned_leads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create booking blocked dates table
CREATE TABLE IF NOT EXISTS public.booking_blocked_dates (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  blocked_date date NOT NULL UNIQUE,
  reason text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.booking_blocked_dates ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view blocked dates" ON public.booking_blocked_dates;
DROP POLICY IF EXISTS "Admins can manage blocked dates" ON public.booking_blocked_dates;
CREATE POLICY "Anyone can view blocked dates"
ON public.booking_blocked_dates
FOR SELECT
TO public
USING (true);
CREATE POLICY "Admins can manage blocked dates"
ON public.booking_blocked_dates
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX IF NOT EXISTS idx_booking_blocked_dates_date ON public.booking_blocked_dates (blocked_date);
DROP TRIGGER IF EXISTS update_booking_blocked_dates_updated_at ON public.booking_blocked_dates;
CREATE TRIGGER update_booking_blocked_dates_updated_at
BEFORE UPDATE ON public.booking_blocked_dates
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();