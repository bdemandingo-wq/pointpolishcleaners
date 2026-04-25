-- Tighten quote request public submission policy
DROP POLICY IF EXISTS "Anyone can submit quote requests" ON public.quote_requests;
CREATE POLICY "Anyone can submit quote requests"
ON public.quote_requests
FOR INSERT
TO public
WITH CHECK (
  btrim(first_name) <> '' AND
  btrim(last_name) <> '' AND
  btrim(email) <> '' AND
  btrim(phone) <> '' AND
  btrim(address) <> '' AND
  btrim(city) <> '' AND
  btrim(state) <> '' AND
  btrim(zip) <> '' AND
  btrim(square_feet) <> '' AND
  btrim(bedrooms) <> '' AND
  btrim(bathrooms) <> '' AND
  btrim(frequency) <> '' AND
  btrim(current_clean_level) <> '' AND
  status = 'new'
);

-- Tighten commercial request public submission policy
DROP POLICY IF EXISTS "Anyone can submit commercial requests" ON public.commercial_requests;
CREATE POLICY "Anyone can submit commercial requests"
ON public.commercial_requests
FOR INSERT
TO public
WITH CHECK (
  btrim(company_name) <> '' AND
  btrim(contact_name) <> '' AND
  btrim(email) <> '' AND
  btrim(phone) <> '' AND
  btrim(property_type) <> '' AND
  status = 'new'
);

-- Tighten review public submission policy
DROP POLICY IF EXISTS "Anyone can submit reviews" ON public.reviews;
CREATE POLICY "Anyone can submit reviews"
ON public.reviews
FOR INSERT
TO public
WITH CHECK (
  btrim(customer_name) <> '' AND
  btrim(review_text) <> '' AND
  rating BETWEEN 1 AND 5 AND
  status = 'pending'
);

-- Tighten chatbot public submission policy
DROP POLICY IF EXISTS "Anyone can create chatbot conversations" ON public.chatbot_conversations;
CREATE POLICY "Anyone can create chatbot conversations"
ON public.chatbot_conversations
FOR INSERT
TO public
WITH CHECK (
  flow_type IN ('residential', 'commercial') AND
  status = 'new'
);

-- Tighten abandoned lead public submission policy
DROP POLICY IF EXISTS "Anyone can create abandoned leads" ON public.abandoned_leads;
CREATE POLICY "Anyone can create abandoned leads"
ON public.abandoned_leads
FOR INSERT
TO public
WITH CHECK (
  btrim(customer_email) <> '' AND
  flow_type IN ('residential', 'commercial') AND
  followup_sent = false
);