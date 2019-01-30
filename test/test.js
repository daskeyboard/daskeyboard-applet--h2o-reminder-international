const assert = require('assert');
const t = require('../index');
const daskeyboardModule = require('daskeyboard-applet');

describe('H2O', () => {
  let app = new t.H2O();

  describe('#run()', () => {

    // Simulate: the customer is a man with different information
    it('should build the app and configure it to trigger every hour at :55, it is a man with a special config', async function () {
      const config = {
        applet: {
          user: {
            userGenderValue: "man",
            enterYourAge : 25,
            enterYourWeight : 55,
            activityLevel : "sedantary",
            weatherDay : "normal-day",
            minuteAfterTheHour: 55,
            colorBlinkingKey : "#F6FF00"
          }
        }
      }
      return buildAppWithConfig(config).then(app => {
        // Simulate that this test runs at 14:55
        app.getCurrentHour = function () {
          return 14;
        }

        app.getCurrentMinute = function () {
          return 55;
        }
        return app.run().then(signal => {
          // assert signal received
          assert.ok(signal);
          // assert color of first point is yellow
          assert.equal(signal.points[0][0].color, '#F6FF00');
          // assert blinking
          assert.equal(signal.points[0][0].effect, daskeyboardModule.Effects.BLINK);

        })
      }).catch(err => {
        assert.fail(err);
      });
    });

  // Simulate: the customer is a woman with different information
  it('should build the app and configure it to trigger every hour at :55, it is a woman with a special config', async function () {
    const config = {
      applet: {
        user: {
          userGenderValue: "woman",
          enterYourAge : 25,
          enterYourWeight : 90,
          activityLevel : "regular",
          weatherDay : "hot-day",
          minuteAfterTheHour: 55,
          colorBlinkingKey : "#FF0000"
        }
      }
    }
    return buildAppWithConfig(config).then(app => {
      // Simulate that this test runs at 14:55
      app.getCurrentHour = function () {
        return 14;
      }

      app.getCurrentMinute = function () {
        return 55;
      }
      return app.run().then(signal => {
        // assert signal received
        assert.ok(signal);
        // assert color of first point is red
        assert.equal(signal.points[0][0].color, '#FF0000');
        // assert blinking
        assert.equal(signal.points[0][0].effect, daskeyboardModule.Effects.BLINK);

      })
    }).catch(err => {
      assert.fail(err);
    });
  });


    // Simulate: the customer is a woman with different information
    it('should build the app and configure it to trigger every hour at :55, it is a woman with a special config', async function () {
      const config = {
        applet: {
          user: {
            userGenderValue: "woman",
            enterYourAge : 25,
            enterYourWeight : 70,
            activityLevel : "active",
            weatherDay : "hot-day",
            minuteAfterTheHour: 55,
            colorBlinkingKey : "#00DDFF"
          }
        }
      }
      return buildAppWithConfig(config).then(app => {
        // Simulate that this test runs at 14:55
        app.getCurrentHour = function () {
          return 14;
        }
  
        app.getCurrentMinute = function () {
          return 55;
        }
        return app.run().then(signal => {
          // assert signal received
          assert.ok(signal);
          // assert color of first point is red
          assert.equal(signal.points[0][0].color, '#00DDFF');
          // assert blinking
          assert.equal(signal.points[0][0].effect, daskeyboardModule.Effects.BLINK);
  
        })
      }).catch(err => {
        assert.fail(err);
      });
    });




  });
});

/**
 * Builds the app with the config given in params
 * @param {*} config 
 */
async function buildAppWithConfig(config) {
  let app = new t.H2O();
  return app.processConfig(config).then(() => {
    return app;
  });
}
