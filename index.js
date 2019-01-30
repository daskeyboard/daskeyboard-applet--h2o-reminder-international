const q = require('daskeyboard-applet');
const logger = q.logger; // to access to the logger
const moment = require('moment');


// fonction qui permet de calculer la quantite d eau normal 
// sans facteurs exterieurs
function calculateTheOriginQuantity(age, weight){
  return age * weight;
}

// grace a cette fonction on ajoute 5% d'eau en plus lorsqu'il
// fait un temps chaud
function hotdayFunction (waterQuantity) {
  return waterQuantity+ (waterQuantity *(5/100));
}

function addWaterForMan(waterQuantityForMan){
  return waterQuantityForMan+ (waterQuantityForMan * (20/100));
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
    
    //on recupere la valeur du sexe du customer
    const userGenderValue = this.config.userGenderValue;
   
    const userValueMan ="man";
    const activeLevel = "active";
    const hotDay = "hot-day";

    //recupere bien la valeur de l age
    const enterYourAge = this.config.enterYourAge;

    //recuperer bien la valeur du poids
    const enterYourWeight = this.config.enterYourWeight;

    //on recupere le niveau d activite du customer
    const activityLevel = this.config.activityLevel;

    // on recupere la valeur du temps aujourd hui
    const weatherDay = this.config.weatherDay;

    //console.log("valeur de la temperature du jour", weatherDay);

    //minutes apres l heure que le customer veut que cela blink
    const minuteAfterTheHour = this.config.minuteAfterTheHour;
    var integer = parseInt(minuteAfterTheHour, 10);
   
    //current time
    const currentHour = this.getCurrentHour();
    const currentMinute = this.getCurrentMinute();
    

    //boucle pour les conditions quand c est l heure
  if ((currentMinute >= integer) && (this.LastHourofNotification != currentHour)){

    console.log("je suis dans la boucle SAAAALLLLUUUTTT");
 
    //calcul de la valeur de l'eau without option
    let quantityofWater;
    quantityofWater = calculateTheOriginQuantity (enterYourAge, enterYourWeight);
    
   

    if (userGenderValue == userValueMan){ 
      quantityofWater = addWaterForMan (quantityofWater);
      console.log("===============================================");
      console.log("quantity of water for a man", quantityofWater);
      console.log("===============================================");
    } 
    else {
      console.log ("*********************************************");
      console.log ("quantite d eau pour une femme par temps CHAUD", quantityofWater);
    }
    if (weatherDay == hotDay){
      quantityofWater = hotdayFunction (quantityofWater);
      console.log ("*********************************************");
      console.log("===============================================");
      console.log("quantite d'eau a boire quand il fait chaud", quantityofWater);
      console.log("===============================================");
    }
    else {
      console.log ("*********************************************");
      console.log ("quantite d eau pour une femme par temps FROID", quantityofWater);
     }
    if (activityLevel == activeLevel){
      console.log("je suis AAAAAAAAACCCTTTIIIIVVVEEEE");
      quantityofWater = levelActivityActive(quantityofWater);
      console.log ("*********************************************");
      console.log("===============================================");
      console.log ("activite physique ACTIVE", quantityofWater);
      console.log ("===============================================");
    }
    else {
      //console.log ("*********************************************");
      //console.log ("activite physique REGULIERE", quantityofWater);
      quantityofWater = levelActivityRegular (quantityofWater);
    }


 
    console.log ("*********************************************");
    this.LastHourofNotification = currentHour;
    console.log ("valeur de lasthournotification", this.LastHourofNotification);




    logger.info("H2O Reminder, time to drink.");
    const color = '#FF0000';



      return new q.Signal({
        points: [
          [new q.Point(color, q.Effects.BLINK)]
        ],
        name: 'H2O Reminder',
        message: `It's time to drink ${quantityofWater} mL`

      });
    }//fermeture du if pour le calcul de l heure
  }//fermeture du run
}//fermeture de la classe


module.exports = {
  H2O: H2O,
  calculateTheOriginQuantity : calculateTheOriginQuantity,
  hotdayFunction : hotdayFunction,
  addWaterForMan : addWaterForMan,
  levelActivityActive : levelActivityActive
  
}

const applet = new H2O();





 //console.log("valeur de la quantite d eau pour un homme", quantityofWaterMan);
    //console.log("===============================================");
    //console.log("===============================================");
    



 // console.log("===============================================");
    // console.log("===============================================");
    // console.log ("valeur du sexe de l'utilisateur", userGenderValue);






    // console.log("===============================================");
    // console.log("===============================================");
    // console.log ("age du customer", enterYourAge);
    // console.log("poids du customer", enterYourWeight); 
    // console.log("===============================================");
    







    // const quantityofWater = calculateTheOriginQuantity (enterYourAge, enterYourWeight);

    // console.log("valeur de la quantite d eau normal", quantityofWater);
    // console.log("===============================================");
    // console.log("===============================================");

    // const quantityofWaterHotDay = hotdayFunction (quantityofWater);
    // console.log ("valeur de la quantite d eau pour un jour chaud", quantityofWaterHotDay);
    // console.log("===============================================");
    // console.log("===============================================");

    // const quantityofWaterMan = addWaterForMan (quantityofWater);
    // console.log("valeur de la quantite d eau pour un homme", quantityofWaterMan);
    // console.log("===============================================");
    // console.log("===============================================");
    

    // const quantityofWaterActive = levelActivityActive (quantityofWater);
    // console.log (" valeur de la quantite d eau avec activite active", quantityofWaterActive);
    // console.log("===============================================");
    // console.log("===============================================");

    // const quantityofWaterRegular = levelActivityRegular (quantityofWater);
    // console.log ("valeur de la quantite d eau avec activite reguliere", quantityofWaterRegular);
    // console.log("===============================================");
    // console.log("===============================================");
