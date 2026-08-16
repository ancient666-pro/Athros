-- Atomically activate a captured booking. Gateway verification happens in the
-- application; this row lock prevents concurrent webhook deliveries creating
-- more than one project.
create or replace function public.activate_captured_booking(p_booking_id uuid, p_payment_id text)
returns uuid language plpgsql security definer set search_path = public as $$
declare b public.project_bookings%rowtype; v_project_id uuid;
begin
  select * into b from public.project_bookings where id = p_booking_id for update;
  if not found then raise exception 'booking not found'; end if;
  if b.status = 'TOKEN_PAID' and b.project_id is not null then return b.project_id; end if;
  if b.status in ('CANCELLED', 'EXPIRED', 'REJECTED', 'PAYMENT_REVIEW_REQUIRED') then raise exception 'booking cannot be activated'; end if;
  insert into public.projects (client_id, name, summary, package, region, currency, status, progress)
  values (b.user_id, 'Athros project ' || b.booking_number, b.project_summary, b.package, b.region, b.currency, 'discovery', 0)
  returning id into v_project_id;
  update public.project_bookings set status = 'TOKEN_PAID', payment_status = 'captured', razorpay_payment_id = p_payment_id, project_id = v_project_id, paid_at = now() where id = b.id;
  insert into public.project_status_history (project_id, from_status, to_status, note, metadata)
  values (v_project_id, null, 'discovery', 'Activated after verified Razorpay token payment', jsonb_build_object('booking_id', b.id));
  return v_project_id;
end;
$$;
revoke all on function public.activate_captured_booking(uuid, text) from public, anon, authenticated;
grant execute on function public.activate_captured_booking(uuid, text) to service_role;
