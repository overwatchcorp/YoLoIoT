module.exports = {
    "extends": "airbnb-base",
    "plugins": [
        "import"
    ],
    "rules": {
    	"semi": ["error", "never"],
    	"no-tabs": 0,
    	"indent": 0
    },
    "globals": {
      "describe": true,
      "it": true,
      "jasmine": true,
      "expect": true,
      "beforeAll": true,
      "beforeEach": true,
      "afterAll": true,
      "afterEach": true,
    }
};
