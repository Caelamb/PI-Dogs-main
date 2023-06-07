const { DataTypes } = require('sequelize');
const { Dogs, conn } = require('../../src/db');

describe('Dog model', () => {
  beforeAll(() =>
    conn
      .authenticate()
      .catch((err) => {
        console.error('Unable to connect to the database:', err);
      })
  );

  describe('Validators', () => {
    beforeEach(() => Dogs.sync({ force: true }));

    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Dogs.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });

      it('should work when name is provided', async () => {
        const dog = await Dogs.create({
          name: 'Valid Dog Name',
          image: 'image.jpg',
          height: 'Tall',
          weight: 'Heavy',
          life_span: 'Long',
        });
        expect(dog.name).toBe('Valid Dog Name');
      });
    });
  });

  describe('Model definition', () => {
    it('should define the Dog model correctly', () => {
      const attributes = Dogs.rawAttributes;
      expect(attributes.id).toEqual(
        expect.objectContaining({
          type: expect.anything(),
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        })
      );
      expect(attributes.image).toEqual(
        expect.objectContaining({
          type: expect.anything(),
          allowNull: false,
        })
      );
      expect(attributes.name).toEqual(
        expect.objectContaining({
          type: expect.anything(),
          allowNull: false,
        })
      );
      expect(attributes.height).toEqual(
        expect.objectContaining({
          type: expect.anything(),
          allowNull: false,
        })
      );
      expect(attributes.weight).toEqual(
        expect.objectContaining({
          type: expect.anything(),
          allowNull: false,
        })
      );
      expect(attributes.life_span).toEqual(
        expect.objectContaining({
          type: expect.anything(),
          allowNull: false,
        })
      );
    });
  });
});  
