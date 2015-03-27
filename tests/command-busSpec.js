define([
  'chai',
  'command-bus'
], function (chai, CommandBus) {
  describe('CommandBus: Main', function () {

    var expect = chai.expect,
      bus;

    beforeEach(function () {
      bus = new CommandBus();
    });

    it('should be a function', function () {
      expect(CommandBus).to.be.a('function');
    });

    it('should have a method to set options', function () {
      expect(bus.setOptions).to.be.a('function');
    });

    it('should accept a hash of options', function () {
      bus.setOptions({
        handlers: {
          'get-user': function (command, callback) {}
        }
      });

      expect(bus.getOption('handlers')).to.be.an('object');
    });

    it('should have a handle method', function () {
      expect(bus.handle).to.be.a('function');
    });

    it('should run a callback when a handler is used', function () {
      var spy = sinon.spy();

      bus.setOptions({
        handlers: {
          'get-user': {
            'dependencies': {},
            'callback': function (dependencies, callback) {
              return callback.call();
            }
          }
        }
      });
      bus.handle('get-user', spy);

      expect(spy.calledOnce).to.equal(true);
    });

    it('should run a handler based on a file', function () {
      var spy = sinon.spy();

      bus.setOptions({
        handlers: {
          'get-user': {
            'dependencies': {},
            'handler': 'get-user'
          }
        }
      });
      bus.handle('get-user', spy);

      expect(spy.calledOnce).to.equal(true)
    });
  });
});
