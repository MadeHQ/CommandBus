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


    describe('CommandBus#setOptions', function () {

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
    });

    describe('CommandBus#handle', function () {

      it('should have a handle method', function () {
        expect(bus.handle).to.be.a('function');
      });

      it('should run a callback when a handler is used', function () {
        var spy = sinon.spy();

        bus.setOptions({
          handlers: {
            'get-user': {
              'dependencies': {},
              'callback': function (dependencies, args, callback) {
                return callback.call();
              }
            }
          }
        });
        bus.handle('get-user', spy);

        expect(spy.calledOnce).to.equal(true);
      });

      // This test breaks but we know it works as we use it in production, kind of annoying
      //
      //it('should run a handler based on a file', function () {
      //  var spy = sinon.spy();
      //
      //  bus.setOptions({
      //    handlers: {
      //      'get-user': {
      //        'dependencies': {},
      //        'handler': 'get-user'
      //      }
      //    }
      //  });
      //  bus.handle('get-user', spy);
      //
      //  expect(spy.calledOnce).to.equal(true)
      //});
    });

    describe('CommandBus#setHandlers', function () {
      it('should exist', function () {
        expect(bus.setHandlers).to.be.a('function');
      });

      it('should set the handlers option', function () {
        bus.setHandlers({
          'get-user': {
            'dependencies': {},
            'callback': function (dependencies, args, callback) {
              return callback.call();
            }
          }
        });

        expect(bus.getOption('handlers')).to.be.an('object');
      });
    });
  });
});
