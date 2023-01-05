dojo.declare("classes.managers.SpaceManager",com.nuclearunicorn.core.TabManager,{game:null,hideResearched:!1,spaceBuildingsMap:[],programs:[{name:"orbitalLaunch",label:$I("space.orbitalLaunch.label"),description:$I("space.orbitalLaunch.desc"),prices:[{name:"oil",val:15E3},{name:"manpower",val:5E3},{name:"science",val:1E5},{name:"starchart",val:250}],unlocks:{planet:["cath"],spaceMission:["moonMission"]}},{name:"moonMission",label:$I("space.moonMission.label"),description:$I("space.moonMission.desc"),
prices:[{name:"titanium",val:5E3},{name:"oil",val:45E3},{name:"science",val:125E3},{name:"starchart",val:500}],unlocks:{planet:["moon"],spaceMission:["duneMission","piscineMission"]}},{name:"duneMission",label:$I("space.duneMission.label"),description:$I("space.duneMission.desc"),prices:[{name:"titanium",val:7E3},{name:"science",val:175E3},{name:"starchart",val:1E3},{name:"kerosene",val:75}],unlocks:{planet:["dune"],spaceMission:["heliosMission"],policies:["technocracy","theocracy","expansionism"]}},
{name:"piscineMission",label:$I("space.piscineMission.label"),description:$I("space.piscineMission.desc"),prices:[{name:"titanium",val:9E3},{name:"science",val:2E5},{name:"starchart",val:1500},{name:"kerosene",val:250}],unlocks:{planet:["piscine"],spaceMission:["terminusMission"]}},{name:"heliosMission",label:$I("space.heliosMission.label"),description:$I("space.heliosMission.desc"),prices:[{name:"titanium",val:15E3},{name:"science",val:25E4},{name:"starchart",val:3E3},{name:"kerosene",val:1250}],
unlocks:{planet:["helios"],spaceMission:["yarnMission"]}},{name:"terminusMission",label:$I("space.terminusMission.label"),description:$I("space.terminusMission.desc"),prices:[{name:"titanium",val:12E3},{name:"science",val:225E3},{name:"starchart",val:2500},{name:"kerosene",val:750}],unlocks:{planet:["terminus"],spaceMission:["heliosMission","kairoMission"]}},{name:"kairoMission",label:$I("space.kairoMission.label"),description:$I("space.kairoMission.desc"),prices:[{name:"titanium",val:2E4},{name:"science",
val:3E5},{name:"starchart",val:5E3},{name:"kerosene",val:7500}],unlocks:{planet:["kairo"],spaceMission:["rorschachMission"]}},{name:"rorschachMission",label:$I("space.rorschachMission.label"),description:$I("space.rorschachMission.desc"),prices:[{name:"titanium",val:8E4},{name:"science",val:5E5},{name:"starchart",val:15E3},{name:"kerosene",val:25E3}],unlocks:{spaceMission:["centaurusSystemMission"]}},{name:"yarnMission",label:$I("space.yarnMission.label"),description:$I("space.yarnMission.desc"),
prices:[{name:"titanium",val:35E3},{name:"science",val:35E4},{name:"starchart",val:7500},{name:"kerosene",val:12E3}],unlocks:{planet:["yarn"],spaceMission:["umbraMission"]}},{name:"umbraMission",label:$I("space.umbraMission.label"),description:$I("space.umbraMission.desc"),prices:[{name:"science",val:5E5},{name:"starchart",val:25E3},{name:"kerosene",val:25E3},{name:"thorium",val:15E3}],unlocks:{planet:["umbra"],spaceMission:["charonMission"]}},{name:"charonMission",label:$I("space.charonMission.label"),
description:$I("space.charonMission.desc"),prices:[{name:"science",val:75E4},{name:"starchart",val:75E3},{name:"kerosene",val:35E3},{name:"thorium",val:35E3}],unlocks:{planet:["charon"],spaceMission:["charonMission"]}},{name:"centaurusSystemMission",label:$I("space.centaurusSystemMission.label"),description:$I("space.centaurusSystemMission.desc"),prices:[{name:"titanium",val:4E4},{name:"science",val:8E5},{name:"starchart",val:1E5},{name:"kerosene",val:5E4},{name:"thorium",val:5E4}],unlocks:{planet:["centaurusSystem"],
spaceMission:["furthestRingMission"]}},{name:"furthestRingMission",label:$I("space.furthestRingMission.label"),description:$I("space.furthestRingMission.desc"),prices:[{name:"science",val:125E4},{name:"starchart",val:5E5},{name:"kerosene",val:75E3},{name:"thorium",val:75E3}],unlocks:{planet:["furthestRing"]}}],planets:[{name:"cath",label:$I("space.planet.cath.label"),routeDays:0,buildings:[{name:"spaceElevator",label:$I("space.planet.cath.spaceElevator.label"),description:$I("space.planet.cath.spaceElevator.desc"),
unlocked:!1,priceRatio:1.15,prices:[{name:"titanium",val:6E3},{name:"unobtainium",val:50},{name:"science",val:75E3}],requiredTech:["orbitalEngineering","nanotechnology"],effects:{oilReductionRatio:0,spaceRatio:0,prodTransferBonus:0},calculateEffects:function(a,b){a.effects={oilReductionRatio:.05,spaceRatio:.01,prodTransferBonus:.001}}},{name:"sattelite",label:$I("space.planet.cath.sattelite.label"),description:$I("space.planet.cath.sattelite.desc"),unlocked:!1,prices:[{name:"titanium",val:2500},{name:"oil",
val:15E3},{name:"science",val:1E5},{name:"starchart",val:325}],priceRatio:1.08,requiredTech:["sattelites"],effects:{observatoryRatio:0,starchartPerTickBaseSpace:0,energyConsumption:0,energyProduction:0},unlocks:{policies:["outerSpaceTreaty","militarizeSpace"]},calculateEffects:function(a,b){var c=.05*(1+b.getEffect("satelliteSynergyBonus"));a.effects={observatoryRatio:c,starchartPerTickBaseSpace:.001,energyConsumption:0,energyProduction:0};b.workshop.get("solarSatellites").researched?(a.effects.energyProduction=
1,a.on=a.val,a.togglable=!1):a.effects.energyConsumption=1},upgrades:{buildings:["observatory"]},unlockScheme:{name:"space",threshold:24}},{name:"spaceStation",label:$I("space.planet.cath.spaceStation.label"),description:$I("space.planet.cath.spaceStation.desc"),unlocked:!1,prices:[{name:"oil",val:35E3},{name:"science",val:15E4},{name:"starchart",val:425},{name:"alloy",val:750}],priceRatio:1.12,requiredTech:["orbitalEngineering"],effects:{scienceRatio:0,maxKittens:0,energyConsumption:0},calculateEffects:function(a,
b){a.effects={scienceRatio:.5,maxKittens:2,energyConsumption:10}},unlocks:{tabs:["village"]},breakIronWill:!0}],calculateEffects:function(a,b){b.science.get("rocketry").researched&&b.time.queue.unlockQueueSource("spaceMission")}},{name:"moon",label:$I("space.planet.moon.label"),routeDays:30,buildings:[{name:"moonOutpost",label:$I("space.planet.moon.moonOutpost.label"),description:$I("space.planet.moon.moonOutpost.desc"),unlocked:!1,priceRatio:1.12,prices:[{name:"oil",val:55E3},{name:"uranium",val:500},
{name:"science",val:1E5},{name:"starchart",val:650},{name:"concrate",val:150},{name:"alloy",val:750}],effects:{uraniumPerTickCon:0,unobtainiumPerTickSpace:0,energyConsumption:0},calculateEffects:function(a,b){b={uraniumPerTickCon:-.35,unobtainiumPerTickSpace:.007*(1+b.getEffect("lunarOutpostRatio")),energyConsumption:5};a.effects=b},lackResConvert:!1,action:function(a,b){a.effects.uraniumPerTickCon=-.35;a.effects.unobtainiumPerTickSpace=.007*(1+b.getEffect("lunarOutpostRatio"));b=b.resPool.getAmtDependsOnStock([{res:"uranium",
amt:-a.effects.uraniumPerTickCon}],a.on);a.effects.uraniumPerTickCon*=b;a.effects.unobtainiumPerTickSpace*=b;return b}},{name:"moonBase",label:$I("space.planet.moon.moonBase.label"),description:$I("space.planet.moon.moonBase.desc"),unlocked:!1,priceRatio:1.12,prices:[{name:"titanium",val:9500},{name:"oil",val:7E4},{name:"unobtainium",val:50},{name:"science",val:1E5},{name:"starchart",val:700},{name:"concrate",val:250}],effects:{catnipMax:0,woodMax:0,mineralsMax:0,coalMax:0,ironMax:0,titaniumMax:0,
oilMax:0,unobtainiumMax:0,energyConsumption:0},calculateEffects:function(a,b){var c={catnipMax:45E3,woodMax:25E3,mineralsMax:3E4,coalMax:3500,ironMax:9E3,titaniumMax:1250,oilMax:3500,unobtainiumMax:150,energyConsumption:0};c.energyConsumption=b.workshop.get("amBases").researched?5:10;if(b.workshop.get("aiBases").researched){var d=1+b.getEffect("aiCoreUpgradeBonus"),e;for(e in c)"energyConsumption"!=e&&(c[e]*=1+.1*b.bld.get("aiCore").on*d)}a.effects=c}}]},{name:"dune",label:$I("space.planet.dune.label"),
routeDays:356,buildings:[{name:"planetCracker",label:$I("space.planet.dune.planetCracker.label"),description:$I("space.planet.dune.planetCracker.desc"),unlocked:!1,priceRatio:1.18,prices:[{name:"science",val:125E3},{name:"starchart",val:2500},{name:"alloy",val:1750},{name:"kerosene",val:50}],effects:{uraniumPerTickSpace:0,uraniumMax:0},calculateEffects:function(a,b){a.effects={uraniumPerTickSpace:.3*(1+b.getEffect("crackerRatio")),uraniumMax:1750}}},{name:"hydrofracturer",label:$I("space.planet.dune.hydrofracturer.label"),
description:$I("space.planet.dune.hydrofracturer.desc"),unlocked:!1,priceRatio:1.18,prices:[{name:"science",val:15E4},{name:"starchart",val:750},{name:"alloy",val:1025},{name:"kerosene",val:100}],effects:{oilPerTickAutoprodSpace:0},calculateEffects:function(a,b){a.effects={oilPerTickAutoprodSpace:.5}},unlockScheme:{name:"fluid",threshold:10}},{name:"spiceRefinery",label:$I("space.planet.dune.spiceRefinery.label"),description:$I("space.planet.dune.spiceRefinery.desc"),unlocked:!1,priceRatio:1.15,prices:[{name:"science",
val:75E3},{name:"starchart",val:500},{name:"alloy",val:500},{name:"kerosene",val:125}],effects:{spicePerTickAutoprodSpace:0},calculateEffects:function(a,b){a.effects={spicePerTickAutoprodSpace:.025}},unlockScheme:{name:"dune",threshold:10}}]},{name:"piscine",label:$I("space.planet.piscine.label"),routeDays:256,buildings:[{name:"researchVessel",label:$I("space.planet.piscine.researchVessel.label"),description:$I("space.planet.piscine.researchVessel.desc"),unlocked:!1,priceRatio:1.15,prices:[{name:"titanium",
val:12500},{name:"starchart",val:100},{name:"alloy",val:2500},{name:"kerosene",val:250}],effects:{scienceMax:0,starchartPerTickBaseSpace:0},calculateEffects:function(a,b){a.effects={scienceMax:1E4*(1+b.getEffect("spaceScienceRatio")),starchartPerTickBaseSpace:b.challenges.isActive("blackSky")?0:.01}},unlockScheme:{name:"vessel",threshold:20}},{name:"orbitalArray",label:$I("space.planet.piscine.orbitalArray.label"),description:$I("space.planet.piscine.orbitalArray.desc"),unlocked:!1,priceRatio:1.15,
prices:[{name:"science",val:25E4},{name:"starchart",val:2E3},{name:"eludium",val:100},{name:"kerosene",val:500}],effects:{spaceRatio:0,energyConsumption:0},calculateEffects:function(a,b){a.effects={spaceRatio:.02,energyConsumption:20}}}]},{name:"helios",label:$I("space.planet.helios.label"),routeDays:1200,buildings:[{name:"sunlifter",label:$I("space.planet.helios.sunlifter.label"),description:$I("space.planet.helios.sunlifter.desc"),unlocked:!1,priceRatio:1.15,prices:[{name:"science",val:5E5},{name:"eludium",
val:225},{name:"kerosene",val:2500}],effects:{antimatterProduction:0,energyProduction:0},calculateEffects:function(a,b){a.effects={antimatterProduction:1,energyProduction:30}}},{name:"containmentChamber",label:$I("space.planet.helios.containmentChamber.label"),description:$I("space.planet.helios.containmentChamber.desc"),unlocked:!1,priceRatio:1.125,prices:[{name:"science",val:5E5},{name:"kerosene",val:2500}],effects:{antimatterMax:0,energyConsumption:0},calculateEffects:function(a,b){b={antimatterMax:100*
(1+.02*b.space.getBuilding("heatsink").val),energyConsumption:50*(1+.01*b.space.getBuilding("heatsink").val)};a.effects=b}},{name:"heatsink",label:$I("space.planet.helios.heatsink.label"),description:$I("space.planet.helios.heatsink.desc"),unlocked:!1,priceRatio:1.12,prices:[{name:"science",val:125E3},{name:"relic",val:1},{name:"kerosene",val:5E3},{name:"thorium",val:12500}],effects:{},calculateEffects:function(a,b){},upgrades:{spaceBuilding:["containmentChamber"]}},{name:"sunforge",label:$I("space.planet.helios.sunforge.label"),
description:$I("space.planet.helios.sunforge.desc"),unlocked:!1,priceRatio:1.12,prices:[{name:"antimatter",val:250},{name:"science",val:1E5},{name:"relic",val:1},{name:"kerosene",val:1250}],effects:{baseMetalMaxRatio:.01},calculateEffects:function(a,b){}}]},{name:"terminus",label:$I("space.planet.terminus.label"),routeDays:2500,buildings:[{name:"cryostation",label:$I("space.planet.terminus.cryostation.label"),description:$I("space.planet.terminus.cryostation.desc"),unlocked:!1,priceRatio:1.12,prices:[{name:"science",
val:2E5},{name:"concrate",val:1500},{name:"eludium",val:25},{name:"kerosene",val:500}],effects:{woodMax:0,mineralsMax:0,coalMax:0,ironMax:0,titaniumMax:0,oilMax:0,uraniumMax:0,unobtainiumMax:0},calculateEffects:function(a,b){a.effects={woodMax:2E5,mineralsMax:2E5,coalMax:25E3,ironMax:5E4,titaniumMax:7500,oilMax:7500,uraniumMax:5E3,unobtainiumMax:750}},unlockScheme:{name:"arctic",threshold:10}}]},{name:"kairo",label:$I("space.planet.kairo.label"),routeDays:5E3,buildings:[{name:"spaceBeacon",label:$I("space.planet.kairo.spaceBeacon.label"),
description:$I("space.planet.kairo.spaceBeacon.desc"),unlocked:!1,priceRatio:1.15,prices:[{name:"antimatter",val:50},{name:"starchart",val:25E3},{name:"alloy",val:25E3},{name:"kerosene",val:7500}],effects:{scienceMax:25E3,starchartPerTickBaseSpace:.025,relicPerDay:0},action:function(a,b){var c=b.getEffect("beaconRelicsPerDay"),d=1+b.getEffect("relicRefineRatio")*b.religion.getZU("blackPyramid").getEffectiveValue(b)*.1,e=b.resPool.get("antimatter").maxValue;5E3>e&&(d*=e/5E3);e=1+.25*b.space.getBuilding("entangler").effects.hashRateLevel;
a.effects={scienceMax:25E3*(1+b.getEffect("spaceScienceRatio")),starchartPerTickBaseSpace:.025,relicPerDay:c*d*e}}}]},{name:"yarn",label:$I("space.planet.yarn.label"),routeDays:3800,buildings:[{name:"terraformingStation",label:$I("space.planet.yarn.terraformingStation.label"),description:$I("space.planet.yarn.terraformingStation.desc"),unlocked:!1,priceRatio:1.25,prices:[{name:"uranium",val:5E3},{name:"antimatter",val:25},{name:"kerosene",val:5E3}],requiredTech:["terraformation"],effects:{maxKittens:1},
action:function(a,b){a.effects.maxKittens=1+b.getEffect("terraformingMaxKittensRatio")},unlocks:{tabs:["village"]},breakIronWill:!0},{name:"hydroponics",label:$I("space.planet.yarn.hydroponics.label"),description:$I("space.planet.yarn.hydroponics.desc"),unlocked:!1,priceRatio:1.15,prices:[{name:"unobtainium",val:1},{name:"kerosene",val:500}],requiredTech:["hydroponics"],effects:{catnipRatio:.025,catnipMaxRatio:.1,terraformingMaxKittensRatio:0},upgrades:{spaceBuilding:["terraformingStation"]},updateEffects:function(a,
b){a.effects.terraformingMaxKittensRatio=b.getUnlimitedDR(a.on,100)/a.on;a.effects.catnipRatio=.025},action:function(a,b){a.updateEffects(a,b)}}]},{name:"umbra",label:$I("space.planet.umbra.label"),routeDays:7500,buildings:[{name:"hrHarvester",label:$I("space.planet.umbra.hrHarvester.label"),description:$I("space.planet.umbra.hrHarvester.desc"),unlocked:!0,priceRatio:1.15,prices:[{name:"antimatter",val:1250},{name:"relic",val:25}],effects:{energyProduction:1},calculateEffects:function(a,b){var c=
b.calendar.darkFutureYears();0>c&&(c=0);a.effects.energyProduction=(1+.01*b.getUnlimitedDR(c,.075))*(1+b.getEffect("umbraBoostRatio"))}},{name:"navigationRelay",label:$I("space.planet.umbra.navigationRelay.label"),description:$I("space.planet.umbra.navigationRelay.desc"),unlocked:!1,requiredTech:!1,priceRatio:1.2,prices:[{name:"titanium",val:5E4},{name:"concrate",val:5E3}],effects:{}},{name:"spaceShuttle",label:$I("space.planet.umbra.spaceShuttle.label"),description:$I("space.planet.umbra.spaceShuttle.desc"),
unlocked:!1,requiredTech:!1,priceRatio:1.15,prices:[{name:"antimatter",val:50},{name:"eludium",val:500}],effects:{}}]},{name:"charon",label:$I("space.planet.charon.label"),routeDays:25E3,buildings:[{name:"entangler",label:$I("space.planet.charon.entangler.label"),description:$I("space.planet.charon.entangler.desc"),unlocked:!1,priceRatio:1.15,prices:[{name:"antimatter",val:5250},{name:"relic",val:1250},{name:"eludium",val:5E3}],requiredTech:["quantumCryptography"],effects:{gflopsConsumption:.1,hashrate:0,
hashRateLevel:0,nextHashLevelAt:0,hrProgress:0,energyConsumption:25},action:function(a,b){var c=a.effects.gflopsConsumption*a.on;b.resPool.get("gflops").value<c&&0<b.resPool.get("gflops").value&&(c=b.resPool.get("gflops").value);0!=b.resPool.get("gflops").value&&(b.resPool.addResEvent("gflops",-c),b.resPool.addResEvent("hashrates",c));b=b.resPool.get("hashrates").value;a.effects.hashrate=b;a.effects.nextHashLevelAt=1E3*Math.pow(1.6,a.effects.hashRateLevel+1);a.effects.hrProgress=b/(1E3*Math.pow(1.6,
a.effects.hashRateLevel+1));a.effects.hashRateLevel=1E3<b?Math.floor(Math.log(b/1E3)/Math.log(1.6)):0;a.effects.gflopsConsumption=.1}}]},{name:"centaurusSystem",label:$I("space.planet.centaurusSystem.label"),routeDays:12E4,buildings:[{name:"tectonic",label:$I("space.planet.centaurusSystem.tectonic.label"),description:$I("space.planet.centaurusSystem.tectonic.desc"),unlocked:!1,priceRatio:1.25,prices:[{name:"antimatter",val:500},{name:"thorium",val:75E3}],requiredTech:["terraformation"],effects:{energyProduction:0},
calculateEffects:function(a,b){a.effects={energyProduction:25*(1+b.getEffect("tectonicBonus"))}}},{name:"moltenCore",label:$I("space.planet.centaurusSystem.moltenCore.label"),description:$I("space.planet.centaurusSystem.moltenCore.desc"),unlocked:!1,priceRatio:1.25,prices:[{name:"uranium",val:5E6},{name:"science",val:25E6}],effects:{tectonicBonus:.05},requiredTech:["exogeophysics"],upgrades:{spaceBuilding:["tectonic"]}}]},{name:"furthestRing",label:$I("space.planet.furthestRing.label"),routeDays:725E6,
buildings:[]}],metaCache:null,constructor:function(a){this.game=a;this.metaCache={};this.registerMeta("stackable",this.programs,null);for(var b in this.planets)this.registerMeta(!1,this.planets[b].buildings,{getEffect:function(e,g){if(e.effects){var f="spaceRatio"==g&&a.resPool.energyCons>a.resPool.energyProd?a.resPool.getEnergyDelta():1;return e.effects[g]*e.on*f}return 0}});for(b in this.planets)this.planets[b].routeDaysDefault=this.planets[b].routeDays;this.setEffectsCachedExisting();for(b=0;b<
this.planets.length;b++)for(var c=this.planets[b].buildings.map(function(e){return e.name}),d=0;d<c.length;d++)this.spaceBuildingsMap.push(c[d])},resetState:function(){for(var a=0;a<this.programs.length;a++){var b=this.programs[a];b.unlocked="orbitalLaunch"==b.name;b.noStackable=!0;this.resetStateStackable(b)}for(a=0;a<this.planets.length;a++){var c=this.planets[a];c.unlocked=!1;c.reached=!1;c.routeDays=c.routeDaysDefault;if(c.buildings)for(var d=0;d<c.buildings.length;d++)b=c.buildings[d],b.unlocked=
!1,this.resetStateStackable(b)}this.hideResearched=!1},save:function(a){for(var b=this.filterMetadata(this.planets,["name","buildings","reached","unlocked","routeDays"]),c=0;c<b.length;c++){var d=b[c];d.buildings&&(d.buildings=this.filterMetadata(d.buildings,["name","val","on","unlocked"]))}a.space={hideResearched:this.hideResearched,programs:this.filterMetadata(this.programs,["name","val","on","unlocked"]),planets:b}},load:function(a){if(a.space){this.hideResearched=a.space.hideResearched||!1;this.loadMetadata(this.programs,
a.space.programs);this.loadMetadata(this.planets,a.space.planets);for(a=this.programs.length-1;0<=a;a--){var b=this.programs[a];b.val&&b.unlocks&&this.game.unlock(b.unlocks)}for(a=this.planets.length-1;0<=a;a--)if(b=this.planets[a],b.buildings)for(var c=b.buildings.length-1;0<=c;c--){var d=b.buildings[c];d.val&&d.unlocks&&this.game.unlock(d.unlocks)}}},update:function(){for(var a in this.planets){var b=this.planets[a];if(!b.reached&&b.unlocked)if(0<b.routeDays){var c=0!=this.game.getEffect("routeSpeed")?
this.game.getEffect("routeSpeed"):1;b.routeDays-=c/this.game.calendar.ticksPerDay}else b.routeDays=0,b.reached=!0,this.game.time.queue.unlockQueueSource("spaceBuilding"),this.game.msg($I("space.newplanet.log.msg"),"important");for(var d in b.buildings){c=b.buildings[d];if(!c.unlocked&&b.reached)if("undefined"==typeof c.requiredTech)c.unlocked=!0;else if(c.requiredTech){var e=!0;for(a=c.requiredTech.length-1;0<=a;a--)this.game.science.get(c.requiredTech[a]).researched||(e=!1);c.unlocked=e}c.action&&
0<c.val&&(e=c.action(c,this.game),"undefined"!=typeof e&&(c.lackResConvert=1!=e&&0!=c.on),this.game.calendar.cycleEffectsBasics(c.effects,c.name))}}for(a=0;a<this.programs.length;a++)d=this.programs[a],0<d.val&&!d.on&&(d.unlocks&&d.unlocks.planet?(b=this.getPlanet(d.unlocks.planet[0]))&&b.reached&&(d.on=1):d.on=1)},fastforward:function(a){a*=this.game.calendar.ticksPerDay;for(var b in this.planets){var c=this.planets[b];if(!c.reached&&c.unlocked&&0<c.routeDays){var d=0!=this.game.getEffect("routeSpeed")?
this.game.getEffect("routeSpeed"):1;c.routeDays-=a*d/this.game.calendar.ticksPerDay}}b=this.getBuilding("entangler");c=this.game.resPool.get("gflops").value;a=Math.min(c,b.effects.gflopsConsumption*b.on*a);0>=a||(this.game.resPool.addResEvent("gflops",-a),this.game.resPool.addResEvent("hashrates",a))},getProgram:function(a){if(this.metaCache[a])return this.metaCache[a];for(var b=this.programs.length-1;0<=b;b--){var c=this.programs[b];if(c.name==a)return this.metaCache[a]=c}},getBuilding:function(a){if(this.metaCache[a])return this.metaCache[a];
for(var b=this.planets.length-1;0<=b;b--){var c=this.planets[b];if(c.buildings)for(var d=c.buildings.length-1;0<=d;d--){var e=c.buildings[d];if(e.name==a)return this.metaCache[a]=e}}},getPlanet:function(a){return this.getMeta(a,this.planets)},getAutoProductionRatio:function(a){var b=1+this.game.getEffect("spaceRatio");a&&(b*=1+(this.game.bld.getAutoProductionRatio(!1,.05)-1)*this.game.getEffect("prodTransferBonus"));this.game.workshop.get("spaceManufacturing").researched&&(a=this.game.bld.get("factory"),
b*=1+a.on*a.effects.craftRatio*.75);return b},unlockAll:function(){for(var a in this.planets)this.planets[a].unlocked=!0;for(a in this.programs)this.programs[a].unlocked=!0;this.game.msg("All space upgrades are unlocked")},getEffect:function(a){for(var b=0,c=0;c<this.meta.length;c++){var d=this.getMetaEffect(a,this.meta[c]);b+=d}return b}});
dojo.declare("com.nuclearunicorn.game.ui.SpaceProgramBtnController",com.nuclearunicorn.game.ui.BuildingStackableBtnController,{getMetadata:function(a){a.metaCached||(a.metaCached=this.game.space.getProgram(a.options.id));return a.metaCached},getPrices:function(a){for(var b=dojo.clone(a.metadata.prices),c=0;c<b.length;c++)if("oil"==b[c].name){var d=this.game.getLimitedDR(this.game.getEffect("oilReductionRatio"),.75);b[c].val*=1-d}if(this.game.challenges.isActive("blackSky")&&"orbitalLaunch"==a.metadata.name)for(c=
0;c<b.length;c++)b[c].val*="starchart"==b[c].name?0:11;return b},updateVisible:function(a){var b=a.metadata;if(b.requiredTech)for(var c=b.requiredTech.length-1;0<=c;c--)if(!this.game.science.get(b.requiredTech[c]).researched){a.visible=!1;return}a.visible=b.on&&b.noStackable&&this.game.space.hideResearched?!1:b.unlocked},getName:function(a){a=a.metadata;return 0==a.val?a.label:0==a.on?$I("space.mission.name.inprogress",[a.label]):$I("space.mission.name.complete",[a.label])},buyItem:function(a,b,c){0==
a.metadata.val?this.inherited(arguments):c(!1)},build:function(a,b){var c=this.inherited(arguments);a.metadata.on=0;"rorschachMission"==a.metadata.name&&(a.metadata.on=1,this.game.msg($I("space.mission.rorschach.complete.log.msg"),"important"));return c}});
dojo.declare("classes.ui.space.PlanetBuildingBtnController",com.nuclearunicorn.game.ui.BuildingStackableBtnController,{getMetadata:function(a){a.metaCached||(a.metaCached=this.game.space.getBuilding(a.options.id));return a.metaCached},hasSellLink:function(a){return!this.game.opts.hideSell},getPrices:function(a){a=a.metadata;for(var b=a.priceRatio||1.15,c=dojo.clone(a.prices),d=1-this.game.getLimitedDR(this.game.getEffect(a.name+"CostReduction"),1),e=0;e<c.length;e++){if("oil"!==c[e].name)c[e].val*=
Math.pow(b,a.val);else{c[e].val*=Math.pow(1.05,a.val);var g=this.game.getLimitedDR(this.game.getEffect("oilReductionRatio"),.75);c[e].val*=1-g}g=1-this.game.getLimitedDR(this.game.getEffect(c[e].name+"CostReduction"),1);c[e].val=c[e].val*d*g}if(this.game.challenges.isActive("blackSky")&&"sattelite"==a.name&&0==a.val)for(e=0;e<c.length;e++)c[e].val*="starchart"==c[e].name?0:14;return c}});
dojo.declare("classes.ui.space.PlanetPanel",com.nuclearunicorn.game.ui.Panel,{planet:null,render:function(){var a=this.inherited(arguments),b=this,c=new classes.ui.space.PlanetBuildingBtnController(this.game);dojo.forEach(this.planet.buildings,function(d,e){d=new com.nuclearunicorn.game.ui.BuildingStackableBtn({id:d.name,planet:b.planet,controller:c},b.game);d.render(a);b.addChild(d)});return a},update:function(){if(!this.planet.reached&&this.planet.unlocked&&0<this.planet.routeDays){var a=0!=this.game.getEffect("routeSpeed")?
this.game.getEffect("routeSpeed"):1;this.title.innerHTML=this.name+" | \u8fd8\u9700: "+this.game.toDisplayDays(Math.round(this.planet.routeDays/a))}else this.title.innerHTML=this.name;this.inherited(arguments)}});dojo.declare("classes.ui.space.FurthestRingPanel",[classes.ui.space.PlanetPanel],{constructor:function(a,b,c){this.game=c},render:function(a){var b=new mixin.IReactAware(WChiral,this.game),c=this.inherited(arguments);b.render(c);return c}});
dojo.declare("com.nuclearunicorn.game.ui.tab.SpaceTab",com.nuclearunicorn.game.ui.tab,{GCPanel:null,planetPanels:null,constructor:function(){this.aPanel=new com.nuclearunicorn.game.ui.Panel($I("space.panel.rorshach.label"));this.aPanel.setVisible(!1);this.addChild(this.aPanel);var a=new classes.ui.RorshachWgt(this.game);a.setGame(this.game);this.aPanel.addChild(a)},render:function(a){var b=this,c=dojo.create("div",{style:{float:"right"}},a),d=dojo.create("input",{id:"toggleResearched",type:"checkbox",
checked:this.game.space.hideResearched},c);dojo.connect(d,"onclick",this,function(){this.game.space.hideResearched=!this.game.space.hideResearched;dojo.empty(a);this.render(a)});dojo.create("label",{innerHTML:$I("space.tab.hide.complete.missions"),for:"toggleResearched"},c);dojo.create("div",{style:{height:"20px"}},a);this.GCPanel=new com.nuclearunicorn.game.ui.Panel($I("space.ground.control.label"),this.game.space);var e=this.GCPanel.render(a),g=new com.nuclearunicorn.game.ui.SpaceProgramBtnController(this.game);
dojo.forEach(this.game.space.programs,function(f,h){f=new com.nuclearunicorn.game.ui.BuildingStackableBtn({id:f.name,controller:g},b.game);f.render(e);b.GCPanel.addChild(f)});this.container=a;this.inherited(arguments);this.planetPanels=[];dojo.forEach(this.game.space.planets,function(f,h){if(f.unlocked){if(this.game.prestige.getPerk("numerology").researched){var k="";dojo.forEach(this.game.calendar.cycles,function(l,m){if(l.name==f.name||"moon"==f.name&&"redmoon"==l.name)k+=l.glyph+" "});k+=f.label}else k=
f.label;h=null;h="furthestRing"==f.name?new classes.ui.space.FurthestRingPanel(k,b.game.space,b.game):new classes.ui.space.PlanetPanel(k,b.game.space);h.planet=f;h.setGame(b.game);h.render(a);b.planetPanels.push(h)}});this.update()},update:function(){this.GCPanel.update();dojo.forEach(this.planetPanels,function(a,b){a.update()});this.inherited(arguments);this.game.space.getProgram("rorschachMission").on&&this.aPanel.setVisible(!0)}});
