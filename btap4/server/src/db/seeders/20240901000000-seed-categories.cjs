'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    // XÓA HẾT trước khi insert để tránh trùng unique slug
    await queryInterface.bulkDelete('Categories', null, {});

    const cats = [
      { name: 'Guitar Acoustic', slug: 'guitar-acoustic', createdAt: now, updatedAt: now },
      { name: 'Guitar Electric', slug: 'guitar-electric', createdAt: now, updatedAt: now },
      { name: 'Piano',          slug: 'piano',           createdAt: now, updatedAt: now },
    ];
    await queryInterface.bulkInsert('Categories', cats, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
