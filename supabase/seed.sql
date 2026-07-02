insert into public.wedding_sites (id, slug, bride_name, groom_name, wedding_date, is_active)
values (
  '11111111-1111-4111-8111-111111111111',
  'ha-nhi-phuong-nam',
  'Hà Nhi',
  'Phương Nam',
  '2026-12-20T18:00:00+07:00',
  true
)
on conflict (slug) do update set
  bride_name = excluded.bride_name,
  groom_name = excluded.groom_name,
  wedding_date = excluded.wedding_date,
  is_active = excluded.is_active;

insert into public.album_images (site_id, title, description, image_url, storage_path, sort_order, is_visible)
values
  ('11111111-1111-4111-8111-111111111111', 'Nắng sớm', 'Khoảnh khắc nhẹ nhàng trong buổi chụp đầu tiên.', '/images/album-1.svg', null, 1, true),
  ('11111111-1111-4111-8111-111111111111', 'Bên nhau', 'Một ngày thật bình yên, chỉ có hai chúng mình.', '/images/album-2.svg', null, 2, true),
  ('11111111-1111-4111-8111-111111111111', 'Lời hẹn', 'Cùng giữ một lời hẹn cho những năm tháng sau này.', '/images/album-3.svg', null, 3, true),
  ('11111111-1111-4111-8111-111111111111', 'Dưới vòm hoa', 'Nơi mọi điều dịu dàng được lưu lại.', '/images/album-4.svg', null, 4, true),
  ('11111111-1111-4111-8111-111111111111', 'Chiều vàng', 'Ánh hoàng hôn làm câu chuyện trở nên ấm áp hơn.', '/images/album-5.svg', null, 5, true),
  ('11111111-1111-4111-8111-111111111111', 'Ngày vui', 'Cảm ơn vì đã cùng chúng mình đi tới hôm nay.', '/images/album-6.svg', null, 6, true);

insert into public.guest_comments (site_id, name, message, attendance_status, guest_count, is_visible, created_at)
values
  ('11111111-1111-4111-8111-111111111111', 'Gia đình cô Lan', 'Chúc hai con trăm năm hạnh phúc, luôn yêu thương và đồng hành cùng nhau.', 'attending', 2, true, now() - interval '2 hours'),
  ('11111111-1111-4111-8111-111111111111', 'Tuấn Anh', 'Chúc mừng Nam và Nhi! Hẹn gặp hai bạn trong ngày vui nhé.', 'attending', 1, true, now() - interval '5 hours'),
  ('11111111-1111-4111-8111-111111111111', 'Nhóm bạn đại học', 'Mong hai bạn luôn giữ được nụ cười như hôm nay. Happy wedding!', 'maybe', 4, true, now() - interval '1 day'),
  ('11111111-1111-4111-8111-111111111111', 'Minh Trang', 'Chúc hai bạn một hành trình mới đầy yêu thương và bình an.', 'attending', 1, true, now() - interval '2 days'),
  ('11111111-1111-4111-8111-111111111111', 'Anh Đức', 'Thật vui khi được chứng kiến ngày đặc biệt này. Chúc mừng hai bạn!', 'not_attending', 1, true, now() - interval '3 days');
