const q = require('daskeyboard-applet');
const logger = q.logger;
const moment = require('moment');


function calculateTheOriginQuantity(age, weight){
  return age * weight;
}

function addWaterForMan(waterQuantityForMan){
  return waterQuantityForMan + (waterQuantityForMan * (20/100));
}

const mytIntRegular = 500;
function levelActivityRegular (waterQuantityRegular){
  return waterQuantityRegular + mytIntRegular;
}

const mytIntActive = 1000;
function levelActivityActive (waterQuantityActive){
  return waterQuantityActive + mytIntActive ;
}


class H2O extends q.DesktopApp {

  constructor() {
    super();
    this.pollingInterval = 1000;
    this.LastHourofNotification = '';
    this.lastExerciseIndex = 0;
    this.quantityofWater = 0;
    logger.info("H2O reminder, ready to drink!");
  }

 getCurrentHour() {
    return moment().hour();
  }
  
  getCurrentMinute() {
    return moment().minute();
  }

  
  async run() {
       
    const userValueMan ="man";
    const activeLevel = "active";
    const regularLevel = "regular";

    const userGenderValue = this.config.userGenderValue;
    const enterYourAge = this.config.enterYourAge;
    const enterYourWeight = this.config.enterYourWeight;
    const activityLevel = this.config.activityLevel;
    const colorBlinkingKey = this.config.colorBlinkingKey;

    const minuteAfterTheHour = this.config.minuteAfterTheHour;
    var integer = parseInt(minuteAfterTheHour, 10);
   
    //current time
    const currentHour = this.getCurrentHour();
    const currentMinute = this.getCurrentMinute();
    

  if ((currentMinute >= integer) && (this.LastHourofNotification != currentHour)){

    let quantityofWater;
    quantityofWater = calculateTheOriginQuantity (enterYourAge, enterYourWeight);
  
    if (userGenderValue == userValueMan || userGenderValue == userValueMan){ 
      quantityofWater = addWaterForMan (quantityofWater);
    } 
    else {
      console.log ("quantity of water you need to drink", quantityofWater);
    }
    if (activityLevel == activeLevel){
      quantityofWater = levelActivityActive(quantityofWater);
    }
    else if (activityLevel == regularLevel ) {
        quantityofWater = levelActivityRegular(quantityofWater);
        console.log ("quantity of water you need to drink", quantityofWater);
    }
    else {
      console.log ("quantity of water you need to drink", quantityofWater);
    }

    this.LastHourofNotification = currentHour;
    
    logger.info("H2O Reminder, time to drink.");

      return new q.Signal({
        points: [
          [new q.Point(colorBlinkingKey, q.Effects.BLINK)]
        ],
        name: 'H2O Reminder International',
        message: `It's time to drink ${Math.round((quantityofWater + quantityofWater*(2.5/100))/10)} mL`
      });
    }
  }
}


module.exports = {
  H2O: H2O
}

const applet = new H2O();
