const fs = require('fs');
const path = require('path');

describe('code1.js Tests', () => {
    const filePath = path.join(__dirname, '../dev/code1.js');

    it('should verify if code1.js exists', () => {
        const fileExists = fs.existsSync(filePath);
        expect(fileExists).toBe(true);
    });

    it('should verify if code1.js is not empty', () => {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        expect(fileContent.trim().length).toBeGreaterThan(0);
    });

    // Add more specific tests based on the content of code1.js
});

//adicionando um comentário da feature/refactor-old-test-case