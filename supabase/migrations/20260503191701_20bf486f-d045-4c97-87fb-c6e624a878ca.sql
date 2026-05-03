-- Roles
CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Admins manage roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users see own roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Bookings
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  car_make_model TEXT NOT NULL,
  service TEXT NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (booking_date, booking_time)
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Public can insert bookings (only with pending status enforced via trigger)
CREATE POLICY "Anyone can create bookings" ON public.bookings
  FOR INSERT TO anon, authenticated
  WITH CHECK (status = 'pending');

-- Only admins can read full bookings
CREATE POLICY "Admins read bookings" ON public.bookings
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update bookings" ON public.bookings
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete bookings" ON public.bookings
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Blocked slots (admin blocks specific date+time)
CREATE TABLE public.blocked_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blocked_date DATE NOT NULL,
  blocked_time TIME NOT NULL,
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (blocked_date, blocked_time)
);

ALTER TABLE public.blocked_slots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read blocked slots" ON public.blocked_slots
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Admins manage blocked slots" ON public.blocked_slots
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Public view: only date+time of taken slots (no PII)
CREATE OR REPLACE VIEW public.taken_slots
WITH (security_invoker = true) AS
  SELECT booking_date AS slot_date, booking_time AS slot_time
  FROM public.bookings
  WHERE status IN ('pending', 'confirmed')
  UNION
  SELECT blocked_date AS slot_date, blocked_time AS slot_time
  FROM public.blocked_slots;

-- Allow public read of bookings limited to date+time only via a SECURITY DEFINER function
CREATE OR REPLACE FUNCTION public.get_taken_slots(_from DATE, _to DATE)
RETURNS TABLE(slot_date DATE, slot_time TIME)
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT booking_date, booking_time FROM public.bookings
  WHERE status IN ('pending', 'confirmed')
    AND booking_date BETWEEN _from AND _to
  UNION
  SELECT blocked_date, blocked_time FROM public.blocked_slots
  WHERE blocked_date BETWEEN _from AND _to
$$;

GRANT EXECUTE ON FUNCTION public.get_taken_slots(DATE, DATE) TO anon, authenticated;

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER bookings_set_updated_at
BEFORE UPDATE ON public.bookings
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();