// /c:/Users/Franklin/Documents/personal/to-do-cli/src/utils/passwords.test.js
const bcrypt = require('bcrypt');
const { verifyPassword, createPasswordHash } = require('../../utils/passwords');

describe('verifyPassword', () => {
    const password = 'testpassword';
    const { salt, hash } = createPasswordHash(password);

    it('should return true for correct password', () => {
        const result = verifyPassword(password, hash, salt);
        expect(result).toBe(true);
    });

    it('should return false for incorrect password', () => {
        const result = verifyPassword('wrongpassword', hash, salt);
        expect(result).toBe(false);
    });
});
