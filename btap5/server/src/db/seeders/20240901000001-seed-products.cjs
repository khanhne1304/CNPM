'use strict';

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function pick(arr) {
  return arr[randInt(0, arr.length - 1)];
}
function slugPart() {
  return Math.random().toString(36).slice(2, 8);
}

const ADJ = [
  'Premium', 'Classic', 'Pro', 'Deluxe', 'Studio', 'Vintage', 'Signature',
  'Dynamic', 'Ultimate', 'Grand', 'Compact', 'Elite', 'Modern', 'Fusion',
];
const MATERIAL = ['Mahogany', 'Maple', 'Rosewood', 'Spruce', 'Cedar', 'Basswood', 'Walnut'];
const SERIES = ['A', 'B', 'C', 'D', 'E', 'F', 'S', 'X', 'Z', 'GT', 'LX', 'PRO', 'SE'];
const COLORS = ['Natural', 'Sunburst', 'Black', 'White', 'Cherry', 'Blue', 'Gold', 'Silver'];

function makeRandomName(categoryName) {
  // Ví dụ: "Guitar Acoustic Premium Maple A-42 (Sunburst)"
  const left = [
    categoryName.replace(/\s+/g, ' ').trim(),
    pick(ADJ),
    pick(MATERIAL),
    pick(SERIES) + '-' + randInt(10, 99),
  ].filter(Boolean).join(' ');
  return `${left} (${pick(COLORS)})`;
}

function makeRandomPriceVND() {
  // Giá ngẫu nhiên: 1.200.000đ – 30.000.000đ
  const vnd = randInt(1_200_000, 30_000_000);
  // Làm tròn về bậc nghìn cho đẹp
  return Math.round(vnd / 1000) * 1000;
}

function makeRandomImageSeed() {
  return `prod-${Date.now()}-${slugPart()}-${randInt(1, 1e6)}`;
}

module.exports = {
  async up (queryInterface) {
    // Lấy danh mục hiện có
    const [cats] = await queryInterface.sequelize.query(
      'SELECT id, name FROM Categories ORDER BY id'
    );
    if (!cats || cats.length === 0) return;

    // Tổng sản phẩm muốn tạo (ENV > random 500..1000)
    const TOTAL =
      Number(process.env.PRODUCTS_TOTAL) > 0
        ? Number(process.env.PRODUCTS_TOTAL)
        : randInt(500, 1000);

    // Chia đều theo danh mục (+ chia dư)
    const basePerCat = Math.floor(TOTAL / cats.length);
    let remainder = TOTAL % cats.length;

    const now = new Date();
    const prods = [];

    for (const c of cats) {
      let count = basePerCat + (remainder > 0 ? 1 : 0);
      if (remainder > 0) remainder--;

      for (let i = 0; i < count; i++) {
        const name = makeRandomName(c.name);
        const price = makeRandomPriceVND();
        const imgSeed = makeRandomImageSeed();

        prods.push({
          name,
          price,
          image: `https://picsum.photos/seed/${encodeURIComponent(imgSeed)}/600/400`,
          categoryId: c.id,
          createdAt: now,
          updatedAt: now,
        });
      }
    }

    // Ghi vào DB theo lô
    // (có thể tách chunk nếu bạn muốn giảm áp lực insert)
    await queryInterface.bulkInsert('Products', prods, {});
    console.log(`Seeded ${prods.length} products across ${cats.length} categories.`);
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
