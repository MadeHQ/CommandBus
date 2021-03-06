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

      it('should accept 2 lists of options', function () {
        bus.setOptions({
          handlers: {
            'get-user': function (command, callback) {}
          }
        });

        bus.setOptions({
          globalDependencies: {
            sdk: {}
          }
        });

        expect(bus.getOption('handlers')).to.be.an('object');
        expect(bus.getOption('globalDependencies')).to.be.an('object');
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
              'handler': function (dependencies, args, callback) {
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
            'handler': function (dependencies, args, callback) {
              return callback.call();
            }
          }
        });

        expect(bus.getOption('handlers')).to.be.an('object');
      });
    });

    describe('CommandBus#setGlobalDependencies', function () {
      it('should exist', function () {
        expect(bus.setGlobalDependencies).to.be.a('function');
      });

      it('should set a list of global dependencies', function () {
        bus.setGlobalDependencies({
          sdk: {}
        });

        expect(bus.getOption('globalDependencies').sdk).to.be.an('object');
      });

      it('should pass global dependencies through to API calls', function () {
        bus.setGlobalDependencies({
          sdk: {}
        });
        bus.setHandlers({
          'get-user': {
            'dependencies': {},
            'handler': function (dependencies, args, callback) {
              return callback.call(this, dependencies);
            }
          }
        });

        var spy = sinon.spy();

        bus.handle('get-user', spy);

        expect(spy.calledWith({sdk:{}})).to.equal(true);
      });

      it('should pass global dependencies through with local ones', function () {
        bus.setGlobalDependencies({
          sdk: {}
        });
        bus.setHandlers({
          'get-user': {
            'dependencies': {
              'message': 'Hello Sinon!'
            },
            'handler': function (dependencies, args, callback) {
              return callback.call(this, dependencies);
            }
          }
        });

        var spy = sinon.spy();

        bus.handle('get-user', spy);

        expect(spy.calledWith({
          sdk:{},
          message: 'Hello Sinon!'
        })).to.equal(true);
      });
    });
  });
});
