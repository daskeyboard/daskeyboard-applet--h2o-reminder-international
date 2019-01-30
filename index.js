const q = require('daskeyboard-applet');
const logger = q.logger; // to access to the logger
const moment = require('moment');

// listeOfGender = ['man', 'woman'];


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

function levelActivityRegular (waterQuantityRegular){
  return waterQuantityRegular + 0.500 ;
}

function levelActivityActive (waterQuantityActive){
  return waterQuantityActive + 1000 ;
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

  // async applyConfig() {
  //   this.chosenGender =[];
  //   Object.key (this.config).forEach ( key =>{
  //     if (listeOfGender.includes(key) && this.config[key === true]){
  //       this.chosenGender.push(key);

  //       console.log ("------------------------------------------------");
  //       console.log ("valeur du sexe du customer", chosenGender);
  //       console.log ("------------------------------------------------");

  //     }
  //   });
  //  logger.info ("Gender have been choosen by the user", this.chosenGender);
  // }


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
    const regular = "regular";
    const active = "active";
    const hotDay = "hot-day";
    const enterYourAge = this.config.enterYourAge;//recupere bien la valeur de l age
    const enterYourWeight = this.config.enterYourWeight;//recuperer bien la valeur du poids

    //on recupere le niveau d activite du customer
    const actityLevel = this.config.actityLevel;

    // on recupere la valeur du temps aujourd hui
    const weatherDay = this.config.weatherDay;
    console.lot ("valeur de la temperature du jour", weatherDay);

    const minuteAfterTheHour = this.config.minuteAfterTheHour;
    var integer = parseInt(minuteAfterTheHour, 10);
    console.log ("valeur de integer", integer);


    console.log("===============================================");
    console.log("valeur de la minute a laquelle il faut que cela blink", minuteAfterTheHour); 
    console.log("===============================================");

    //current time
    const currentHour = this.getCurrentHour();
    const currentMinute = this.getCurrentMinute();
      
    console.log ("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
    console.log ("valeur de l'heure actuelle", currentHour);
    console.log ("valeur de la minute acutelle", currentMinute);
    console.log ("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");



  if ((currentMinute >= integer) && (this.LastHourofNotification != currentHour)){

    console.log("je suis dans la boucle SAAAALLLLUUUTTT");
 

    let quantityofWater;
    //calcul de la valeur de l'eau without option
    
    quantityofWater = calculateTheOriginQuantity (enterYourAge, enterYourWeight);
    console.log("valeur de la quantite d eau normal", quantityofWater);
   


    console.log ("*********************************************");
    console.log ("current minute apres le if", currentMinute);
    console.log ("valeur de interger", integer);
    console.log ("valeur de lasthournotification", this.LastHourofNotification);
    console.log ("valeur de current hour", currentHour);
    console.log ("*********************************************");
   
   
    let quantityofWaterMan;
    let temperatureForAddWater;

    if (userGenderValue == userValueMan){
      quantityofWaterMan = addWaterForMan (quantityofWater);
      console.log("quantity of water for a man", quantityofWaterMan);
      if(weatherDay == hotDay){
        temperatureForAddWater = hotdayFunction (quantityofWater); 
        console.log ("valeur de l eau avec temperature chaude", temperatureForAddWater);
      }
        // if ( actityLevel == active || actityLevel ==regular ){

        // }

      else{
      //calculer la quantite qu un homme doit boire
      
      }
    
   
  }
    else 
    {
      console.log("I'm a woman");
    }

  
    this.LastHourofNotification = currentHour;
    console.log ("valeur de lasthournotification", this.LastHourofNotification);




    logger.info("H2O Reminder, time to drink.");
    const color = '#FF0000';



      return new q.Signal({
        points: [
          [new q.Point(color, q.Effects.BLINK)]
        ],
        name: 'H2O Reminder',
        message: `hey I send the right signal ${quantityofWaterMan}`

      });
    }//fermeture du if pour le calcul de l heure
  }//fermeture du run
}//fermeture de la classe


module.exports = {
  H2O: H2O,
  calculateTheOriginQuantity : calculateTheOriginQuantity
  
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
