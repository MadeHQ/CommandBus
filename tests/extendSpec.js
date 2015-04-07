define([
  'chai',
  'extend'
], function (chai, extend) {
  var expect = chai.expect;

  describe('#extend', function () {
    it('should exist on the global scope', function () {
      expect(typeof extend).to.not.equal('undefined');
    });

    it('should continue if no argument is passed', function () {
      var options = extend({
        test: true
      });
      expect(options.test).to.equal(true);
    });

    it('should override an option with a new parameter', function () {
      var options = extend({
        test: true
      }, {
        test: false
      });

      expect(options.test).to.equal(false);
    });

    it('should replace array defaults and return arrays', function () {
      var options = extend({
        test: true
      }, [{
        clientOne: {
          test: false
        }
      }, {
        clientTwo: {
          test: false
        }
      }]);

      expect(options).to.be.an('array');
    });

    it('should replace all options in arrays', function () {
      var options = extend({
        test: true
      }, [{
        clientOne: {
          test: false
        }
      }, {
        clientTwo: {
          test: false,
          call: 'GetCart'
        }
      }]);

      expect(options).to.have.deep.property('[1].clientTwo.test').that.equals(false);
    });

    it('should add options that do not exist when evaluating arrays', function () {
      var options = extend({
        test: true
      }, [{
        clientOne: {}
      }, {
        clientTwo: {
          test: false,
          call: 'GetCart'
        }
      }]);

      expect(options).to.have.deep.property('[0].clientOne.test').that.equals(true);
    });
  });
});
