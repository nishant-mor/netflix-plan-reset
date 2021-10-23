const puppeteer = require('puppeteer');
const schedule 	= require('node-schedule');
const moment	= require('moment');
const USER_NAME = process.env.USER_NAME;
const PASSWORD 	= process.env.PASSWORD;

async function click(selector, page) {
    try {
      await page.waitForSelector(selector , {
        timeout: 10000
      })
      await page.click(selector)
    } catch (err) {
    	console.log("click", err, selector);
    }
}

async function type(selector, page, text){
    try {
		await page.waitForSelector(selector, {
			timeout: 10000
		});
		await page.focus(selector); 
		await page.keyboard.type(text);
	} catch (err) {
		console.log("type", err);
	}  
}

async function querySelector1(sel, page){
    try{
        console.log("!!!" , sel);
		await page.waitForSelector(sel, {
			timeout: 10000
		});
        console.log("!!!" , sel);

        const textContent = await page.evaluateHandle(() => {
            return document.querySelector("" + sel).innerText;
         });
         
        console.log("Text Content : " , textContent); 
         
    } catch(er){
        console.log("querySelectorAAA", er);
    }
}

async function hit() {
	console.log("Hit Process");
    try{

	const browser = await puppeteer.launch({
		headless: false,
		args: ['--no-sandbox']
	});
	const page = await browser.newPage();
	await page.goto('https://www.netflix.com/ChangePlan', {
		waitUntil: 'load',
		timeout: 0
	});
    console.log("Hit Process Done");


	var userNameSelector 		= "#appMountPoint > div > div.login-body > div > div > div.hybrid-login-form-main > form > div.nfInput.nfEmailPhoneInput.login-input.login-input-email > div > div > label > label";
	var passworSelector 		= '#id_password';
	var loginButtonSelector 	= '#appMountPoint > div > div.login-body > div > div > div.hybrid-login-form-main > form > button';
	var mobilePlanSelector      = '#appMountPoint > div > div > div.bd > div > div > ul > li:nth-child(1)';
    
	var submitButton			= '#appMountPoint > div > div > div.bd > div > div > div.btn-bar.btn-bar-center > button.btn.save-plan-button.btn-blue.btn-small'; 
	
	var confirmSelection 		= '#appMountPoint > div > div > div.bd > div > div > div.nfmodal.large > div > footer > div > button.btn.modal-action-button.btn-blue.btn-small';
	//var dailySurveySelector 	= '#pulse_form > div > div > div > div.action-btns.mt-32 > button.btn.btn-secondary.ripple.db-btn.plr-32.mr-12.skip_pulse';
	//var profileSelector 		= "#dasboard-bigheader > header > div.col-md-4.text-right.mt-16.desktopDisplay > ul > li:nth-child(3) > div > div";
	//var clockInSelector 		= '#dasboard-bigheader > header > div.col-md-4.text-right.mt-16.desktopDisplay > ul > li:nth-child(1) > span'
	//var clockInSubmitSelector	= '#clokInClockout > div > div > div.modal-body > div.text-right > button'
	await type(userNameSelector, page, USER_NAME);
	await type(passworSelector, page, PASSWORD);
	await new Promise(r => setTimeout(r, 10000)) // add wait ;

	await click(loginButtonSelector, page);
	await new Promise(r => setTimeout(r, 10000)) // add wait ;

    await querySelector1(mobilePlanSelector, page);
    await new Promise(r => setTimeout(r, 10000)) // add wait ;

	//await click(submitButton, page);
    await new Promise(r => setTimeout(r, 50000)) // add wait ;



	await browser.close();
} catch(e){
    console.log("EE", e);
}

};

(async function () {
	var time 	= moment().format();
	var day 	= moment().day();

	console.log('Checking', time);
    hit();
    /*
	if(day == 0 || day ==6 ){
		console.log("Its Weekend!!")
	}
	else{
		var t = Math.floor((Math.random() * 10) + 1)*60*1000;
		if(process.env.NOW){ // Hit now 
			t = 1;
		}
		setTimeout(function(){
			hit();
		}, t);
	}

	if(process.env.SCHEDULE){
		schedule1();
	}
*/

})();