/**
 * Wedding Invitation Config
 * 📝 Chỉnh sửa các thông tin cưới ở đây
 */

export const brideConfig = {
  name: "Hoàng Hà Nhi",
  fullName: "Hà Nhi",
  role: "Cô dâu",
  description:
    "Dịu dàng, yêu hoa và luôn tin rằng những điều đẹp nhất bắt đầu từ sự chân thành.",
  image: "/images/bride.svg",
};

export const groomConfig = {
  name: "Vũ Phương Nam",
  fullName: "Phương Nam",
  role: "Chú rể",
  description:
    "Điềm tĩnh, ấm áp và luôn muốn cùng người mình thương xây dựng một mái nhà bình yên.",
  image: "/images/groom.svg",
};

export const coupleConfig = {
  groomName: groomConfig.fullName,
  brideName: brideConfig.fullName,
  fullTitle: `${brideConfig.fullName} & ${groomConfig.fullName}`,
  quote: "Tình yêu không phải là nhìn nhau, mà là cùng nhìn về một hướng.",
};

export const weddingDateConfig = {
  dateISO: "2026-12-20T18:00:00+07:00", // ISO 8601 format cho timer
  displayDate: "20.12.2026",
  displayDay: "Chủ nhật",
};

export const imagesConfig = {
  cover: "/images/cover.svg",
  hero: "/images/hero.svg",
  bride: brideConfig.image,
  groom: groomConfig.image,
};

export const musicConfig = {
  url: "/music/wedding-demo.mp3",
};

/**
 * Sự kiện cưới
 */
export const eventsConfig = [
  {
    title: "Nhà gái",
    date: "20.12.2026",
    time: "09:00",
    locationName: "Tư gia nhà gái",
    address: "Đầm Rái, Nhuận Trạch, Lương Sơn, Phú Thọ",
    mapUrl: "https://maps.app.goo.gl/2hV7cEBN56ctUtJu5",
    description: "Buổi lễ thân mật cùng gia đình hai bên.",
  },
  {
    title: "Nhà trai",
    date: "20.12.2026",
    time: "09:00",
    locationName: "Tư gia nhà trai",
    address: "Đội 6 Phú Trạch, Mễ Sở, Hưng Yên",
    mapUrl: "https://maps.app.goo.gl/dLyZFtnbFTgYFmPe7",
    description: "Rất mong được đón tiếp bạn trong ngày vui của chúng mình.",
  },
];

/**
 * Dòng thời gian câu chuyện của cặp đôi
 */
export const timelineConfig = [
  {
    date: "03.06.2020",
    title: "Lần đầu gặp nhau",
    description:
      "Một buổi chiều mưa nhẹ, chúng mình gặp nhau tại quán cà phê nhỏ quen thuộc.",
  },
  {
    date: "12.12.2021",
    title: "Chính thức bên nhau",
    description:
      "Từ những cuộc trò chuyện dài, chúng mình chọn cùng nhau đi qua nhiều mùa trong đời.",
  },
  {
    date: "14.02.2025",
    title: "Lời cầu hôn",
    description:
      "Một lời hứa giản dị nhưng đủ khiến hành trình phía trước trở nên thật đáng mong chờ.",
  },
  {
    date: "20.12.2026",
    title: "Ngày trọng đại",
    description: 'Chúng mình nói "Tôi có" và bắt đầu chương mới của cuộc sống.',
  },
];

/**
 * Thông tin liên hệ & Mạng xã hội
 */
export const contactConfig = {
  phone: "0963122101",
  email: "vpnam2k1.com",
  address: "Mễ Sở, Hưng Yên",
  socialLinks: {
    facebook: "#",
    instagram: "#",
    tiktok: "#",
  },
};

/**
 * Cấu hình chung
 */
export const siteConfig = {
  title: `${coupleConfig.fullTitle} - Wedding Invitation`,
  description:
    "Chúng mình rất vui mừng khi mời bạn tham gia trong ngày trọng đại của chúng mình.",
  author: coupleConfig.fullTitle,
};
