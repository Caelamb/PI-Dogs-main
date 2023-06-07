const { DataTypes } = require('sequelize');
const { Temperaments, conn } = require('../../src/db');

describe('Temperaments model', () => {
  beforeAll(() =>
    conn
      .authenticate()
      .catch((err) => {
        console.error('Unable to connect to the database:', err);
      })
  );

  describe('Model definition', () => {
    it('should define the Temperaments model correctly', () => {
      const attributes = Temperaments.rawAttributes;
      expect(attributes.id).toEqual(
        expect.objectContaining({
          type: expect.anything(),
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        })
      );
      expect(attributes.name).toEqual(
        expect.objectContaining({
          type: expect.anything(),
          allowNull: false,
        })
      );
    });
  });
});
