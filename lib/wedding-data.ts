export type WeddingEvent = {
  title: string;
  date: string;
  time: string;
  locationName: string;
  address: string;
  mapUrl: string;
  description: string;
};

export type TimelineItem = {
  date: string;
  title: string;
  description: string;
};

export type AlbumImage = {
  id: string;
  src: string;
  title: string;
  description: string;
};

export const weddingConfig = {
  groomName: 'Hoàng Nam',
  brideName: 'Minh Anh',
  fullTitle: 'Minh Anh & Hoàng Nam',
  weddingDate: '2026-12-20T18:00:00+07:00',
  displayDate: '20.12.2026',
  quote: 'Tình yêu không phải là nhìn nhau, mà là cùng nhìn về một hướng.',
  coverImage: '/images/cover.svg',
  heroImage: '/images/hero.svg',
  brideImage: '/images/bride.svg',
  groomImage: '/images/groom.svg',
  musicUrl: '/music/wedding-demo.wav',
};

export const couple = {
  bride: {
    name: 'Nguyễn Minh Anh',
    role: 'Cô dâu',
    description: 'Dịu dàng, yêu hoa và luôn tin rằng những điều đẹp nhất bắt đầu từ sự chân thành.',
    image: weddingConfig.brideImage,
  },
  groom: {
    name: 'Trần Hoàng Nam',
    role: 'Chú rể',
    description: 'Điềm tĩnh, ấm áp và luôn muốn cùng người mình thương xây dựng một mái nhà bình yên.',
    image: weddingConfig.groomImage,
  },
};

export const events: WeddingEvent[] = [
  {
    title: 'Lễ Gia Tiên',
    date: '20.12.2026',
    time: '09:00',
    locationName: 'Tư gia nhà gái',
    address: '12 Nguyễn Văn Hưởng, Thảo Điền, TP. Hồ Chí Minh',
    mapUrl: 'https://maps.google.com/?q=Thao+Dien+Ho+Chi+Minh',
    description: 'Buổi lễ thân mật cùng gia đình hai bên.',
  },
  {
    title: 'Tiệc Cưới',
    date: '20.12.2026',
    time: '18:00',
    locationName: 'The Garden Wedding Hall',
    address: '88 Đồng Khởi, Quận 1, TP. Hồ Chí Minh',
    mapUrl: 'https://maps.google.com/?q=Dong+Khoi+District+1+Ho+Chi+Minh',
    description: 'Rất mong được đón tiếp bạn trong ngày vui của chúng mình.',
  },
  {
    title: 'After Party',
    date: '20.12.2026',
    time: '21:00',
    locationName: 'Rooftop Lounge',
    address: 'Quận 1, TP. Hồ Chí Minh',
    mapUrl: 'https://maps.google.com/?q=District+1+Ho+Chi+Minh',
    description: 'Một buổi tối nhẹ nhàng cùng âm nhạc, bánh ngọt và những người thân yêu.',
  },
];

export const timeline: TimelineItem[] = [
  {
    date: '03.06.2020',
    title: 'Lần đầu gặp nhau',
    description: 'Một buổi chiều mưa nhẹ, chúng mình gặp nhau tại quán cà phê nhỏ quen thuộc.',
  },
  {
    date: '12.12.2021',
    title: 'Chính thức bên nhau',
    description: 'Từ những cuộc trò chuyện dài, chúng mình chọn cùng nhau đi qua nhiều mùa trong đời.',
  },
  {
    date: '14.02.2025',
    title: 'Lời cầu hôn',
    description: 'Một lời hứa giản dị nhưng đủ khiến hành trình phía trước trở nên thật đáng mong chờ.',
  },
  {
    date: '20.12.2026',
    title: 'Ngày chung đôi',
    description: 'Ngày chúng mình viết tiếp câu chuyện bằng một gia đình nhỏ.',
  },
];

export const albumImages: AlbumImage[] = [
  { id: '1', src: '/images/album-1.svg', title: 'Nắng sớm', description: 'Khoảnh khắc nhẹ nhàng trong buổi chụp đầu tiên.' },
  { id: '2', src: '/images/album-2.svg', title: 'Bên nhau', description: 'Một ngày thật bình yên, chỉ có hai chúng mình.' },
  { id: '3', src: '/images/album-3.svg', title: 'Lời hẹn', description: 'Cùng giữ một lời hẹn cho những năm tháng sau này.' },
  { id: '4', src: '/images/album-4.svg', title: 'Dưới vòm hoa', description: 'Nơi mọi điều dịu dàng được lưu lại.' },
  { id: '5', src: '/images/album-5.svg', title: 'Chiều vàng', description: 'Ánh hoàng hôn làm câu chuyện trở nên ấm áp hơn.' },
  { id: '6', src: '/images/album-6.svg', title: 'Ngày vui', description: 'Cảm ơn vì đã cùng chúng mình đi tới hôm nay.' },
];

export const bankQrList = [
  {
    ownerName: 'Nguyễn Minh Anh',
    bankName: 'Vietcombank',
    accountNumber: '0123456789',
    qrImage: '/images/qr-bride.svg',
    note: 'Mung cuoi Minh Anh Hoang Nam',
  },
  {
    ownerName: 'Trần Hoàng Nam',
    bankName: 'Techcombank',
    accountNumber: '9876543210',
    qrImage: '/images/qr-groom.svg',
    note: 'Mung cuoi Minh Anh Hoang Nam',
  },
];

export const initialComments = [
  {
    name: 'Gia đình cô Lan',
    message: 'Chúc hai con trăm năm hạnh phúc, luôn yêu thương và đồng hành cùng nhau.',
    time: '2 giờ trước',
  },
  {
    name: 'Tuấn Anh',
    message: 'Chúc mừng Nam và Anh! Hẹn gặp hai bạn trong ngày vui nhé.',
    time: '5 giờ trước',
  },
  {
    name: 'Nhóm bạn đại học',
    message: 'Mong hai bạn luôn giữ được nụ cười như hôm nay. Happy wedding!',
    time: 'Hôm qua',
  },
];
